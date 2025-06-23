import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes";
import snippetRouter from "./routes/snippetRoutes";
import commentRouter from "./routes/commentRoutes";
dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/users", userRouter);

app.use("/api/snippets", snippetRouter);

app.use("/api/comments", commentRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
