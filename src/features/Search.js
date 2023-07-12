import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
    name: "searching",
    initialState: {
        search: "",
    },
    reducers:{
        setSearch:(state,action)=>{
            state.search = action.payload
        },clearSearch:(state,action)=>{
            state.search= ''
        }
    }
})
export const {setSearch,clearSearch} = searchSlice.actions
export default searchSlice.reducer