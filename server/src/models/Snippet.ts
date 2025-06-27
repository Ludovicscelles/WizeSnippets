export interface SnippetType {
  id: number;
  title: string;
  code: string;
  message: string;
  createdAt: Date;
  user_id: number;
  pseudo?: string; // Optional, if you want to include the user's pseudo
  firstname: string; 
}

export interface SnippetWithCommentsType extends SnippetType {
  id: number;
  title: string;
  code: string;
  message: string;
  createdAt: Date;
  user_id: number;
  pseudo?: string; // Optional, if you want to include the user's pseudo
  firstname: string;
  Comments: {
    firstname: string; // Optional, if you want to include the user's firstname
    pseudo: string;
    suggestedCode: string;
    message: string;
  }[];
}
