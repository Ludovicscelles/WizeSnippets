import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes";
import snippetRouter from "./routes/snippetRoutes";
import commentRouter from "./routes/commentRoutes";
import { AppDataSource } from "./data-source";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT;

AppDataSource.initialize()
  .then(() => {
    console.log("Connexion à MySQL réussie !");

    const app = express();
    app.use(express.json());

    app.use(
      cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
      })
    );

    app.get("/", (req, res) => {
      res.send("Hello, World!");
    });

    app.use("/api/users", userRouter);

    app.use("/api/snippets", snippetRouter);

    app.use("/api/comments", commentRouter);

    app.listen(PORT, () => {
      console.log(`Serveur lancé sur http://localhost:${PORT}`);
    });
  })

  .catch((error) => console.error("Erreur de connexion BDD :", error));
