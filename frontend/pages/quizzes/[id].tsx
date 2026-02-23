import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchQuiz } from "../../services/api";

export default function QuizDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [quiz, setQuiz] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    fetchQuiz(Number(id)).then(setQuiz).catch(console.error);
  }, [id]);

  if (!quiz) return <div style={{ padding: 20 }}>Loading...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>{quiz.title}</h1>
      <ol>
        {quiz.questions.map((q: any) => (
          <li key={q.id} style={{ marginBottom: 12 }}>
            <div><strong>Type:</strong> {q.type}</div>
            <div><strong>Text:</strong> {q.text}</div>
            {q.options && (
              <div>
                <strong>Options:</strong>
                <ul>
                  {q.options.map((o: any, i: number) => (
                    <li key={i}>{o}</li>
                  ))}
                </ul>
              </div>
            )}
            {q.answer && (
              <div>
                <strong>Answer:</strong> {JSON.stringify(q.answer)}
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
