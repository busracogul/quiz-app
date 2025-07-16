import { useState } from "react";
import { questions } from "./data/question";

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const currentQuestion: Question = questions[currentIndex];

  const handleAnswer = (option: string) => {
    if (isAnswered) return;

    setSelectedOption(option);
    setIsAnswered(true);

    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    }, 1000);
  };

  if (currentIndex >= questions.length) {
    return (
      <div className="p-6 max-w-xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-2 text-primary1">Test Bitti</h2>
        <p className="text-text2">Toplam soru: {questions.length}</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <p className="font-bold text-lg text-text1 mb-4">
        {currentIndex + 1}/{questions.length} {currentQuestion.question}
      </p>

      <ul className="space-y-2">
        {currentQuestion.options.map((option, i) => {
          let baseClass =
            "w-full text-left p-3 rounded cursor-pointer transition-colors";

          let stateClass = "bg-primary2 hover:bg-text2";

          if (isAnswered) {
            if (option === currentQuestion.correctAnswer) {
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
                onClick={() => handleAnswer(option)}
                disabled={isAnswered}
                className={`${baseClass} ${stateClass} border border-text2 rounded-full pl-6
                `}
              >
                {option}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
