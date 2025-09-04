import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { TodoModel } from "./models/Todo.js";

const app = express();

const PORT = Number(process.env.PORT ?? 3000);
const ORIGIN = process.env.CORS_ORIGIN ?? "http://localhost:5173";
const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not set");
}

app.use(cors({ origin: ORIGIN, credentials: false }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

// すべてのTodo取得
app.get("/api/todos", async (_req, res) => {
  const todos = await TodoModel.find().sort({ createdAt: -1 }).lean();
  res.json(todos);
});

// 追加（空文字禁止・エラー返却）
app.post("/api/todos", async (req, res) => {
  try {
    const { text } = req.body as { text?: string };
    const todo = await TodoModel.create({ text });
    res.status(201).json(todo);
  } catch (err: any) {
    // Mongoose の ValidationError を 400 で返す
    if (err?.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e: any) => e.message);
      return res.status(400).json({ error: "ValidationError", messages });
    }
    console.error(err);
    res.status(500).json({ error: "InternalServerError" });
  }
});

// 削除
app.delete("/api/todos/:id", async (req, res) => {
  const { id } = req.params;
  const deleted = await TodoModel.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ error: "NotFound" });
  res.json({ ok: true });
});

// DB接続→サーバ起動
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () =>
      console.log(`Server listening on http://localhost:${PORT}`)
    );
  })
  .catch((e) => {
    console.error("MongoDB connection error:", e);
    process.exit(1);
  });
