# Form UX Patterns

## Submission states

A submit button has four states — model them explicitly:

```ts
type SubmitState = 'idle' | 'submitting' | 'success' | 'error'
```

- `submitting`: disable the button, show inline progress *on the button* ("Saving…"), keep the form editable-looking but ignore re-submits.
- `success`: confirm in place (button flashes "Saved") or navigate; if the form stays, `resetForm({ values })` so dirty-tracking restarts.
- `error`: re-enable, keep every field value, focus the first errored field, and show a summary near the submit button (network errors have no field to attach to).
- Double-submit protection = disabled-while-submitting **plus** idempotency on the server; never rely on the button alone.

## Unsaved changes guard

```ts
import { onBeforeRouteLeave } from 'vue-router'

onBeforeRouteLeave(() => {
  if (meta.value.dirty && !confirm('Discard unsaved changes?'))
    return false
})

// Browser/tab close needs the native event too:
useEventListener(window, 'beforeunload', (e) => {
  if (meta.value.dirty) e.preventDefault()
})
```

Replace `confirm()` with your dialog component via a promise (`createTemplatePromise` from VueUse works well) — but keep the logic in the guard.

## Multi-step wizard

Model each step as its own schema; the wizard owns accumulated data:

```ts
const steps = [
  { component: StepAccount, schema: accountSchema },
  { component: StepProfile, schema: profileSchema },
  { component: StepConfirm, schema: z.object({}) },
] as const

const current = ref(0)
const wizardData = reactive<Partial<FullForm>>({})

async function next(stepValues: object) {
  Object.assign(wizardData, stepValues)
  if (current.value === steps.length - 1)
    await submit(fullSchema.parse(wizardData))   // final cross-step validation
  else
    current.value++
}
```

Rules:
- Validate **per step** on Next; validate the **full schema** once at the end (steps can invalidate each other).
- Keep visited steps' data when navigating back (`wizardData` is the source of truth, steps initialize from it).
- Put the step in the route (`/signup/profile`) if refresh/back-button must work; otherwise `<KeepAlive>` around the step components preserves in-progress input.
- Show progress ("Step 2 of 3") and never block going *backwards*.

## File upload

```vue
<script setup lang="ts">
const files = ref<File[]>([])
const progress = ref(0)

function onPick(e: Event) {
  const picked = Array.from((e.target as HTMLInputElement).files ?? [])
  const errors = picked.filter(f => f.size > 10 * 1024 * 1024)
  if (errors.length) { /* reject early with a message */ }
  files.value = picked
}

async function upload() {
  const form = new FormData()
  files.value.forEach(f => form.append('files', f))
  // fetch has no upload progress — use XHR or axios when progress matters
  await axios.post('/api/upload', form, {
    onUploadProgress: e => progress.value = Math.round(e.loaded / (e.total ?? 1) * 100),
  })
}
</script>
```

- Validate size/type client-side *before* upload (fast feedback), and again server-side (security).
- Don't set `Content-Type` manually with `FormData` — the boundary must be auto-generated.
- Drag-and-drop: `useDropZone` (VueUse) on a wrapper, but always keep the `<input type="file">` for keyboard/screen-reader users.
- Upload on submit for small forms; upload-immediately-with-token for large files inside long forms.

## Autosave (drafts)

```ts
watchDebounced(form, () => saveDraft(toRaw(form)), { debounce: 2000, deep: true })
```

- Save to localStorage (`useStorage`) for resilience, server for cross-device.
- Show "Draft saved HH:mm" passively; never toast on every autosave.
- Autosave drafts must **not** run schema validation — persist invalid intermediate states freely.
