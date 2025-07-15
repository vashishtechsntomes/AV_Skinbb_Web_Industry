// components/MarkdownMessage.tsx
import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import rehypeHighlight from "rehype-highlight"; // Optional: for code syntax
// import "highlight.js/styles/github.css"; // Choose any highlight.js theme

type Props = {
  content: string;
};

export const MarkdownMessage = ({ content }: Props) => {
  return (
    <div className="prose max-w-none prose:list prose-p:text-foreground leading-relaxed">
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
