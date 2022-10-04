import UserModel from "./UserModel";

export default interface LoginModel {
  user: UserModel,
  token: string,
}
