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
