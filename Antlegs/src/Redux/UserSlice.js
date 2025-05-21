import { createSlice } from "@reduxjs/toolkit";


const UserSlice = createSlice({
    name : "UserData",
    initialState:{
        user_data: null,

    },
    reducers:{
        addUserdata:(state,action)=>{
            state.user_data = action.payload
        }
    }
})

export const {addUserdata} = UserSlice.actions
export default UserSlice.reducer