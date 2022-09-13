import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AuthFormData, User } from "../../ts/interfaces/auth";

const headers = {
  accept: "application/json",
  "Access-Control-Allow-Origin": "http://localhost:3000",
};
axios.defaults.withCredentials = true;

export const register = createAsyncThunk(
  "auth/register",
  async (formData: AuthFormData, { rejectWithValue }) => {
    const url = "api/auth/register/";
    return await axios
      .post(url, formData, {
        headers: headers,
      })
      .then((res) => res.data)
      .catch((err) => {
        // console.log("err", err.response);
        return rejectWithValue(err.response.data);
      });
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (formData: AuthFormData, { rejectWithValue }) => {
    const url = "api/auth/login/";
    return await axios
      .post(url, formData, { headers: headers })
      .then((res) => res.data)
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async ({}, { rejectWithValue }) => {
    return await axios
      .get("/api/auth/fetchUser", {
        headers: headers,
      })
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data));
  }
);
export const updateTokens = createAsyncThunk(
  "auth/updateTokens",
  async ({}, { rejectWithValue }) =>
    await axios
      .post("/api/auth/updateTokens/", {}, { headers })
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data))
);

export const logout = createAsyncThunk(
  "auth/logout",
  async ({}, { rejectWithValue }) => {
    const url = "/api/auth/logout/";
    return await axios
      .post(
        url,
        {},
        {
          headers: headers,
        }
      )
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data));
  }
);
