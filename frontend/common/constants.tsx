export const API_URL =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_URL_DEVELOPMENT
    : process.env.NEXT_PUBLIC_API_URL_PRODUCTION;

export const ACCESS_TOKEN_LIFETIME = 60 * 30 * 1000;
export const REFRESH_TOKEN_LIFETIME = 60 * 60 * 24 * 1000;
