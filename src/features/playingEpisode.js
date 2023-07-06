import { createSlice } from "@reduxjs/toolkit";
import { set } from "date-fns";

export const playingEpisodeSlice = createSlice({
    name: "playingEpisode",
    initialState: {
        episodes: [],
        playingEpisode: {
            song: '',
            index:1
        },
        currentEpisode:null,
        // playingEpisodeIndex: 0,
        playedSongs:[]
    },
    reducers:{
        setSeriesEpisodes:(state,action)=>{
            state.episodes = action.payload
        },
        setPlayingEpisode:(state,action)=>{
            state.playingEpisode = action.payload
        },
        setPlayingEpisodeData:(state,action)=>{
            state.currentEpisode = action.payload
        },
        addSong: (state, action) => {
            state?.playedSongs?.push(action.payload);
          },
    }
})
export const {setSeriesEpisodes,setPlayingEpisode,setPlayingEpisodeData,addSong} = playingEpisodeSlice.actions
export default playingEpisodeSlice.reducer