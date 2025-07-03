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
const HOST = process.env.HOST || "localhost"; 
const PORT = Number(process.env.DB_PORT) || 3306;

export const AppDataSource = new DataSource({
  type: "mysql",
  host: HOST,
  port: Number(PORT),
  username: USERNAME,
  password: PASSWORD,
  database: DATABASE,
  synchronize: true,
  logging: false,
  entities: [Snippet, User, Comment, Language],
});
