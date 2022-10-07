import apiClient from "./client";
import BaseResponse from "../model/BaseResponse";
import UserModel from "../model/ApiModel/UserModel";
import LoginModel from "../model/ApiModel/LoginModel";
import { PostModel } from "../model/ApiModel/PostModel";
import { TypePostModel } from "../model/ApiModel/TypePostModel";
import { Asset } from "react-native-image-picker";
export const FIRST_PAGE = 1;
import fs from "react-native-fs";
import AppConfig from "../utils/AppConfig";


export function login(email: string, password: string) {
  return apiClient.post<BaseResponse<LoginModel>>("v1/login", {
    email,
    password,
  });
}

export function register(email: string, password: string, name: string, confirm: string) {
  return apiClient.post<BaseResponse<UserModel>>("v1/register", {
    email,
    password,
    name,
    confirm,
  });
}

export function getProfile() {
  return apiClient.get<BaseResponse<UserModel>>("v1/profile");
}

export type PostType =
  | "hot"
  | "new"
  | "top";

export function getListPost(page: number, status: PostType) {
  return apiClient.get<TypePostModel<PostModel[]>>("v1/" + status, {
    params: {
      page,
    },
  });
}

export function getPostDetail(post_uuid: string) {
  return apiClient.get<BaseResponse<PostModel>>("v1/post-detail", {
    params: {
      post_uuid,
    },
  });
}

export type UserPostType =
  | "approved"
  | "pending"
  | "saved";

export function getUserPosts(status: UserPostType) {
  return apiClient.get<BaseResponse<PostModel[]>>("v1/user/" + status + "_posts");
}

export function getBlockList() {
  return apiClient.get<BaseResponse<UserModel[]>>("v1/user/block-list");
}

export function blockUser(user_id: number) {
  return apiClient.post<BaseResponse<UserModel>>("v1/user/block-user", {
    user_id,
  });
}

export function unBlockUser(user_id: number) {
  return apiClient.post<BaseResponse<UserModel>>("v1/user/unblock-user", {
    user_id,
  });
}

export function createPost(token: string, title: string, imageAssets: Asset, ) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  const data = new FormData();

  data.append('image', {
    uri: imageAssets.uri,
    type: imageAssets.type,
    name: imageAssets.fileName
  });
  data.append("title", title);

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: data,
    redirect: 'follow'
  };

  return fetch(AppConfig.baseURL + "v1/posts/store", requestOptions)
}
