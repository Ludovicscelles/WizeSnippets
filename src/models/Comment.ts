export interface Comment {
  id: number;
  suggestedCode: string;
  message: string;
  createdAt: Date;
  snippetId: number;
  userId: number;
}
