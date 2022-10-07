import UserModel from "./UserModel";
import { PostReaction } from "./PostReaction";
import { CommentModle } from "../CommentModle";

export interface PostModel {
  id: number;
  title: string;
  image: string;
  share: number;
  user_id: number;
  post_uuid: string;
  created_at: Date;
  like: number;
  heart: number;
  wow: number;
  haha: number;
  sad: number;
  angry: number;
  total_reactions: number;
  max_reactions: number;
  most_reaction: MostReaction;
  comments_count: number;
  lastest_comment: any[];
  time: string;
  user_action: string;
  total_interactive: number;
  user: UserModel;
  post_reactions: PostReaction[];
  comments: CommentModle[]
}

export interface MostReaction {
  wow: number;
  sad: number;
  angry: number;
}

