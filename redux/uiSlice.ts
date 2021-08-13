import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import 'react-native-get-random-values';
import ROUTES from "../navigation/routes";

export interface UiState {
    activeDrawerLink: string,
    darkMode: boolean
}

const INITIAL_STATE: UiState = {
    activeDrawerLink: ROUTES.HOME,
    darkMode: false,
}

//Should be able to subscribe to the same provider in different feeds
const uiSlice = createSlice({
    name: "uiSlice",
    initialState: INITIAL_STATE,
    reducers: {

        toggleDarkMode(state){
            state.darkMode = !state.darkMode
        },

        setActiveDrawerLink(state, action: PayloadAction<string>){
            state.activeDrawerLink = action.payload
        },      

    }
})


export const { toggleDarkMode, setActiveDrawerLink } = uiSlice.actions

export default uiSlice.reducer