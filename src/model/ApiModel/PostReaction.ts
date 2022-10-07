export interface PostReaction {
  id: number;
  user_id: number;
  post_id: number;
  react: string;
  share: number;
  created_at: Date;
  updated_at: Date;
}
