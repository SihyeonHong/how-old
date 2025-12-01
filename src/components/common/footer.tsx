import GitHubButton from "@/components/common/github-button";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex w-full flex-col gap-2 px-1">
      <p className="text-xs text-stone-500">&copy; {currentYear} 몇살이지</p>

      <p className="text-xs break-keep text-stone-500">
        입력한 계산 내용은 서버로 전송되거나 저장되지 않습니다.
      </p>

      <p className="text-xs break-keep text-stone-500">
        Google Analytics를 사용하여 방문 통계를 수집합니다. 페이지 이용 패턴
        분석을 위해 제한적인 쿠키를 사용하지만, 사용자를 식별할 수 있는 정보는
        수집하지 않습니다.
      </p>

      <div className="self-start">
        <GitHubButton />
      </div>
    </footer>
  );
}
