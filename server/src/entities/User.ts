import "reflect-metadata";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BeforeInsert,
} from "typeorm";
import { Snippet } from "./Snippet";
import { Comment } from "./Comment";
import { hashPassword } from "../service/utils/hash";
import { IsString, IsEmail, Length, IsNotEmpty } from "class-validator";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false, type: "varchar", length: 150 })
  @IsString()
  @IsNotEmpty()
  @Length(1, 150)
  firstname!: string;

  @Column({ nullable: false, type: "varchar", length: 150 })
  @IsString()
  @IsNotEmpty()
  @Length(1, 150)
  lastname!: string;

  @Column({ nullable: false, unique: true, type: "varchar", length: 150 })
  @IsEmail()
  @Length(1, 150)
  @IsNotEmpty()
  email!: string;

  @Column({ nullable: true, unique: true, type: "varchar", length: 150 })
  @IsString()
  @Length(1, 150)
  pseudo?: string;

  @Column({ nullable: false, type: "varchar", length: 255 })
  password!: string;

  @OneToMany(() => Snippet, (snippet) => snippet.user)
  snippets!: Snippet[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments!: Comment[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await hashPassword(this.password);
  }
}
