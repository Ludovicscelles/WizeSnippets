export interface CommentType {
  id: number;
  suggestedCode: string;
  message: string;
  createdAt: Date;
  snippetId: number;
  userId: number;
  userPseudo?: string;
  userFirstname?: string;
}

export type CommentInputType = {
  suggestedCode: string;
  message: string;
  snippetId: number;
  userId: number;
};
