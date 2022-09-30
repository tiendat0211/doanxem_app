import UserModel from "./UserModel";

export interface PostModel {
  id: number;
  title: string;
  image: string;
  share: number;
  user_id: number;
  post_uuid: string;
  created_at: string;
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
  total_interactive: number;
  user: UserModel;
}

export interface MostReaction {
  wow: number;
  sad: number;
  angry: number;
}

export interface UserPost {
  id: number;
  avatar: string;
  name: string;
}
