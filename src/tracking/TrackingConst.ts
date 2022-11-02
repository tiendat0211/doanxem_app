export default interface TrackingConstants {
  view_profile_user: "view_profile_user",
  view_post: "view_post",
  save_post:'save_post',
  un_save_post:'un_save_post',
  reaction_post: 'reaction_post',
  comment_post: 'comment_post'

  // time duration
  view_profile_user_time: "view_profile_user_time",
  view_post_time: "view_post_time",
  use_app_time: "use_app_time",
}

export interface TrackingObject {
  post_id: string,
  user_id: string,
  duration_millisecond: number,
  isValid: boolean,
  url: string,
}

