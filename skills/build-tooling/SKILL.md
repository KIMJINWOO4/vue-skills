---
name: build-tooling
description: 프론트엔드 빌드 도구 통합 가이드. Vite (빌드/개발서버), Vitest (테스트), tsdown (라이브러리 번들링), pnpm (패키지 관리), Turborepo (모노레포). vite.config.ts, vitest, tsdown.config.ts, pnpm-workspace.yaml, turbo.json 작업 시 사용.
---

# 빌드 도구 통합 스킬

## 레퍼런스 구조

필요한 도구의 레퍼런스를 읽어서 상세 지식을 로드하세요.

| 도구 | 설명 | 진입점 |
|------|------|--------|
| **Vite** | 빌드 도구 설정, 플러그인 API, SSR, Vite 8 Rolldown | [vite-guide](references/vite-guide.md) → `vite/` |
| **Vitest** | 단위 테스트, 모킹, 커버리지, 테스트 필터링 | [vitest-guide](references/vitest-guide.md) → `vitest/` |
| **tsdown** | TS/JS 라이브러리 번들링, DTS 생성, tsup 마이그레이션 | [tsdown-guide](references/tsdown-guide.md) → `tsdown/` |
| **pnpm** | 패키지 관리, 워크스페이스, 카탈로그, 패치 | [pnpm-guide](references/pnpm-guide.md) → `pnpm/` |
| **Turborepo** | 모노레포 빌드 시스템, 태스크, 캐싱, CI | [turborepo-guide](references/turborepo-guide.md) → `turborepo/` |