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
      password: "Password123!",
      refName: "user1",
    },
    {
      firstname: "Jane",
      lastname: "Doe",
      email: "jane@example.com",
      pseudo: "janedoe",
      password: "SecurePwd456#",
      refName: "user2",
    },
    {
      firstname: "Alice",
      lastname: "Smith",
      email: "alice@example.com",
      pseudo: "alicesmith",
      password: "AlicePwd789@",
      refName: "user3",
    },
    {
      firstname: "Bob",
      lastname: "Johnson",
      email: "bob@example.com",
      pseudo: "bobjohnson",
      password: "B0bStrongPass$",
      refName: "user4",
    },
    {
      firstname: "Charlie",
      lastname: "Brown",
      email: "charlie@example.com",
      pseudo: "charliebrown",
      password: "Ch@rlie2024",
      refName: "user5",
    },
    {
      firstname: "David",
      lastname: "Miller",
      email: "david@example.com",
      pseudo: "davidmiller",
      password: "Dav1d!Miller",
      refName: "user6",
    },
    {
      firstname: "Emma",
      lastname: "Wilson",
      email: "emma@example.com",
      pseudo: "emmawilson",
      password: "EmmaW!ls0n*",
      refName: "user7",
    },
    {
      firstname: "Frank",
      lastname: "Taylor",
      email: "frank@example.com",
      pseudo: "franktaylor",
      password: "Fr4nk#Taylor",
      refName: "user8",
    },
    {
      firstname: "Grace",
      lastname: "Anderson",
      email: "grace@example.com",
      pseudo: "graceanderson",
      password: "Gr@ceAnd3rs0n",
      refName: "user9",
    },
    {
      firstname: "Henry",
      lastname: "Thomas",
      email: "henry@example.com",
      pseudo: "henrythomas",
      password: "H3nry!Thom@s",
      refName: "user10",
    },
  ];

  const userRefs: Record<string, number> = {};

  for (const { refName, ...userData } of users) {
    const existingUser = await userRepository.findOneBy({
      email: userData.email,
    });

    let savedUser: User;

    if (!existingUser) {
      const user = userRepository.create(userData);
      savedUser = await userRepository.save(user);
      console.info(
        `Utilisateur ${userData.firstname} ${userData.lastname} créé avec succès`
      );
    } else {
      console.info(
        `Utilisateur  ${userData.firstname} ${userData.lastname} existe déjà, pas de création`
      );
      savedUser = existingUser;
    }
    if (refName) {
      userRefs[refName] = savedUser.id;
    }
  }
  console.info("Seeding des utilisateurs terminé");
  return userRefs;
};
