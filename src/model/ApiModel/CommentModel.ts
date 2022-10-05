import UserModel from "./UserModel";

export interface CommentModel {
  id: number;
  user_id: number;
  content: string;
  upvote: number;
  downvote: number;
  created_at: Date;
  updated_at: Date;
  commentable_type: string;
  commentable_id: number;
  user: UserModel;
}
