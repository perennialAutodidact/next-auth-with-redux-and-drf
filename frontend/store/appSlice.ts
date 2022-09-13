import { RootState } from "./store"
import { HYDRATE } from "next-redux-wrapper"
import { createSlice, Slice } from "@reduxjs/toolkit"

export const initialState = {} as RootState

export const appSlice: Slice = createSlice({
    name:'app',
    initialState,
    reducers:{},
    extraReducers:{
      [HYDRATE]: (state,action)=> {
        // console.log(state, action.payload)
        return {
          ...state,
          ...action.payload
        }
      }
    }
  })

  export default appSlice.reducer