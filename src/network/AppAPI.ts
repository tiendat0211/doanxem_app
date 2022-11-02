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
import { CommentModel } from "../model/ApiModel/CommentModel";
import {PaginateResponse} from "../model/ApiModel/PaginateResponse";
import {ReplyModel} from "../model/ApiModel/ReplyModel";


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
  | "top"
  | "posts";

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

export function postReaction(post_uuid: string, reaction: string) {
  return apiClient.post<BaseResponse<PostModel>>("v1/posts/reaction", {
    post_uuid,
    reaction,
  });
}

export function postComment(post_uuid: string, content: string) {
  return apiClient.post<BaseResponse<CommentModel>>("v1/comments/store", {
    post_uuid,
    content,
  });
}

export function savePost(post_id: number, action: string) {
  return apiClient.post<BaseResponse<any>>("v1/posts/save-post", {
    post_id,
    action,
  });
}

export function getUserProfile(uuid: string) {
  return apiClient.get<BaseResponse<UserModel>>("v1/user", {
    params:{
      uuid,
    }
  });
}

export function changePassword(password: string, newpassword: string, confirm: string) {
  return apiClient.post<BaseResponse<UserModel>>("v1/reset-password", {
    password: password,
    new_password: newpassword,
    confirm_password: confirm,
  });
}

export function getListComment(post_uuid: string) {
  return apiClient.get<BaseResponse<CommentModel[]>>("v1/posts/comments",{
    params:{
      post_uuid,
    }
  });
}

export function updateProfile(avatar?: Asset, name?: string, token?: string,) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  const data = new FormData();

  if (avatar){
    data.append('avatar', {
      uri: avatar.uri,
      type: avatar.type,
      name: avatar.fileName
    });
  }

  if (name){
    data.append("name", name);
  }

  console.log(data);

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: data,
    redirect: 'follow'
  };

  return fetch(AppConfig.baseURL + "v1/user/edit", requestOptions)
}

export function updateName( name: string, token?: string,) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  const data = new FormData();

  if (name){
    data.append("name", name);
  }

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: data,
    redirect: 'follow'
  };

  return fetch(AppConfig.baseURL + "v1/user/edit", requestOptions)
}

export function getListReply(post_uuid: string, comment_id: number) {
  return apiClient.get<BaseResponse<ReplyModel[]>>("v1/posts/replies",{
    params:{
      post_uuid,
      comment_id
    }
  });
}

export function postReply(post_uuid: string, comment_id: number,content: string) {
  return apiClient.post<BaseResponse<ReplyModel>>("v1/replies?post_uuid=" + post_uuid + "&comment_id=" + comment_id, {
    content,
  });
}
