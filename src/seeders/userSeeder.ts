import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

export const userSeeder = async () => {
  const userRepository = AppDataSource.getRepository(User);

  const users = [
    {
      firstname: "John",
      lastname: "Doe",
      email: "john@example.com",
      pseudo: "johndoe",
      password: "password123",
    },
    {
      firstname: "Jane",
      lastname: "Doe",
      email: "jane@example.com",
      pseudo: "janedoe",
      password: "password456",
    },

    {
      firstname: "Alice",
      lastname: "Smith",
      email: "alice@example.com",
      pseudo: "alicesmith",
      password: "password789",
    },
    {
      firstname: "Bob",
      lastname: "Johnson",
      email: "bob@example.com",
      pseudo: "bobjohnson",
      password: "password101",
    },
    {
      firstname: "Charlie",
      lastname: "Brown",
      email: "charlie@example.com",
      pseudo: "charliebrown",
      password: "password102",
    },
    {
      firstname: "David",
      lastname: "Miller",
      email: "david@example.com",
      pseudo: "davidmiller",
      password: "password103",
    },
    {
      firstname: "Emma",
      lastname: "Wilson",
      email: "emma@example.com",
      pseudo: "emmawilson",
      password: "password104",
    },
    {
      firstname: "Frank",
      lastname: "Taylor",
      email: "frank@example.com",
      pseudo: "franktaylor",
      password: "password105",
    },
    {
      firstname: "Grace",
      lastname: "Anderson",
      email: "grace@example.com",
      pseudo: "graceanderson",
      password: "password106",
    },
    {
      firstname: "Henry",
      lastname: "Thomas",
      email: "henry@example.com",
      pseudo: "henrythomas",
      password: "password107",
    },
  ];

  for (const userData of users) {
    const existingUser = await userRepository.findOneBy({ email: userData.email });
    if (!existingUser) {
      const user = userRepository.create(userData);
      await userRepository.save(user);
      console.log(
        `Utilisateur ${userData.firstname} ${userData.lastname} créé avec succès`
      );
    } else {
      console.log(
        `Utilisateur  ${userData.firstname} ${userData.lastname} existe déjà, pas de création`
      );
    }
  }
  console.log("Seeding des utilisateurs terminé");
};
