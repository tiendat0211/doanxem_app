import { AxiosResponse } from "axios";
import BaseResponse from "../model/BaseResponse";

class ApiHelper {
  static isSuccess<T>(res: AxiosResponse<BaseResponse<T>>): boolean {
    if (!res.status) {
      return false;
    }
    return res.status === 200 || res.status === 201;
  }

  static isTokenFail<T>(res: AxiosResponse<BaseResponse<T>>): boolean {
    if (!res.status) {
      return true;
    }
    return res.status === 401 || res.data.status === 401;
  }
  static isSuccessCode<T>(res: BaseResponse<T>): boolean {
    return res.status === 200 || res.status === 201;
  }

  static isSuccessFail<T>(res: BaseResponse<T>): boolean {
    return res.status === 401;
  }

  static isResSuccess<T>(res: AxiosResponse<BaseResponse<T>>): boolean {
    return ApiHelper.isSuccess(res) && ApiHelper.isSuccessCode(res.data);
  }
}

export default ApiHelper;
