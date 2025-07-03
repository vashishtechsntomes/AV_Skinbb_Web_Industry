import type { Survey } from "@/types/research.type";
import QuestionDetailModal from "./question-detail";

interface SurveyQuestionProps {
  data: Survey;
}
const SurveyQuestions = ({ data }: SurveyQuestionProps) => {
  return (
    <>
      <div className="flex flex-col gap-2 md:gap-5">
        {data.questions.map((question, index) => {
          return (
            <QuestionDetailModal
              question={question}
              index={index}
              key={question.text}
            />
          );
        })}
      </div>
    </>
  );
};

export default SurveyQuestions;
