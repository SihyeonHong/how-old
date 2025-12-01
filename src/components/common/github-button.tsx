import { cn } from "@/utils/classname";

interface GitHubButtonProps {
  className?: string;
}

export default function GitHubButton({ className = "" }: GitHubButtonProps) {
  const githubUrl = `https://github.com/SihyeonHong/how-old/`;

  return (
    <a
      href={githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex items-center gap-1 rounded-sm bg-black py-1.5 pr-1 pl-2 text-white transition-colors hover:bg-gray-800",
        className,
      )}
      aria-label="GitHub 프로필로 이동"
    >
      <img src="/github-mark-white.png" alt="GitHub mark" className="size-3" />
      <img src="/GitHub_Logo_White.png" alt="GitHub logo" className="h-4" />
    </a>
  );
}
