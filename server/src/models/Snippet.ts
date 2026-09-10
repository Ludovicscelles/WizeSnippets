export interface SnippetType {
  id: number;
  title: string;
  code: string;
  message: string;
  createdAt: Date;
  user_id: number;
  pseudo?: string; 
  firstname: string;
  languageId: number;
  language: string; 
}

export interface SnippetWithCommentsType extends SnippetType {
  id: number;
  title: string;
  code: string;
  message: string;
  createdAt: Date;
  user_id: number;
  languageId: number;
  language: string; 
  pseudo?: string; 
  firstname: string;
  Comments: {
    firstname: string; 
    suggestedCode: string;
    message: string;
  }[];
}

export type SnippetInputType = {
  title: string;
  code: string;
  message: string;
  user_id: number;
  languageId: number;
};
