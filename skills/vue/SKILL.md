---
name: vue
description: Vue 3 생태계 통합 가이드. Composition API, Pinia 상태관리, Vue Router, VueUse 컴포저블, 테스팅. Vue SFC, .vue 파일, defineProps/defineEmits/defineModel, watchers, Transition/Teleport/Suspense/KeepAlive, 상태관리, 라우팅 작업 시 사용. MUST be used for Vue.js tasks.
---

# Vue 생태계 통합 스킬

> Vue 3.5 기반. 항상 Composition API + `<script setup lang="ts">` 사용.

## 핵심 원칙

- TypeScript 우선, `<script setup lang="ts">` 사용
- 성능이 중요하면 `shallowRef` > `ref`
- 항상 Composition API 사용 (Options API 지양)
- Reactive Props Destructure 지양

## 레퍼런스 구조

필요한 토픽의 레퍼런스를 읽어서 상세 지식을 로드하세요.

| 영역 | 설명 | 경로 |
|------|------|------|
| **Vue Core** | Script Setup 매크로, 반응성, 라이프사이클 | [script-setup-macros](references/script-setup-macros.md), [core-new-apis](references/core-new-apis.md) |
| **빌트인 컴포넌트** | Transition, Teleport, Suspense, KeepAlive | [advanced-patterns](references/advanced-patterns.md) |
| **Best Practices** | Vue 3 gotchas, 성능, TS 패턴 (100+개 가이드) | [best-practices-index](references/best-practices-index.md) → `best-practices/` |
| **Pinia** | 상태관리, Store, 플러그인, SSR | [pinia-guide](references/pinia-guide.md) → `pinia/` |
| **Router** | 네비게이션 가드, 라우트 라이프사이클 | [router-guide](references/router-guide.md) → `router/` |
| **Testing** | Vitest + Vue Test Utils, E2E | [testing-guide](references/testing-guide.md) → `testing/` |
| **VueUse** | 200+ 컴포저블 함수 매핑 | [vueuse-guide](references/vueuse-guide.md) → `vueuse/` |