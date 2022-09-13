import axios, { AxiosError, AxiosResponse } from "axios";
import { GetServerSidePropsContext, PreviewData } from "next";
import { API_URL } from "../constants";
import { NextApiRequest, NextApiResponse } from "next";
import { setTokenCookies } from "./utils";
import cookie from "cookie";
const isServer = () => typeof window === "undefined";

type ClientSideContext = {
  req: NextApiRequest;
  res: NextApiResponse;
};

export type HttpContext = GetServerSidePropsContext | null;

let context: HttpContext = null;

const baseURL = API_URL;

export const httpClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, // to send cookies
});

export const setHttpClientContext = (_context: any) => {
  context = _context;
};

httpClient.interceptors.request.use((config) => {
  console.log("isServer:", isServer());

  let accessToken = "";
  if (isServer() && context?.req?.cookies) {
    const accessToken = context?.req?.cookies?.access;

    console.log("request on server");
  } else {
    console.log("request from client");
  }

  if (accessToken) {
    config.headers!.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

debugger;

httpClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // console.log(response.data)
    if (response.config.url?.includes("token")) {
      const { access, refresh } = response.data;
      // context?.
    }
    return response;
  },
  (error: AxiosError) => {
    if (
      error.response?.status === 401 &&
      !error.response?.config?.url?.includes("token/refresh") &&
      !error.response?.config?.url?.includes("token")
    ) {
      // console.log('url', error.response.config.url)
      return refreshToken(error);
    }

    return Promise.reject(error);
  }
);

let fetchingToken = false;
let subscribers: ((access: string, refresh: string) => any)[] = [];

const onTokensFetched = (access: string, refresh: string) => {
  console.log("refreshed tokens", { access, refresh });
  debugger;
  subscribers.forEach((callback) => callback(access, refresh));
};

const addSubscriber = (callback: (access: string, refresh: string) => any) => {
  subscribers.push(callback);
};

const refreshToken = async (error: AxiosError) => {
  try {
    let { response } = error;

    const retryOriginalRequest = () => {
      return new Promise((resolve) => {
        addSubscriber((access: string, refresh: string) => {
          debugger;
          console.log("original url", response?.config.url);
          response!.config!.headers!.Authorization = `Bearer ${access}`;
          // response!.config!.headers!["Set-Cookie"] = JSON.stringify([
          //   cookie.serialize("access", '', {
          //     httpOnly: true,
          //     secure: process.env.NODE_ENV !== "development",
          //     maxAge: -1,
          //     sameSite: "lax",
          //     path: "/",
          //   }),
          //   cookie.serialize("refresh", '', {
          //     httpOnly: true,
          //     secure: process.env.NODE_ENV !== "development",
          //     maxAge: -1,
          //     sameSite: "lax",
          //     path: "/",
          //   }),
          // ])
          // context.res = setTokenCookies(context.res, access, refresh);
          resolve(axios(response!.config));
        });
      });
    };

    if (!fetchingToken) {
      fetchingToken = true;
      // console.log('cookies',context?.req.cookies)
      const { data } = await httpClient.post(`${API_URL}/token/refresh/`, {
        refresh: context?.req?.cookies?.refresh,
      });

      debugger;
      onTokensFetched(data.access, data.refresh);
    }
    debugger;
    return retryOriginalRequest();
  } catch (error: any) {
    console.log("refresh token error", error.response.data);
    console.log("cookies on error", error.response.cookies);
    return Promise.reject(error);
  } finally {
    fetchingToken = false;
  }
};
