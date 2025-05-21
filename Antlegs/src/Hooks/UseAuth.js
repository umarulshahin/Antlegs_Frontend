import axios from "axios";
import React from "react";
import { toast } from "sonner";
import { SigninURL, SignupURL } from "../Utils/Constance";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { addUserdata } from "../Redux/UserSlice";
const UseAuth = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();
  const Signin_axios = async (values, setSubmitting) => {
    console.log(values, "values signin axios");
    try {
      const response = await axios.post(SigninURL, values, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        console.log(response.data, "response signin axios");
        const {token,userdata} = response.data;
        
        Cookies.set('Usertoken',token,{expires: 7, sameSite:'strict'})
        dispatch(addUserdata(userdata))
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
    console.log(values, "values signup axios");

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

export default UseAuth;
