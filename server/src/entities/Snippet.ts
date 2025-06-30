import "reflect-metadata";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { Comment } from "./Comment";
import { Language } from "./Languages";
import { IsString, Length, IsNotEmpty, IsDate } from "class-validator";

@Entity()
export class Snippet {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false, type: "varchar", length: 150 })
  @IsString()
  @IsNotEmpty()
  @Length(1, 150)
  title!: string;

  @Column({ nullable: false, type: "text" })
  @IsString()
  @IsNotEmpty()
  @Length(1, 5000)
  code!: string;

  @Column({ nullable: false, type: "text" })
  @IsString()
  @IsNotEmpty()
  @Length(1, 5000)
  message!: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  @IsNotEmpty()
  @IsDate()
  createdAt!: Date;

  @Column({ nullable: true, type: "varchar", length: 150 })
  @IsString()
  @Length(1, 150)
  pseudo?: string;

  @Column({ nullable: false, type: "varchar", length: 150 })
  @IsString()
  @IsNotEmpty()
  @Length(1, 150)
  firstname!: string;

  @ManyToOne(() => User, (user) => user.snippets, {
    nullable: false,
    onDelete: "CASCADE",
  })
  user!: User;

  @OneToMany(() => Comment, (comment) => comment.snippet)
  comments!: Comment[];

  @ManyToOne(() => Language, (language) => language.snippets, {
    nullable: false,
    onDelete: "CASCADE",
  })
  language!: Language;
}
