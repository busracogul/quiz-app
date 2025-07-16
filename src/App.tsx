import { useState, useEffect, useRef } from "react";
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
  const [timeLeft, setTimeLeft] = useState(10);

  const timeoutRef = useRef<number | null>(null);

  const currentQuestion: Question = questions[currentIndex];

  useEffect(() => {
    setTimeLeft(10);
    setIsAnswered(false);
    setSelectedOption(null);
  }, [currentIndex]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleTimeout();
      return;
    }

    timeoutRef.current = window.setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [timeLeft]);

  const nextQuestion = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const handleAnswer = (option: string) => {
    if (isAnswered) return;

    setSelectedOption(option);
    setIsAnswered(true);

    setTimeout(() => {
      nextQuestion();
    }, 1000);
  };

  const handleTimeout = () => {
    if (isAnswered) return;

    setIsAnswered(true);
    setSelectedOption(null);

    setTimeout(() => {
      nextQuestion();
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
      <p className="mb-4 font-semibold bg-secondary border border-warning rounded-full px-5 py-3 inline-block">
        {timeLeft}
      </p>
      <p className="font-bold text-lg text-text1 mb-2">
        {currentIndex + 1}/{questions.length} {currentQuestion.question}
      </p>

      <ul className="space-y-2">
        {currentQuestion.options.map((option, i) => {
          let baseClass =
            "w-full text-left p-3 rounded cursor-pointer transition-colors border border-text2 rounded-full pl-6";
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
}

export default App;
