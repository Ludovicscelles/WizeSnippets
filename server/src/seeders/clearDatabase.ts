import { AppDataSource } from "../data-source";
import { Comment } from "../entities/Comment";
import { Snippet } from "../entities/Snippet";
import { User } from "../entities/User";

export const clearDatabase = async () => {
  await AppDataSource.initialize();

  const commentRepo = AppDataSource.getRepository(Comment);
  const snippetRepo = AppDataSource.getRepository(Snippet);
  const userRepo = AppDataSource.getRepository(User);

  await commentRepo.createQueryBuilder().delete().execute();
  console.info("Commentaires supprimés.");
  await snippetRepo.createQueryBuilder().delete().execute();
  console.info("Snippets supprimés.");
  await userRepo.createQueryBuilder().delete().execute();
  console.info("Utilisateurs supprimés.");

  console.info(
    "Tous les enregistrements de la base de données ont été supprimés."
  );

  await AppDataSource.destroy();
};

clearDatabase().catch((err) => {
  console.error("Erreur lors de la suppression des enregistrements :", err);
  process.exit(1);
});
