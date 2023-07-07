import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { playingEpisodeSlice } from "../features/playingEpisode";
import { searchSlice } from "../features/Search";

const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  seriesEpisodes: playingEpisodeSlice.reducer,
  search: searchSlice.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
