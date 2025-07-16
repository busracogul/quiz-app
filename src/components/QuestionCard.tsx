interface QuestionCardProps {
  question: string;
  options: string[];
  correctAnswer: string;
  selectedOption: string | null;
  isAnswered: boolean;
  onAnswer: (option: string) => void;
  currentIndex: number;
  totalQuestions: number;
}

const QuestionCard = ({
  question,
  options,
  correctAnswer,
  selectedOption,
  isAnswered,
  onAnswer,
  currentIndex,
  totalQuestions,
}: QuestionCardProps) => {
  return (
    <div>
      <p className="font-bold text-lg text-text1 mb-2">
        {currentIndex + 1}/{totalQuestions} {question}
      </p>

      <ul className="space-y-2">
        {options.map((option, i) => {
          let baseClass =
            "w-full text-left p-3 rounded cursor-pointer transition-colors border border-text2 rounded-full pl-6";

          let stateClass = "bg-primary2 hover:bg-text2";

          if (isAnswered) {
            if (option === correctAnswer) {
              stateClass = "bg-correct text-white";
            } else if (option === selectedOption) {
              stateClass = "bg-incorrect text-white";
            } else {
              stateClass = "bg-neutral";
            }
          }

          return (
            <li key={i}>
              <button
                onClick={() => onAnswer(option)}
                disabled={isAnswered}
                className={`${baseClass} ${stateClass}`}
              >
                {option}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default QuestionCard;
