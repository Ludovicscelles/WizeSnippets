import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes";
import snippetRouter from "./routes/snippetRoutes";
import commentRouter from "./routes/commentRoutes";
import languageRouter from "./routes/languageRoutes";
import authRouter from "./routes/authRoutes";

dotenv.config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API WizeSnippets !");
});

app.use("/api/users", userRouter);

app.use("/api/snippets", snippetRouter);

app.use("/api/comments", commentRouter);

app.use("/api/languages", languageRouter);

app.use("/api/auth", authRouter);

export default app;
