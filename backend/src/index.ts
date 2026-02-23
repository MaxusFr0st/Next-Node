import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

app.use(cors());
app.use(express.json());

app.post("/quizzes", async (req, res) => {
  try {
    const { title, questions } = req.body;
    if (!title) return res.status(400).json({ error: "Missing title" });
    const quiz = await prisma.quiz.create({
      data: {
        title,
        questions: {
          create: (questions || []).map((q: any) => ({
            type: q.type,
            text: q.text || "",
            options: q.options ? JSON.stringify(q.options) : null,
            answer: q.answer ? JSON.stringify(q.answer) : null,
          })),
        },
      },
      include: { questions: true },
    });
    res.status(201).json(quiz);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/quizzes", async (req, res) => {
  try {
    const quizzes = await prisma.quiz.findMany({
      include: { questions: true },
      orderBy: { createdAt: "desc" },
    });
    const result = quizzes.map((q) => ({ id: q.id, title: q.title, questionCount: q.questions.length }));
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

const safeParseJson = (value: unknown) => {
  if (value == null) return null;
  // If it's already an object/array/boolean/number/string, just return as-is
  if (typeof value !== "string") return value;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

app.get("/quizzes/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const quiz = await prisma.quiz.findUnique({ where: { id }, include: { questions: true } });
    if (!quiz) return res.status(404).json({ error: "Not found" });
    const enriched = {
      ...quiz,
      questions: quiz.questions.map((q) => ({
        ...q,
        options: safeParseJson(q.options),
        answer: safeParseJson(q.answer),
      })),
    };
    res.json(enriched);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.delete("/quizzes/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    await prisma.quiz.delete({ where: { id } });
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Quiz Builder API listening on http://localhost:${PORT}`);
});
