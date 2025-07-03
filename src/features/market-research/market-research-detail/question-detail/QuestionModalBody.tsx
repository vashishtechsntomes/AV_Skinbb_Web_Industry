import type { SurveyQuestion } from "@/types/research.type";
import OptionsToggle from "./OptionsToggle";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { createContext, useState } from "react";
import OptionCharts from "./OptionCharts";

interface QuestionContext {
  question?: SurveyQuestion;
  activeToggle: string;
}
export const QuestionDetailContext = createContext<QuestionContext>({
  question: undefined,
  activeToggle: "",
});

const QuestionModalBody = ({
  question,
  index,
}: {
  question: SurveyQuestion;
  index: number;
}) => {
  const [currentOption, setCurrentOption] = useState(question.options[0]);
  return (
    <QuestionDetailContext.Provider
      value={{
        activeToggle: currentOption,
        question: question,
      }}
    >
      <DialogContent
        className="min-w-[calc(100vw-5rem)] p-0"
        showCloseButton={false}
        aria-description={question.text}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 p-5 px-5 pb-3">
            <div className="bg-muted flex aspect-square h-11 items-center justify-center rounded-md border">
              {index + 1}
            </div>
            <div>
              <h2 className="text-xl">{question.text}</h2>
              <span className="text-muted-foreground text-base font-normal">
                {question.description}
              </span>
            </div>
            <div className="ml-auto flex gap-2">
              <div className="space-x-2">
                <span className="font-bold">20 (18%)</span>
                <span className="text-muted-foreground text-base">Acne</span>
              </div>
              <DialogTrigger asChild>
                <Button
                  variant={"outlined"}
                  size={"icon"}
                  startIcon={<XMarkIcon />}
                ></Button>
              </DialogTrigger>
            </div>
          </DialogTitle>
        </DialogHeader>
        <hr />
        <div className="grid grid-cols-10 px-5 pt-3 pb-5 gap-2 md:gap-5">
          <div className="col-span-2">
            Options
            <div className="mt-2 flex flex-col gap-5">
              <OptionsToggle
                value={currentOption}
                options={question.options}
                onValueChange={(data) => {
                  setCurrentOption(data);
                }}
              />
            </div>
          </div>
          <div className="col-span-8">
            <OptionCharts />
          </div>
        </div>
      </DialogContent>
    </QuestionDetailContext.Provider>
  );
};

export default QuestionModalBody;
