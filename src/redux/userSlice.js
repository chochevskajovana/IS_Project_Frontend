import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        firstName: "",
        lastName: "",
        username: "",
        email: ""
    },
    reducers: {
        update: (state, action) => {
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.username = action.payload.username;
            state.email = action.payload.email
        },
        remove: (state) => {
            state = {}
        }
    }
})

export const {update, remove}= userSlice.actions;
export default userSlice.reducer;