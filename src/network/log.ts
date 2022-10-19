import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";


export const requestLog = (config: AxiosRequestConfig) => {
  console.log(`[API]>>> ${config.method}: ${config.url}`);
  if (config.method?.toUpperCase() !== "GET") {
    //console.log("headers ", JSON.stringify(config.headers));
  }
  console.log("data ", JSON.stringify(config.data, null, 2));
  return config;
};

export function requestError(error: AxiosError) {
  console.log(error);
  return Promise.reject(error);
}

export function responseLog(response: AxiosResponse) {
  const config = response.config;
  console.log(`[API]<<< ${response.status} ${config.method}: ${config.url}`);
  // console.log(JSON.stringify(response.data));
  return response;
}

export function responseError(error: AxiosError) {
  console.log(error);
  return Promise.reject(error);
}
