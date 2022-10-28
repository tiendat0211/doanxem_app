import UserModel from "./UserModel";

export interface ReplyModel{
  id: number;
  user_id?: number;
  post_id?: number;
  comment_id: number;
  type: string;
  content: string;
  upvote?: number;
  downvote?: number;
  time: string;
  user?: UserModel;
}
