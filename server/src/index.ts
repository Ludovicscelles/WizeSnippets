import { AppDataSource } from "./data-source";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;

AppDataSource.initialize()
  .then(() => {
    console.info("Connexion à MySQL réussie !");

    app.listen(PORT, () => {
      console.info(`Serveur lancé sur http://localhost:${PORT}`);
    });
  })

  .catch((error) => console.error("Erreur de connexion BDD :", error));
