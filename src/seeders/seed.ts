import { AppDataSource } from "../data-source";
import { userSeeder } from "./userSeeder";
import { snippetSeeder } from "./snippetSeeder";

async function seedDatabase() {
  try {
    await AppDataSource.initialize();
    console.log("Connexion à la base de données réussie");

    // Call the user seeder
    await userSeeder();
    // Call the snippet seeder
    await snippetSeeder();

    console.log("Base de données initialisée avec succès");
  } catch (error) {
    console.error(
      "Erreur lors de l'initialisation de la base de données :",
      error
    );
  } finally {
    await AppDataSource.destroy();
    process.exit(0);
  }
}

seedDatabase().catch((error) => {
  console.error("Erreur lors de l'exécution du seed :", error);
  process.exit(1);
});
