import { configureStore, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";
import feedReducer from "./feedSlice";
import uiReducer from "./uiSlice"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
    key: "root",
    storage: AsyncStorage
}

const rootReducer = combineReducers({
    feed: feedReducer,
    ui: uiReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"]
        }
    })
})

export default () => {

    let persistor = persistStore(store)

    return { store, persistor }
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch