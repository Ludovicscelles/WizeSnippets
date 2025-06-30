import "reflect-metadata";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { IsString, IsNotEmpty } from "class-validator"; 
import { LanguageEnum } from "../models/Language";
import { Snippet } from "./Snippet";


@Entity()
export class Language {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "enum", enum: LanguageEnum, unique: true })
  @IsString()
  @IsNotEmpty()
  name!: LanguageEnum;

  @Column({ nullable: true, type: "text" })
  @IsString()
  description?: string;

  @Column({ nullable: true, type: "text" })
  @IsString()
  icon?: string;

 @OneToMany(() => Snippet, (snippet) => snippet.language)
  snippets!: Snippet[];

}