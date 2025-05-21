import React from 'react'
import UserAxios from '../Axios/UserAxios'
import {  UserManagemenetURL } from '../Utils/Constance';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { addAllUser, RemoveDeleteUser } from '../Redux/UserSlice';

const useUsers = () => {
  
    const dispatch = useDispatch();
    const GetUsers_axios = async ()=> {

        try{
        
            const response = await UserAxios.get(UserManagemenetURL,{
                headers: {
                    'Content-Type': 'application/json',
                },

                
            });
            if (response.status === 200) {
                console.log(response.data, "response get users axios");
                dispatch(addAllUser(response.data))
            }   
        }catch(error){
            console.error(error," getUsers error");
            toast.error("something went wrong, please Login again");
        }

    }

    const DeleteUser_axios = async(value)=>{
        try{
            const response = await UserAxios.delete(UserManagemenetURL,{
                data:value,
                headers: {
                    'Content-Type': 'application/json',
                },
                
            })
            if (response.status === 200) {
                dispatch(RemoveDeleteUser(value.id))
                toast.success("User Deleted Successfully")

          }
        }catch(error){
            console.error(error," getUsers error");
            if(error.response.data){
                toast.error("something went wrong, please try again");
            }
            toast.error("something went wrong, please Login again");
        }
    }

    const EditUser_axios = async(value)=>{
        try{
            const response = await UserAxios.patch(UserManagemenetURL,value,{
                headers: {
                    'Content-Type': 'application/json',
                },
                
            })
            if (response.status === 200) {
                
                toast.success("User Updated Successfully")
                GetUsers_axios()

          }
        }catch(error){
            console.error(error," getUsers error");
            if(error.response.data){
                toast.error("something went wrong, please try again");
            }
            toast.error("something went wrong, please Login again");
        }
    }   
    return {GetUsers_axios,DeleteUser_axios, EditUser_axios}

}

export default useUsers