import { AppDataSource } from "./data-source";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;

AppDataSource.initialize()
  .then(() => {
    console.log("Connexion à MySQL réussie !");

    app.listen(PORT, () => {
      console.log(`Serveur lancé sur http://localhost:${PORT}`);
    });
  })

  .catch((error) => console.error("Erreur de connexion BDD :", error));
