import "reflect-metadata";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Snippet } from "./Snippet";
import { Comment } from "./Comment";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstname!: string;

  @Column()
  lastname!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ unique: true })
  pseudo!: string;

  @Column()
  password!: string;

  @OneToMany(() => Snippet, (snippet) => snippet.user)
  snippets!: Snippet[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments!: Comment[];

}
