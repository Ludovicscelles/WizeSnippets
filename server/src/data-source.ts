import "reflect-metadata";
import { DataSource } from "typeorm";
import { Snippet } from "./entities/Snippet";
import { User } from "./entities/User";
import { Comment } from "./entities/Comment";
import { Language } from "./entities/Languages";
import dotenv from "dotenv";

dotenv.config();

const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
const DATABASE = process.env.DATABASE;

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: USERNAME,
  password: PASSWORD,
  database: DATABASE,
  synchronize: true,
  logging: false,
  entities: [Snippet, User, Comment, Language],
});
