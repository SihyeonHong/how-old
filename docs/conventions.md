# 컨벤션

개발 진행 중 추가 및 수정 가능.

## 코드 컨벤션

### 코드 스타일

- `ESLint` 및 `Prettier` 사용하여 코드 스타일 통일

#### 네이밍 규칙

- 타입명, 컴포넌트명: `PascalCase`
- 변수명, 함수명: `camelCase`
- 폴더명, 파일명: `kebab-case` (단, Next.js의 컨벤션을 우선으로 함)

##### Boolean 변수 네이밍

- 맞다/아니다 → `is + 상태/조건` (예: `isDarkMode`)
- 있다/없다 → `has + 속성/요소` (예: `hasActivePlayer`)

##### 함수 네이밍

- 컴포넌트 내부 함수: `handle + 동사 + 명사`  
  (예: `handleChangeDateFilter`, `handleOpenDialog`)
- props로 넘기는 함수: `on + 동사 + 명사`  
  (예: `onChangeDateFilter`, `onOpenDialog`)

#### 타입 선언

- 객체 타입: `interface`
- 그 외의 타입 (예: 유니언 타입 등): `type`

#### 컴포넌트 작성 형식

- `export default function ComponentName() {}`

### 파일 구조

- 한 파일에 한 컴포넌트.
- 한 컴포넌트에 되도록 하나의 역할.

#### 폴더 설명

- `/components/ui`: `shadcn/ui`의 컴포넌트 모음.

## 커밋 컨벤션

- 작은 커밋 지향: '기능 하나' 또는 '의미 있는 코드 변경 하나' 단위.

### 타입

- `feat`: 기능 추가
- `fix`: 버그 수정
- `refactor`: 리팩토링 (기능 변경 없음)
- `style`: 코드 스타일 수정 (로직 변경 없음)
- `docs`: 문서 변경
- `chore`: 빌드, 패키지 업데이트 등 기타 작업

### 예시

```
feat: 취소 버튼 추가
refactor: primary 버튼 색상 변경. 크기 변경.
style: props 순서 정렬. 불필요한 세미콜론 제거.
```

주의: `style`은 코드 스타일 말하는 거지 UI 변경 등은 `feat` 또는 `refactor`에 해당.

## 브랜치 컨벤션

- `main`: 배포 기본 브랜치
- `dev`: 기능 개발 브랜치. `main` 브랜치로부터 분기.
  - `dev`에서 개발하고 `main`으로 병합. 병합 후에도 삭제X.
- `hotfix`: 배포 버전의 긴급 수정 시 `main`의 하위 브랜치로 생성. 병합 후 삭제.

### PR 컨벤션

- 제목은 커밋 메시지와 유사한 `타입: 내용` 형식.
- 내용에 변경사항 알기 쉽게 작성.
- GitHub Issue 연관 시 해당 번호 기재해 자동 close.
- 리뷰 없이 바로 병합.
- 커밋 여러 개가 모여서 하나의 기능 또는 문서화 측면에서 의미 있는 단위가 되었다고 판단될 때 PR 작성.
