import axios, { AxiosError, AxiosResponse } from "axios";
import { GetServerSidePropsContext, PreviewData } from "next";
import { API_URL } from "../constants";
import { NextApiRequest, NextApiResponse } from "next";
import { setTokenCookies } from "./utils";

const isServer = () => typeof window === "undefined";

type ClientSideContext = {
  req: NextApiRequest;
  res: NextApiResponse;
};

export type HttpContext = GetServerSidePropsContext | ClientSideContext;

let context = <HttpContext>{};

const baseURL = API_URL;

export const httpClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // to send cookies
});

export const setHttpClientContext = (_context: HttpContext) => {
  context = _context;
};

httpClient.interceptors.request.use((config) => {
  const accessToken = context?.req?.cookies?.access;

  console.log({ accessToken });

  if (accessToken) {
    config.headers!.Authorization = `Bearer ${accessToken}`;
  }

  if (isServer() && context?.req?.cookies) {
    // something on the server side with the token?
  }

  return config;
});

httpClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // console.log(response.data)
    if (response.config.url?.includes("token")) {
      const { access, refresh } = response.data;
      context.res = setTokenCookies(context.res, access, refresh);
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

  subscribers.forEach((callback) => callback(access, refresh));
};

const addSubscriber = (callback: (access: string, refresh: string) => any) => {
  subscribers.push(callback);
  console.log("subscribers length", subscribers.length);
};

const refreshToken = async (error: AxiosError) => {
  try {
    let { response } = error;
    const retryOriginalRequest = () => {
      console.log("original request called");
      return new Promise((resolve) => {
        addSubscriber((access: string, refresh: string) => {
          response!.config!.headers!.Authorization = `Bearer ${access}`;
          context.res = setTokenCookies(context.res, access, refresh);
          resolve(axios(response!.config));
        });
      });
    };

    if (!fetchingToken) {
      fetchingToken = true;
      // console.log('cookies',context.req.cookies)
      const { data } = await httpClient.post(`${API_URL}/token/refresh/`, {
        refresh: context?.req?.cookies?.refresh,
      });

      onTokensFetched(data.access, data.refresh);
    }
    return retryOriginalRequest();
  } catch (error:any) {
      console.log('refresh token error', error.response.data)
    return Promise.reject(error);
  } finally {
    fetchingToken = false;
  }
};
