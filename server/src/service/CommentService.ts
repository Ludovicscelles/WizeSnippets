import { AppDataSource } from "../data-source";
import { Snippet } from "../entities/Snippet";
import { User } from "../entities/User";
import { Comment } from "../entities/Comment";
import { CommentType, CommentInputType } from "../models/Comment";

const getCommentRepository = () => AppDataSource.getRepository(Comment);
const getUserRepository = () => AppDataSource.getRepository(User);
const getSnippetRepository = () => AppDataSource.getRepository(Snippet);

export class CommentService {
  static async getAll(): Promise<CommentType[]> {
    const comments = await getCommentRepository().find({
      relations: ["user", "snippet"],
    });
    return comments.map(
      ({ id, suggestedCode, message, createdAt, user, snippet }) => ({
        id,
        suggestedCode,
        message,
        createdAt,
        userId: user.id,
        userPseudo: user.pseudo,
        userFirstname: user.firstname,
        snippetId: snippet.id,
      }),
    );
  }

  static async getById(id: number): Promise<CommentType | null> {
    const comment = await getCommentRepository().findOne({
      where: { id },
      relations: ["user", "snippet"],
    });
    if (!comment) return null;
    return {
      id: comment.id,
      suggestedCode: comment.suggestedCode,
      message: comment.message,
      createdAt: comment.createdAt,
      userId: comment.user.id,
      userPseudo: comment.user.pseudo,
      userFirstname: comment.user.firstname,
      snippetId: comment.snippet.id,
    };
  }

  static async create(commentData: CommentInputType): Promise<CommentType> {
    const commentRepository = getCommentRepository();

    const user = await getUserRepository().findOneBy({
      id: commentData.userId,
    });

    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }

    const snippet = await getSnippetRepository().findOneBy({
      id: commentData.snippetId,
    });

    if (!snippet) {
      throw new Error("Snippet non trouvé");
    }

    const comment = commentRepository.create({
      suggestedCode: commentData.suggestedCode,
      message: commentData.message,
      snippet,
      user,
    });

    const savedComment = await commentRepository.save(comment);

    return {
      id: savedComment.id,
      suggestedCode: savedComment.suggestedCode,
      message: savedComment.message,
      createdAt: savedComment.createdAt,
      userId: user.id,
      userPseudo: user.pseudo,
      userFirstname: user.firstname,
      snippetId: snippet.id,
    };
  }
}
