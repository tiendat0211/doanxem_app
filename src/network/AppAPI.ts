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

export function getNewPost(page: number){
  return apiClient.get<TypePostModel<PostModel[]>>("v1/new", {
    params: {
      page
    }
  });
}
