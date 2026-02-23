import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export const api = axios.create({ baseURL: API_BASE });

export const fetchQuizzes = async () => {
  const res = await api.get("/quizzes");
  return res.data;
};

export const fetchQuiz = async (id: number) => {
  const res = await api.get(`/quizzes/${id}`);
  return res.data;
};

export const createQuiz = async (payload: any) => {
  const res = await api.post(`/quizzes`, payload);
  return res.data;
};

export const deleteQuiz = async (id: number) => {
  return api.delete(`/quizzes/${id}`);
};
