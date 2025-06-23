import "reflect-metadata";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { Comment } from "./Comment";

@Entity()
export class Snippet {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column("text")
  code!: string;

  @Column("text")
  message!: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @ManyToOne(() => User, (user) => user.snippets)
  user!: User;

  @OneToMany(() => Comment, (comment) => comment.snippet)
  comments!: Comment[];

}
