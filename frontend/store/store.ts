import {AnyAction, applyMiddleware, combineReducers} from 'redux';
import {HYDRATE, createWrapper} from 'next-redux-wrapper'
import { ThunkMiddleware } from 'redux-thunk';
import { createSlice,Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import authReducer, {
  initialState as initialAuthState
} from "../store/authSlice";

export const initialState = {
  auth: initialAuthState,
};

export const appSlice = createSlice({
  name:'app',
  initialState: {} as RootState,
  reducers:{},
  extraReducers:{
    [HYDRATE]: (state,action)=> {
      console.log(state, action.payload)
      return {
        ...state,
        ...action.payload
      }
    }
  }
})

export const reducer = {
  auth: authReducer,
};

export const makeStore = () => configureStore({
  reducer,
  devTools:true
});

export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  any,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore)
