import "reflect-metadata";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Snippet } from "./Snippet";
import { User } from "./User";
import { IsString, Length, IsNotEmpty, IsDate } from "class-validator";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false, type: "text" })
  @IsString()
  @IsNotEmpty()
  @Length(1, 5000)
  suggestedCode!: string;

  @Column({nullable: false, type: "text" })
  @IsString()
  @IsNotEmpty()
  @Length(1, 5000)
  message!: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  @IsNotEmpty()
  @IsDate()
  createdAt!: Date;

  @ManyToOne(() => Snippet, (snippet) => snippet.comments)
  snippet!: Snippet;

  @ManyToOne(() => User, (user) => user.comments)
  user!: User;
}
