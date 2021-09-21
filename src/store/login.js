import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    email: "",
    score: "",
    min: 7,
    sec: 0,
}

const loginStoreSlice = createSlice({
    name: "loginStore",
    initialState: initialState,
    reducers: {
        "actionLogin": (state, action) => {
            return {
                ...state,
                email: action.payload.email
            }
        },
        "actionLogout": () => {
            return initialState
        },
        "actionTime": (state, action) => {
            return {
                ...state,
                min: action.payload.min,
                sec: action.payload.sec
            }
        }
    }

})

export const { actionLogin, actionLogout ,actionTime} = loginStoreSlice.actions;
export const loginStore = loginStoreSlice.reducer;