import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchQuizzes, deleteQuiz } from "../../services/api";

export default function QuizList() {
  const [quizzes, setQuizzes] = useState<any[]>([]);

  useEffect(() => {
    fetchQuizzes().then(setQuizzes).catch(console.error);
  }, []);

  const handleDelete = async (id: number) => {
    await deleteQuiz(id);
    setQuizzes((s) => s.filter((q) => q.id !== id));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Quizzes</h1>
      <p>
        <Link href="/create">Create new quiz</Link>
      </p>
      <ul>
        {quizzes.map((q) => (
          <li key={q.id} style={{ marginBottom: 8 }}>
            <Link href={`/quizzes/${q.id}`}>{q.title}</Link> — {q.questionCount} questions
            <button onClick={() => handleDelete(q.id)} style={{ marginLeft: 8 }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
