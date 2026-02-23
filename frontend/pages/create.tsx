import { useState } from "react";
import { useRouter } from "next/router";
import { createQuiz } from "../services/api";

type Question = {
  type: string;
  text: string;
  options?: string[];
  answer?: any;
};

export default function Create() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);

  const addQuestion = () => setQuestions((s) => [...s, { type: "input", text: "", options: [], answer: null }]);

  const updateQuestion = (i: number, patch: Partial<Question>) => {
    setQuestions((s) => s.map((q, idx) => (idx === i ? { ...q, ...patch } : q)));
  };

  const removeQuestion = (i: number) => setQuestions((s) => s.filter((_, idx) => idx !== i));

  const submit = async () => {
    const payload = { title, questions };
    await createQuiz(payload);
    router.push("/quizzes");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Create Quiz</h1>
      <div>
        <label>Title</label>
        <div>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
      </div>
      <hr />
      <div>
        <h2>Questions</h2>
        {questions.map((q, i) => (
          <div key={i} style={{ border: "1px solid #ddd", padding: 8, marginBottom: 8 }}>
            <div>
              <label>Type</label>
              <select value={q.type} onChange={(e) => updateQuestion(i, { type: e.target.value })}>
                <option value="boolean">Boolean</option>
                <option value="input">Input</option>
                <option value="checkbox">Checkbox</option>
              </select>
            </div>
            <div>
              <label>Text</label>
              <input value={q.text} onChange={(e) => updateQuestion(i, { text: e.target.value })} />
            </div>
            {q.type === "checkbox" && (
              <div>
                <label>Options (comma separated)</label>
                <input
                  value={(q.options || []).join(",")}
                  onChange={(e) => updateQuestion(i, { options: e.target.value.split(",") })}
                />
                <div>
                  <label>Correct indices (comma separated)</label>
                  <input
                    onChange={(e) => updateQuestion(i, { answer: e.target.value.split(",").map((s) => Number(s)) })}
                  />
                </div>
              </div>
            )}
            {q.type === "boolean" && (
              <div>
                <label>Answer</label>
                <select onChange={(e) => updateQuestion(i, { answer: e.target.value === "true" })}>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
            )}
            <div>
              <button onClick={() => removeQuestion(i)}>Remove</button>
            </div>
          </div>
        ))}
        <button onClick={addQuestion}>Add Question</button>
      </div>
      <hr />
      <button onClick={submit} disabled={!title || questions.length === 0}>
        Create Quiz
      </button>
    </div>
  );
}
