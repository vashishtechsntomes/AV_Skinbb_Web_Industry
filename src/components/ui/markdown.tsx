// components/MarkdownMessage.tsx
import { cn } from "@/utils";
import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import rehypeHighlight from "rehype-highlight"; // Optional: for code syntax
// import "highlight.js/styles/github.css"; // Choose any highlight.js theme

type Props = {
  content: string;
  className?: string;
};

export const MarkdownMessage = ({ content, className }: Props) => {
  return (
    <div className={cn("prose prose:list prose-p:text-foreground max-w-none leading-relaxed",className)}>
      <ReactMarkdown
      //   className="prose max-w-none text-sm leading-relaxed"
      //   remarkPlugins={[remarkGfm]}
      //   rehypePlugins={[rehypeHighlight]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
