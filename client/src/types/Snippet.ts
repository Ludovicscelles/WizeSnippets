export type Snippet = {
  id: number;
  title: string;
  code: string;
  message: string;
  createdAt: string;
  user_id: number;
  pseudo?: string;
  firstname: string;
  languageId: number;
  language: string;
  Comments?: {
    id: number;
    pseudo?: string;
    firstname: string;
    suggestedCode: string;
    message: string;
  }[];
};

export type DetailCardSnippetProps = {
  snippet: Snippet;
};
