# Quiz Builder – Full-Stack Application

A complete full-stack quiz creation platform built with **Express.js**, **Prisma**, **Next.js**, and **TypeScript**.

## Features

- ✅ Create custom quizzes with multiple question types (Boolean, Input, Checkbox)
- ✅ View and manage all quizzes in a dashboard
- ✅ Delete quizzes
- ✅ View detailed quiz structure
- ✅ TypeScript throughout
- ✅ ESLint and Prettier configured

## Quick Start

### 1. Backend

```bash
cd backend
npm install
npx prisma migrate dev --name init
npm run dev
```

The API will run on `http://localhost:4000`

### 2. Frontend (in another terminal)

```bash
cd frontend
npm install
npm run dev
```

Opens at `http://localhost:3000`

---

## Setup

### Backend `.env` (create from `.env.example`)
```
DATABASE_URL="file:./dev.db"
PORT=4000
```

### Frontend `.env.local`
```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

---

## Code Quality

Format code:
```bash
cd backend && npm run format
cd frontend && npm run format
```

Lint code:
```bash
cd backend && npm run lint
cd frontend && npm run lint
```

