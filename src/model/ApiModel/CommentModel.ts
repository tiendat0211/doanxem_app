import UserModel from "./UserModel";

export interface CommentModel {
  id: number;
  post_id?: number;
  user_id?: number;
  content: string;
  upvote: number;
  downvote: number;
  time?: string;
  total_replies: number;
  type: string;
  user?: UserModel;
}
