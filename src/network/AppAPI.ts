import apiClient from "./client";
import BaseResponse from "../model/BaseResponse";
import UserModel from "../model/ApiModel/UserModel";
import LoginModel from "../model/ApiModel/LoginModel";
import { PostModel } from "../model/ApiModel/PostModel";
import { TypePostModel } from "../model/ApiModel/TypePostModel";

export const FIRST_PAGE = 1

export function login(email: string, password: string) {
  return apiClient.post<BaseResponse<LoginModel>>("v1/login", {
    email,
    password
  })
}

export function register(email: string, password:string, name: string, confirm: string){
  return apiClient.post<BaseResponse<UserModel>>("v1/register", {
    email,
    password,
    name,
    confirm,
  })
}

export function getProfile(){
  return apiClient.get<BaseResponse<UserModel>>("v1/profile");
}

export type PostType =
  | "hot"
  | "new"
  | "top";

export function getListPost(page: number, status: PostType){
  return apiClient.get<TypePostModel<PostModel[]>>("v1/" + status, {
    params: {
      page
    }
  });
}

export function getPostDetail(post_uuid: string){
  return apiClient.get<BaseResponse<PostModel>>("v1/post-detail", {
    params: {
      post_uuid
    }
  });
}

export type UserPostType =
  | "approved"
  | "pending"
  | "saved";

export function getUserPosts(status: UserPostType){
  return apiClient.get<BaseResponse<PostModel[]>>("v1/user/" + status + "_posts");
}

export function getBlockList(){
  return apiClient.get<BaseResponse<UserModel[]>>("v1/user/block-list");
}

export function blockUser( user_id: number){
  return apiClient.post<BaseResponse<UserModel>>("v1/user/block-user",{
    user_id
  });
}

export function unBlockUser( user_id: number){
  return apiClient.post<BaseResponse<UserModel>>("v1/user/unblock-user",{
    user_id
  });
}
