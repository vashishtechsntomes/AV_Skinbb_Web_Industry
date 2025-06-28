import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ToggleGroup } from "@/components/ui/toggle-group";
// import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import type { Survey } from "@/types/research.type";
import { EyeIcon, XMarkIcon } from "@heroicons/react/24/outline";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { CircleIcon } from "lucide-react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";

interface SurveyQuestionProps {
  data: Survey;
}
const SurveyQuestions = ({ data }: SurveyQuestionProps) => {
  return (
    <>
      <div className="flex flex-col gap-5">
        {data.questions.map((question, index) => {
          return (
            <Dialog key={question.text}>
              <DialogTrigger>
                <button className="bg-card group hover:bg-muted flex w-full cursor-pointer items-center justify-between gap-5 overflow-hidden rounded-md border p-5 text-lg font-medium shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="bg-muted flex aspect-square h-10 items-center justify-center rounded-md border">
                      {index + 1}
                    </div>
                    {question.text}
                  </div>

                  <div className="flex items-center transition-all">
                    <div className="space-x-2">
                      <span className="font-bold">20 (18%)</span>
                      <span className="text-muted-foreground text-base">
                        Acne
                      </span>
                    </div>

                    <Button
                      className="hidden group-hover:block"
                      variant={"text"}
                      startIcon={<EyeIcon />}
                    ></Button>
                  </div>
                </button>
              </DialogTrigger>
              <DialogContent
                className="min-w-[calc(100vw-5rem)] p-0"
                showCloseButton={false}
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
                    <div className="ml-auto flex">
                      <div className="space-x-2">
                        <span className="font-bold">20 (18%)</span>
                        <span className="text-muted-foreground text-base">
                          Acne
                        </span>
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
                  <hr />
                  <div className="grid grid-cols-10 px-5 pt-3 pb-5">
                    <div className="col-span-2">
                      Options
                      <div className="mt-2 flex flex-col gap-5">
                        <ToggleGroup
                          type="single"
                          className="w-full flex-col items-start justify-center gap-3"
                        >
                          {question.options.map((radio) => (
                            <ToggleGroupPrimitive.Item
                              value={radio}
                              data-slot="toggle-group-item"
                              className="data-[state=on]:border-primary data-[state=on]:[&_svg]:fill-primary data-[state=on]:ring-primary relative flex w-full items-center justify-start gap-2 rounded-lg border px-3 py-2 data-[state=on]:ring-2 [&>svg]:fill-transparent"
                            >
                              <div className="grid size-4 place-content-center rounded-full border p-1">
                                <CircleIcon className="size-2 stroke-transparent" />
                              </div>
                              {radio}
                            </ToggleGroupPrimitive.Item>
                          ))}
                        </ToggleGroup>
                      </div>
                    </div>
                    <div className="col-span-8">Chart</div>
                  </div>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          );
        })}
      </div>
    </>
  );
};

export default SurveyQuestions;
