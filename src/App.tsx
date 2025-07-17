import { useState, useEffect, useRef } from "react";
import { questions } from "./data/question";
import Timer from "./components/Timer";
import QuestionCard from "./components/QuestionCard";

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

const randomizeQuestions = (questions: Question[]) => {
  const shuffled = [...questions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

function App() {
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const shuffled = randomizeQuestions(questions);
    setShuffledQuestions(shuffled);
  }, []);

  useEffect(() => {
    setTimeLeft(60);
    setIsAnswered(false);
    setSelectedOption(null);
  }, [currentIndex]);

  useEffect(() => {
    if (!isQuizStarted || timeLeft === 0) {
      if (timeLeft === 0) handleTimeout();
      return;
    }

    timeoutRef.current = window.setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [timeLeft, isQuizStarted]);

  if (!isQuizStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral p-6">
        <div className="text-center p-8 rounded-xl  border border-neutral  w-full animate-fade-in">
          <p className="text-3xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-correct to-warning mb-2">
            🚀 FrontendQuiz
          </p>
          <p className="text-lg md:text-2xl text-text1 font-semibold mb-4">
            Frontend becerilerini test et!
          </p>
          <p className="italic text-sm md:text-lg text-text2 mb-2">
            Bu test 10 sorudan oluşmaktadır.
          </p>
          <div className="flex items-center justify-center">
            <button
              onClick={() => setIsQuizStarted(true)}
              className="mt-4 text-lg md:text-2xl flex items-center justify-center gap-2 px-6 py-2 bg-correct hover:bg-green-500 text-text3 font-semibold rounded-full transition duration-300"
            >
              🎯 Teste Başla
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = shuffledQuestions[currentIndex];

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
    setShuffledQuestions(randomizeQuestions(questions));
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setTimeLeft(60);
    setScore(0);
    setIsQuizStarted(false);
  };

  if (currentIndex >= shuffledQuestions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral p-6">
        <div className="text-center p-6 rounded-xl">
          <h2 className="text-4xl font-bold mb-2 text-primary1">
            Test Bitti 🥳
          </h2>
          <p className="text-2xl font-semibold text-green-700 mb-4">
            SKOR: {score} / {shuffledQuestions.length}
          </p>

          <button
            onClick={restartQuiz}
            className="mt-4 text-xl px-6 py-2 bg-correct text-white font-semibold rounded-full transition"
          >
            Yeniden Başla
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-neutral p-6">
      <div className="w-full max-w-xl">
        <Timer timeLeft={timeLeft} />
        <QuestionCard
          question={currentQuestion.question}
          options={currentQuestion.options}
          correctAnswer={currentQuestion.correctAnswer}
          selectedOption={selectedOption}
          isAnswered={isAnswered}
          onAnswer={handleAnswer}
          currentIndex={currentIndex}
          totalQuestions={shuffledQuestions.length}
        />
      </div>
    </div>
  );
}

export default App;
