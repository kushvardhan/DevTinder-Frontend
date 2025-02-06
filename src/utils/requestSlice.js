import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "request",
    initialState: null, // Change initialState from null to an empty array
    reducers: {
        addRequest: (state, action) => {
            return action.payload;
        },
        removeRequest: (state,action) => {
            const newArr = state.filter(r=>r.id !== action.payload);
            return newArr;
        }
    }
});

export const { addRequest, removeRequest } = requestSlice.actions;

export default requestSlice.reducer;
