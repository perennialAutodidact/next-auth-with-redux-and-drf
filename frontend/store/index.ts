import {
  configureStore,
  createSlice,
  SliceCaseReducers,
  ThunkAction,
} from "@reduxjs/toolkit";
import { Action, combineReducers, Store } from "redux";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import authReducer from "store/authSlice";
export const appSlice = createSlice({
  name: "app",

  initialState: {} as any,

  reducers: {},

  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log("HYDRATE", state, action.payload);
      return {
        ...state,
        ...action.payload.subject,
      };
    },
  },
});

const reducer = combineReducers({
  [appSlice.name]: appSlice.reducer,
  auth: authReducer,
});

const makeStore = () =>
  configureStore({
    reducer: {
      [appSlice.name]: appSlice.reducer,
      auth: authReducer,
    },
    devTools: true,
  });

const store = configureStore({ reducer });

export type AppStore = typeof store;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);
