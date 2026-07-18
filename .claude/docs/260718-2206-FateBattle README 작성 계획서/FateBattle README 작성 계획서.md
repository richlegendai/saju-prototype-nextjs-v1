# FateBattle README 작성 계획서

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 저장소의 현재 구현 상태와 실행 방법을 정확하게 설명하는 한국어 루트 README를 작성합니다.

**Architecture:** `README.md`는 제품 소개부터 로컬 실행, 개인정보, 테스트, 배포까지 한 흐름으로 구성합니다. 내용은 `package.json`, App Router 경로, 사주 계산 모듈, 로케일 사전과 테스트에서 확인한 사실만 사용합니다.

**Tech Stack:** Markdown, Next.js 16, React 19, TypeScript, Tailwind CSS, manseryeok, Vitest, Playwright

---

## Task 1: 저장소 사실 고정

**Files:**

- Read: `package.json`
- Read: `proxy.ts`
- Read: `lib/saju-reading.ts`
- Read: `lib/locales/ko.ts`
- Read: `lib/locales/en.ts`
- Read: `tests/unit/*.test.ts`
- Read: `tests/e2e/*.spec.ts`

**Step 1: 제품과 기능 확인**

제품명, 지원 언어, 서비스 경로, 사주 계산 방식과 세 마녀 역할을 확인합니다.

**Step 2: 실행 환경 확인**

`package.json`의 package manager, dependency, script를 확인하고 공식 Next.js 문서에서 최소 Node.js 버전을 대조합니다.

**Step 3: 개인정보와 한계 확인**

입력 정보가 현재 탭의 메모리에서만 사용되는지 확인하고 실제로 제공하지 않는 AI, 로그인, 결제, 데이터베이스 기능을 구분합니다.

## Task 2: 루트 README 작성

**Files:**

- Create: `README.md`

**Step 1: 제품 소개 작성**

FateBattle의 차별점과 Bright Witch, Shadow Witch, Fate Judge 구조를 짧게 설명합니다.

**Step 2: 구현 범위 작성**

실제 사주 원국 계산과 고정 데모 해석을 구분하고 연도별 운세 및 서비스 미리보기 상태를 명시합니다.

**Step 3: 개발 안내 작성**

요구 환경, 설치, 개발 서버, 프로덕션 빌드, 테스트와 Vercel 배포 방법을 실제 script에 맞춰 작성합니다.

**Step 4: 개인정보와 면책 작성**

출생 정보의 메모리 처리, 언어 쿠키, 미구현 기능과 오락 및 성찰 목적의 한계를 명시합니다.

## Task 3: 문서 검증

**Files:**

- Verify: `README.md`
- Verify: `package.json`

**Step 1: QA-by-read**

Run: `sed -n '1,320p' README.md`

Expected: 설치부터 배포까지 순서가 자연스럽고 저장소에서 확인되지 않은 주장이 없습니다.

**Step 2: Markdown과 사실 검사**

코드 펜스가 짝을 이루고 모든 script가 `package.json`에 존재하는지 확인합니다. em dash, 중간점, 소유자 이름과 이메일이 없어야 합니다.

**Step 3: 저장소 품질 검사**

Run:

```bash
pnpm exec tsc --noEmit --pretty false
pnpm lint
pnpm test
pnpm exec playwright test
pnpm build
git diff --check
git diff --cached --check
```

Expected: 모든 명령이 종료 코드 0으로 통과합니다.

## 완료 조건

- 루트 `README.md`가 생성됩니다.
- 현재 구현과 데모 한계가 명확히 구분됩니다.
- 설치, 실행, 테스트, 배포 명령이 저장소와 일치합니다.
- 한국어 문장이 번역투 없이 자연스럽게 읽힙니다.
- 커밋과 push는 실행하지 않습니다.
