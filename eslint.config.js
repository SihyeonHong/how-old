import js from "@eslint/js";

import globals from "globals"; // 전역 변수 설정 (ex: browser)

import tseslint from "typescript-eslint"; // TypeScript 지원
import reactHooks from "eslint-plugin-react-hooks"; // React Hooks 규칙
import reactRefresh from "eslint-plugin-react-refresh"; // Vite에서 React Fast Refresh 지원용
import unusedImports from "eslint-plugin-unused-imports"; // 사용하지 않는 import/변수 처리
import importPlugin from "eslint-plugin-import"; // import 구문 순서 정리
import prettierConfig from "eslint-config-prettier"; // Prettier 충돌 방지 (규칙 비활성화)

import { defineConfig, globalIgnores } from "eslint/config"; // ESLint Flat Config 유틸리티 (배열 형태로 설정 관리)

export default defineConfig([
  // 1. 프로젝트 전체 무시 규칙 설정 (node_modules 제외, dist 폴더 무시)
  globalIgnores(["dist", "node_modules"]),

  // 2. TypeScript/React 파일에 대한 기본 설정 (.ts, .tsx 파일에 적용)
  {
    files: ["**/*.{ts,tsx}"],

    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser, // 브라우저 환경 전역 변수 활성화 (window, document 등)
      parser: tseslint.parser, // TypeScript 파일은 tseslint parser 사용
      parserOptions: {
        project: ["./tsconfig.app.json", "./tsconfig.node.json"], // tsconfig.json 경로 지정
        tsconfigRootDir: import.meta.dirname,
      },
    },

    // 3. 플러그인 등록 및 커스텀 규칙 추가
    plugins: {
      "unused-imports": unusedImports, // 사용 안 하는 import/변수 처리 플러그인
      import: importPlugin, // import 순서/구문 관련 플러그인
      "react-hooks": reactHooks, // React Hooks 플러그인 (extends에 포함되어 있지만 명시적으로 등록)
      "react-refresh": reactRefresh,
      "@typescript-eslint": tseslint.plugin,
      // prettier는 규칙 비활성화 용도이므로 plugins에 등록하지 않음
    },

    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: ["./tsconfig.app.json", "./tsconfig.node.json"],
        },
        node: true,
      },
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"],
      },
    },

    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...reactHooks.configs["recommended-latest"].rules,

      // 'no-unused-vars' 규칙을 비활성화하고, 'unused-imports'가 그 역할을 완전히 대체하도록 합니다.
      "no-unused-vars": "off", // ESLint 기본 규칙 비활성화
      "@typescript-eslint/no-unused-vars": "off", // TypeScript 규칙 비활성화

      // 사용하지 않는 import/변수 관련 룰 (자동 수정(fix)을 담당)
      "unused-imports/no-unused-imports": "error", // unused import를 제거하는 규칙 (Auto-fix 작동)
      "unused-imports/no-unused-vars": [
        "warn", // 사용하지 않는 변수를 검사하는 규칙 (경고 표시)
        {
          vars: "all",
          varsIgnorePattern: "^_", // _로 시작하는 변수는 미사용 허용
          args: "after-used",
          argsIgnorePattern: "^_", // _로 시작하는 매개변수는 미사용 허용
        },
      ],

      // Import 순서 정리 관련 룰
      // import/order: import 구문의 순서와 그룹화 규칙 강제
      "import/order": [
        "error",
        {
          groups: [
            "builtin", // Node.js 내장 모듈
            "external", // 외부 라이브러리 (node_modules)
            "internal", // 프로젝트 내부 절대 경로 import
            "parent", // 상위 디렉터리 상대 경로 (../)
            "sibling", // 같은/하위 디렉터리 상대 경로 (./)
            "index", // index 파일
          ],
          "newlines-between": "always", // 그룹 간 빈 줄 추가
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "import/newline-after-import": "error", // import 구문 후 빈 줄 권고.

      // 기타 커스텀 규칙 (필요시 추가)
      "no-console": ["warn", { allow: ["warn", "error"] }],

      // React Fast Refresh 규칙
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },

  // 4. ESLint 규칙과 Prettier 포맷팅 규칙 충돌 방지
  prettierConfig,
]);
