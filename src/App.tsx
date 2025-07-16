import { useState, useEffect, useRef } from "react";
import { questions } from "./data/question";
import Timer from "./components/Timer";
import QuestionCard from "./components/QuestionCard";

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
  const [score, setScore] = useState(0);
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
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [timeLeft]);

  const nextQuestion = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const handleAnswer = (option: string) => {
    if (isAnswered) return;

    setSelectedOption(option);
    setIsAnswered(true);

    if (option === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }

    setTimeout(nextQuestion, 1000);
  };

  const handleTimeout = () => {
    if (isAnswered) return;

    setIsAnswered(true);
    setSelectedOption(null);

    setTimeout(nextQuestion, 1000);
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setTimeLeft(10);
    setScore(0);
  };

  if (currentIndex >= questions.length) {
    return (
      <div className="p-6 max-w-xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-2 text-primary1">Test Bitti</h2>
        <p className="text-lg font-semibold text-green-700 mb-4">
          SKOR: {score} / {questions.length}
        </p>

        <button
          onClick={restartQuiz}
          className="mt-4 px-6 py-2 bg-correct text-white font-semibold rounded-full transition"
        >
          Yeniden Başla
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <Timer timeLeft={timeLeft} />
      <QuestionCard
        question={currentQuestion.question}
        options={currentQuestion.options}
        correctAnswer={currentQuestion.correctAnswer}
        selectedOption={selectedOption}
        isAnswered={isAnswered}
        onAnswer={handleAnswer}
        currentIndex={currentIndex}
        totalQuestions={questions.length}
      />
    </div>
  );
}

export default App;
