# FateBattle 실제 만세력 구현 계획서

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 외부 만세력 계산과 Bright Witch, Shadow Witch, Fate Judge 마녀의 결정적 판결을 현재 모바일 FateBattle 흐름에 연결합니다.

**Architecture:** `manseryeok`을 감싼 순수 TypeScript 어댑터가 입력 정규화, 원국 계산, 오행 요약, 메모리 캐시를 담당합니다. 클라이언트 폼은 검증된 전체 입력을 어댑터에 전달하고 결과 컴포넌트는 계산 데이터와 로케일별 해석을 표시합니다.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript strict, Tailwind CSS 4, `manseryeok@2.0.0`, Vitest, Playwright

---

## Task 1: 실제 원국과 캐시 계약

**Files:**

- Create: `lib/saju-reading.ts`
- Create: `tests/unit/saju-reading.test.ts`
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`

**Step 1: 실패 테스트 작성**

- 1992-08-14 양력과 시간 미상 입력이 연주, 월주, 일주를 반환해야 합니다.
- 시간 미상은 시주를 `null`로 반환해야 합니다.
- 같은 입력을 두 번 호출하면 같은 cache key와 같은 객체를 반환해야 합니다.
- 다른 날짜 또는 시각은 다른 cache key를 반환해야 합니다.
- 양력과 음력 입력을 라이브러리 옵션으로 구분해야 합니다.

**Step 2: RED 확인**

Run: `pnpm test -- tests/unit/saju-reading.test.ts`

Expected: `@/lib/saju-reading` 모듈 부재 또는 계약 부재로 실패합니다.

**Step 3: 최소 구현**

- `SajuReadingInput`, `SajuPillar`, `SajuReading` 타입을 정의합니다.
- 날짜와 시간을 숫자로 파싱합니다.
- 시간 미상은 정오로 날짜 원국을 계산하고 시주를 제거합니다.
- 라이브러리 결과를 직렬화 가능한 객체로 변환합니다.
- 정규화 문자열을 cache key로 사용하여 module-scoped `Map`에 저장합니다.
- 테스트 전용 캐시 초기화 함수를 노출하지 않고 동일 객체 반환으로 캐시를 검증합니다.

**Step 4: GREEN 확인**

Run: `pnpm test -- tests/unit/saju-reading.test.ts`

Expected: 모든 실제 원국과 캐시 테스트가 통과합니다.

## Task 2: 세 마녀 로케일 계약

**Files:**

- Modify: `lib/dictionary.ts`
- Modify: `lib/locales/en.ts`
- Modify: `lib/locales/ko.ts`
- Modify: `tests/unit/locales.test.ts`

**Step 1: 실패 테스트 작성**

- 두 로케일에 Bright Witch, Shadow Witch, Fate Judge가 있어야 합니다.
- 두 로케일에 실제 원국 라벨과 다섯 오행 프로필이 있어야 합니다.
- 키 구조가 동일해야 합니다.

**Step 2: RED 확인**

Run: `pnpm test -- tests/unit/locales.test.ts`

Expected: 새 dictionary 구조가 없어 실패합니다.

**Step 3: 최소 구현**

- 캐릭터 이름, 역할, 신조를 추가합니다.
- 원국 카드와 오행 분포 라벨을 추가합니다.
- 목, 화, 토, 금, 수 각각의 Bright 주장, Shadow 반론, Judge 판결, 행동을 추가합니다.
- 실제 계산과 데모 해석의 차이를 분명하게 알리는 문구를 추가합니다.

**Step 4: GREEN 확인**

Run: `pnpm test -- tests/unit/locales.test.ts`

Expected: 로케일 구조 테스트가 통과합니다.

## Task 3: 폼에서 전체 계산 입력 전달

**Files:**

- Modify: `components/saju-form.tsx`
- Modify: `components/saju-experience.tsx`
- Modify: `lib/validation.ts`
- Modify: `tests/unit/validation.test.ts`

**Step 1: 실패 테스트 작성**

- 1800년 이전 입력을 지원 범위 오류로 차단해야 합니다.
- 시간 미상은 빈 시각을 허용해야 합니다.
- 폼 완료 값에는 달력, 날짜, 시각 또는 시간 미상이 포함되어야 합니다.

**Step 2: RED 확인**

Run: `pnpm test -- tests/unit/validation.test.ts`

Expected: 지원 범위 오류 계약이 없어 실패합니다.

**Step 3: 최소 구현**

- `onComplete`가 alias가 아닌 전체 입력을 전달하도록 변경합니다.
- 실제 계산 범위 오류를 클라이언트에서 표시합니다.
- 국가와 도시는 개인정보 안내용 선택 입력으로 유지하지만 이번 계산에는 사용하지 않습니다.

**Step 4: GREEN 확인**

Run: `pnpm test -- tests/unit/validation.test.ts`

Expected: 기존 검증과 새 범위 검증이 통과합니다.

## Task 4: 원국과 세 마녀 결과 화면

**Files:**

- Create: `components/four-pillars-chart.tsx`
- Create: `components/coven-tribunal.tsx`
- Modify: `components/saju-result.tsx`
- Modify: `components/battle-arena.tsx`
- Modify: `components/battle-verdict.tsx`
- Modify: `app/flows.css`

**Step 1: 실패 E2E 작성**

- 영어 사주 결과에 3개 계산 주와 시간 미상 카드가 표시되어야 합니다.
- Bright Witch, Shadow Witch, Fate Judge가 모두 표시되어야 합니다.
- Fate Judge 판결이 계산된 일간 오행을 반영해야 합니다.

**Step 2: RED 확인**

Run: `pnpm exec playwright test tests/e2e/actual-saju.spec.ts`

Expected: 원국과 세 마녀 선택자가 없어 실패합니다.

**Step 3: 최소 구현**

- 원국 카드는 실제 계산값과 한자를 표시합니다.
- 세 마녀 카드는 2열과 전체 너비 Judge 구조를 사용합니다.
- 기존 4라운드와 판결 UI를 유지하고 캐릭터 역할을 연결합니다.
- 색만으로 역할을 구분하지 않고 아이콘, 이름, 역할 텍스트를 함께 제공합니다.

**Step 4: GREEN 확인**

Run: `pnpm exec playwright test tests/e2e/actual-saju.spec.ts`

Expected: 실제 원국, 세 마녀, 판결, 모바일 폭 검사가 통과합니다.

## Task 5: 개인정보와 전체 회귀

**Files:**

- Modify: `tests/e2e/routing-and-privacy.spec.ts`
- Modify: `tests/e2e/fatebattle-concept.spec.ts`
- Modify: `.artifacts/verification/EVIDENCE.md`

**Step 1: 개인정보 회귀 강화**

- 출생정보가 URL, 쿠키, localStorage, sessionStorage, 애플리케이션 요청에 없어야 합니다.
- 같은 입력을 현재 탭에서 다시 읽을 때 결과가 같아야 합니다.

**Step 2: 전체 자동 검증**

Run:

```bash
pnpm exec tsc --noEmit --pretty false
pnpm lint
pnpm test
pnpm exec playwright test
pnpm build
git diff --check
```

Expected: 모두 exit 0입니다.

**Step 3: 프로덕션 모바일 QA**

- 포트 3100에서 영어 시간 미상과 한국어 시간 지정 흐름을 실행합니다.
- 360x800, 390x844, 430x932에서 가로 넘침과 하단 내비게이션 가림을 확인합니다.
- 계산 원국, 세 마녀, Fate Judge 판결, 저장소 0건, console error 0건을 확인합니다.
- 브라우저와 포트 3100을 종료하고 사용자 포트 3000을 유지합니다.

## Task 6: 단순화와 HEAVY 검토

**Files:**

- Review: current task diff
- Record: `.omo/evidence/fatebattle-actual-saju-code-review.md`

**Step 1: 단순화 검사**

- 불필요한 추상화, 중복 캐릭터 마크업, 일반 타입 단언, 오류 억제를 검사합니다.

**Step 2: HEAVY 검토**

- 실제 원국 정확성 경계, 캐시 개인정보 경계, 세 마녀 구조, 모바일 접근성, 회귀 증거를 검토합니다.
- `VERDICT: APPROVE`가 아니면 기준 차단 사항만 수정하고 같은 검토자에게 재요청합니다.

**Step 3: Git 상태 확인**

- 커밋과 push는 수행하지 않습니다.
- 변경 파일과 추천 한국어 커밋 메시지만 인계합니다.

