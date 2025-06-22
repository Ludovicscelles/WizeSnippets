import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes";
dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
