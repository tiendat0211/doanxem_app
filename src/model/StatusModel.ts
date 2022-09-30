export interface StatusModel {
  post_id: number,
  user : User,
  time: string,
  status_content: string,
  status_img: any,
  comment_counts: string,
  reaction_counts: string,
}

export interface User {
  id : number,
  name :string;
  avatar : any;
}
