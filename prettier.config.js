// prettier.config.js

/**
 * @type {import('prettier').Config}
 *
 * Prettier의 공식 설정 파일입니다.
 * Tailwind CSS 플러그인과 충돌 방지 설정을 포함합니다.
 */
const config = {
    // 1. 플러그인 설정
    // 설치된 prettier-plugin-tailwindcss를 명시적으로 등록하여 클래스 자동 정렬 기능을 활성화합니다.
    plugins: ['prettier-plugin-tailwindcss'],
  
    // 2. 핵심 포맷팅 옵션
    // 운영체제별 줄바꿈 문자(LF 또는 CRLF) 충돌을 방지하기 위한 설정입니다.
    // "auto"로 설정하면 기존 파일의 줄바꿈 방식을 따르거나, Git 설정에 맞게 자동으로 처리합니다.
    endOfLine: 'auto',
  
    // 3. 기타 추천 옵션 (선택 사항: 필요에 따라 조정하세요)
    // TypeScript 및 일반 JavaScript 개발에서 일반적으로 권장되는 옵션입니다.
    // semi: true,           // 문장 끝에 세미콜론(;)을 붙입니다. (기본값 true)
    // singleQuote: true,    // 작은따옴표(')를 사용합니다. (기본값 false)
    // tabWidth: 2,          // 탭의 너비를 2칸으로 설정합니다. (기본값 2)
    // printWidth: 80,       // 한 줄의 최대 길이를 80자로 제한합니다. (기본값 80)
    // trailingComma: 'all', // 객체/배열 등의 마지막 요소 뒤에 쉼표(Trailing Comma)를 항상 붙입니다. (es5, none, all 중 선택)
  };
  
  export default config;