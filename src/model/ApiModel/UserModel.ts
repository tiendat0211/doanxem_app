export default interface UserModel {
  id: number;
  name: string;
  email: string;
  email_verified_at?: any;
  created_at: Date;
  last_login_at?: any;
  last_login_ip?: any;
  avatar: string;
  user_uuid: string;
  type: number;
  status: string;
  role: string;
  status_description: string;
}
