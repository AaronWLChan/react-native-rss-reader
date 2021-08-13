import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import FEEDS from '../data/feeds'
import { FeedlyProvider, Feed, ReadingMode, SortMode } from '../types'
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export interface FeedState {
    feeds: Feed[],
    readingMode: ReadingMode
    sortMode: SortMode,
}

const INITIAL_STATE: FeedState = {

    //Collection of user created feeds
    feeds: [{
        id: uuidv4(),
        title: "My Feed",
        feedProviders: [FEEDS[0]]
    }],
    readingMode: "card",

    sortMode: "desc",

}

//Should be able to subscribe to the same provider in different feeds
const feedSlice = createSlice({
    name: "feedSlice",
    initialState: INITIAL_STATE,
    reducers: {

        changeReadingMode(state, action: PayloadAction<ReadingMode>){
            state.readingMode = action.payload
        },

        addFeed(state, action: PayloadAction<Feed>){
            state.feeds = [...state.feeds, action.payload]
        },

        removeFeed(state, action: PayloadAction<string>){
            state.feeds = state.feeds.filter((f) => f.id !== action.payload)
        },

        updateFeed(state, action: PayloadAction<{ id: string, newName: string }>){

            const { payload } = action

            //Find and replace
            state.feeds = state.feeds.map((f) => {

                if (f.id == payload.id) {
                    f.title = payload.newName
                }

                return f
            })


        },

        changeSortMode(state, action: PayloadAction<SortMode>){
            state.sortMode = action.payload
        },

        updateFeedProviders(state, action: PayloadAction<{ feed: Feed, provider: FeedlyProvider, action: "add" | "remove" }>){

            const { payload } = action

            state.feeds = state.feeds.map((feed) => {

                if (feed.title === payload.feed.title) {

                    if (payload.action === "add") {
                        feed.feedProviders = [...feed.feedProviders, payload.provider]
                    }

                    else {
                        feed.feedProviders = feed.feedProviders.filter((provider) => provider.feedId !== payload.provider.feedId)
                    }

                }

                return feed
            })

        }

    }
})


export const { updateFeedProviders, updateFeed, addFeed, removeFeed, changeReadingMode, changeSortMode } = feedSlice.actions

export default feedSlice.reducer