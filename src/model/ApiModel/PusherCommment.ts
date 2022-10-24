import UserModel from "./UserModel";

export interface PusherCommment {
  user:UserModel,
  data: Comment,
}

interface Comment {
  post_uuid: string;
  content: string;
  comment_id: number;
  reply_id: number;
  created_at: string;
  type: string;
}
