import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { hashPassword } from "../service/utils/hash";

export const userSeeder = async () => {
  const userRepository = AppDataSource.getRepository(User);

  const users = [
    {
      firstname: "John",
      lastname: "Doe",
      email: "john@example.com",
      pseudo: "johndoe",
      password: await hashPassword("Password123!"),
      refName: "user1",
    },
    {
      firstname: "Jane",
      lastname: "Doe",
      email: "jane@example.com",
      pseudo: "janedoe",
      password: await hashPassword("SecurePwd456#"),
      refName: "user2",
    },
    {
      firstname: "Alice",
      lastname: "Smith",
      email: "alice@example.com",
      pseudo: "alicesmith",
      password: await hashPassword("AlicePwd789@"),
      refName: "user3",
    },
    {
      firstname: "Bob",
      lastname: "Johnson",
      email: "bob@example.com",
      pseudo: "bobjohnson",
      password: await hashPassword("B0bStrongPass$"),
      refName: "user4",
    },
    {
      firstname: "Charlie",
      lastname: "Brown",
      email: "charlie@example.com",
      pseudo: "charliebrown",
      password: await hashPassword("Ch@rlie2024"),
      refName: "user5",
    },
    {
      firstname: "David",
      lastname: "Miller",
      email: "david@example.com",
      pseudo: "davidmiller",
      password: await hashPassword("Dav1d!Miller"),
      refName: "user6",
    },
    {
      firstname: "Emma",
      lastname: "Wilson",
      email: "emma@example.com",
      pseudo: "emmawilson",
      password: await hashPassword("EmmaW!ls0n*"),
      refName: "user7",
    },
    {
      firstname: "Frank",
      lastname: "Taylor",
      email: "frank@example.com",
      pseudo: "franktaylor",
      password: await hashPassword("Fr4nk#Taylor"),
      refName: "user8",
    },
    {
      firstname: "Grace",
      lastname: "Anderson",
      email: "grace@example.com",
      pseudo: "graceanderson",
      password: await hashPassword("Gr@ceAnd3rs0n"),
      refName: "user9",
    },
    {
      firstname: "Henry",
      lastname: "Thomas",
      email: "henry@example.com",
      pseudo: "henrythomas",
      password: await hashPassword("H3nry!Thom@s"),
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
        `Utilisateur ${userData.firstname} ${userData.lastname} créé avec succès`,
      );
    } else {
      console.info(
        `Utilisateur  ${userData.firstname} ${userData.lastname} existe déjà, pas de création`,
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
