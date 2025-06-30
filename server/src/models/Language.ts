export enum LanguageEnum {
  JAVASCRIPT = "JavaScript",
  PYTHON = "Python",
  JAVA = "Java",
  C_SHARP = "C#",
  C_PLUS_PLUS = "C++",
  RUBY = "Ruby",
  PHP = "PHP",
  GO = "Go",
  SWIFT = "Swift",
  KOTLIN = "Kotlin",
  RUST = "Rust",
  TYPESCRIPT = "TypeScript",
  HTML = "HTML",
  CSS = "CSS",
  SQL = "SQL",
  BASH = "Bash",
}

export interface LanguageType {
  id: number;
  name: string;
  description?: string;
  icon?: string;
  snippetIds?: number[];
}

export type LanguageInputType = {
  name: LanguageEnum;
  description?: string;
  icon?: string;
};
