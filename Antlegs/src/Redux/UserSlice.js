import { createSlice } from "@reduxjs/toolkit";


const UserSlice = createSlice({
    name : "UserData",
    initialState:{
        user_data: null,
        all_users_data : null

    },
    reducers:{
        addUserdata:(state,action)=>{
            state.user_data = action.payload
        },
        addAllUser:(state,action)=>{
            state.all_users_data = action.payload
        },
        RemoveDeleteUser:(state,action)=>{
            const id = action.payload
            console.log(id,"id in remove delete user");
            state.all_users_data = state.all_users_data.filter((user) => user._id !== id)
        },
        Logout:(state,action)=>{
            state.user_data = null  
            state.all_users_data = null
        }
    }
})

export const {addUserdata,addAllUser,Logout,RemoveDeleteUser} = UserSlice.actions
export default UserSlice.reducer