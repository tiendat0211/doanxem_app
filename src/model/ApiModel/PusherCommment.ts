import UserModel from "./UserModel";

export interface PusherCommment {
  user:UserModel,
  data: Comment,
}

interface Comment {
  post_uuid: string;
  total_comments: number;
  content: string;
  comment_id: number;
  total_replies: number;
  reply_id: number;
  time: string;
  type: string;
}
