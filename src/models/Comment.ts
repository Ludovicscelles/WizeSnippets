export interface CommentType {
  id: number;
  suggestedCode: string;
  message: string;
  createdAt: Date;
  snippetId: number;
  userId: number;
}
