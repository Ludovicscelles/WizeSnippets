import "reflect-metadata";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Snippet } from "./Snippet";
import { User } from "./User";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("text")
  suggestedCode!: string;

  @Column("text")
  message!: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @ManyToOne(() => Snippet, (snippet) => snippet.comments)
  snippet!: Snippet;

  @ManyToOne(() => User, (user) => user.comments)
  user!: User;
}
