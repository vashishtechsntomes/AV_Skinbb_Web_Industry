import { cn } from "@/utils";
import type React from "react";
import { MarkdownMessage } from "../ui/markdown";

type ChatMessageProps = {
  isUser?: boolean;
  userProfile?: string;
  children: React.ReactNode;
};

export function ChatMessage({
  isUser,
  userProfile,
  children,
}: ChatMessageProps) {
  return (
    <article
      className={cn(
        "flex items-start gap-4 text-[15px] leading-relaxed",
        isUser && "justify-end",
      )}
    >
      <img
        className={cn(
          "rounded-full",
          isUser ? "order-1" : "border border-black/[0.08] shadow-sm",
        )}
        src={
          isUser
            ? (userProfile ??
              "https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/exp2/user-02_mlqqqt.png")
            : "https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/exp2/user-01_i5l7tp.png"
        }
        alt={isUser ? "User profile" : "Bart logo"}
        width={40}
        height={40}
      />
      <div
        className={cn(isUser ? "bg-muted rounded-xl px-4 py-3" : "space-y-4")}
      >
        <div className="flex  flex-col gap-3">
          <p className="sr-only">{isUser ? "You" : "ChatGPT"} said:</p>
          {typeof children === "string" ? (
            <MarkdownMessage  content={children} />
          ) : (
            children
          )}
        </div>
      </div>
    </article>
  );
}

// type ActionButtonProps = {
//   icon: React.ReactNode;
//   label: string;
// };

// function ActionButton({ icon, label }: ActionButtonProps) {
//   return (
//     <Tooltip>
//       <TooltipTrigger asChild>
//         <Button className="size-8">
//           {icon}
//           <span className="sr-only">{label}</span>
//         </Button>
//       </TooltipTrigger>
//       <TooltipContent side="bottom">
//         <p>{label}</p>
//       </TooltipContent>
//     </Tooltip>
//   );
// }

// function MessageActions() {
//   return (
//     <div className="relative inline-flex -space-x-px rounded-md border border-black/[0.08] bg-white shadow-sm">
//       <TooltipProvider delayDuration={0}>
//         <ActionButton icon={<CodeBracketIcon />} label="Show code" />
//         {/* {/* <ActionButton icon={<RiCodeSSlashLine size={16} />} label="Show code" /> */}
//         {/* <ActionButton icon={<RiBookLine size={16} />} label="Bookmark" />
//         <ActionButton icon={<RiLoopRightFill size={16} />} label="Refresh" />
//         <ActionButton icon={<RiCheckLine size={16} />} label="Approve" /> */}
//       </TooltipProvider>
//     </div>
//   );
// }
