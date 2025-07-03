import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import type { SurveyQuestion } from "@/types/research.type";
import { EyeIcon } from "@heroicons/react/24/outline";
import { createContext } from "react";
import QuestionModalBody from "./QuestionModalBody";

const QuestionDetailModal = ({
  question,
  index,
}: {
  question: SurveyQuestion;
  index: number;
}) => {
  return (
    <Dialog key={question.text}>
      <DialogTrigger asChild>
        <button className="bg-card group hover:bg-muted flex w-full cursor-pointer items-center justify-between gap-3 overflow-hidden rounded-md border p-5 text-lg font-medium shadow-md md:gap-5">
          <div className="flex items-center gap-2 text-left md:gap-3">
            <div className="bg-muted flex aspect-square h-10 items-center justify-center rounded-md border">
              {index + 1}
            </div>
            {question.text}
          </div>

          <div className="flex items-center transition-all">
            <div className="space-x-2">
              <span className="font-bold">20 (18%)</span>
              <span className="text-muted-foreground text-base">Acne</span>
            </div>

            <Button
              className="hidden group-hover:block"
              variant={"text"}
              startIcon={<EyeIcon />}
            ></Button>
          </div>
        </button>
      </DialogTrigger>

      <QuestionModalBody question={question} index={index} />
    </Dialog>
  );
};

export default QuestionDetailModal;
