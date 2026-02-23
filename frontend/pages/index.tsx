import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Quiz Builder</h1>
      <p>
        <Link href="/create">Create a Quiz</Link>
      </p>
      <p>
        <Link href="/quizzes">View Quizzes</Link>
      </p>
    </div>
  );
}
