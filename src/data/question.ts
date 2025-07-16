
interface Question{
    question: string;
    options: string[];
    correctAnswer: string;
}

export const questions: Question[] = [
  {
    question: "React hangi dil ile yazılmıştır?",
    options: ["Python", "JavaScript", "Java", "C++"],
    correctAnswer: "JavaScript",
  },

  {
    question: "JSX nedir?",
    options: [
      "JavaScript XML",
      "Bir CSS kütüphanesi",
      "Backend dili",
      "Veritabanı",
    ],
    correctAnswer: "JavaScript XML",
  },
  {
    question: "React'te state yönetimi için hangi hook kullanılır?",
    options: ["useEffect", "useState", "useMemo", "useRef"],
    correctAnswer: "useState",
  },
  {
    question: "HTML'de sayfaya başlık eklemek için hangi etiket kullanılır?",
    options: ["<head>", "<title>", "<meta>", "<h1>"],
    correctAnswer: "<title>",
  },
  {
    question: "CSS'de bir elementi gizlemek için hangi özellik kullanılır?",
    options: [
      "visibility: shown",
      "display: none",
      "opacity: 100",
      "hidden: true",
    ],
    correctAnswer: "display: none",
  },
  {
    question:
      "React'te bir bileşenin yalnızca prop değiştiğinde yeniden render edilmesini istiyorsan ne kullanırsın?",
    options: ["React.memo", "useEffect", "useRef", "StrictMode"],
    correctAnswer: "React.memo",
  },
  {
    question:
      "TypeScript'te bir nesneye yalnızca belirli key'lerin atanmasını garanti altına almak için hangi yapı kullanılır?",
    options: ["Union", "Enum", "Record", "Tuple"],
    correctAnswer: "Record",
  },
  {
    question: "React'te 'cleanup' işlemi hangi hook içinde yapılır?",
    options: ["useLayoutEffect", "useRef", "useEffect", "useCallback"],
    correctAnswer: "useEffect",
  },
  {
    question:
      "JavaScript'te async/await yapısında hata yakalamak için hangi yapı kullanılır?",
    options: ["try/catch", "if/else", "await.catch()", "error block"],
    correctAnswer: "try/catch",
  },
  {
    question:
      "Aşağıdakilerden hangisi React performans optimizasyonu için kullanılır?",
    options: ["useMemo", "useState", "useNavigate", "useEffect"],
    correctAnswer: "useMemo",
  },
];
