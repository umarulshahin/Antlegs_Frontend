import axios from "axios";
import React from "react";
import { toast } from "sonner";
import { SigninURL, SignupURL } from "../Utils/Constance";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { addUserdata } from "../Redux/UserSlice";
import useUsers from "./UseUsers";
const useAuth = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { GetUsers_axios } = useUsers()
  const Signin_axios = async (values, setSubmitting) => {

    try {
      const response = await axios.post(SigninURL, values, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {

        const {token,userdata} = response.data;
        
        Cookies.set('Usertoken',JSON.stringify(token),{expires: 7, sameSite:'strict'})

        dispatch(addUserdata(userdata))

        GetUsers_axios()

        navigate("/Dashboard");

        toast.success("Login Successfully");
      }

    } catch (error) {
        console.error(error);

        if (error.response.status === 400 && error.response.data) {

        toast.error(error.response.data.error);

      } else {
        toast.warning("something went wrong, please try again");
      }
    
    setSubmitting(false);
  };
}

  const Signup_axios = async (values, setSubmitting) => {

    try {
      const response = await axios.post(SignupURL, values, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 201) {
        toast.success("Account Created Successfully");
        navigate('/')

      }
    } catch (error) {
      console.error(error);

      if (error.response.status === 400 && error.response.data) {
        toast.error(error.response.data.error);

      } else {
        toast.warning("something went wrong, please try again");
      }
    }

    setSubmitting(false);
  };

  return { Signin_axios, Signup_axios };
};

export default useAuth;
