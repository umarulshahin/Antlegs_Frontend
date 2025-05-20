import axios from 'axios'
import React from 'react'
import Signin from '../Pages/Signin'

const UseAuth = () => {

    const Signin_axios = async(values, setSubmitting) => {
        console.log(values,"values signin axios")
        try{
            const response = await axios.post(URL,data,{
                headers:{
                    "Content-Type" : "application/json",
                }
            })

            if(response.status === 200){
                console.log(response.data,"response signin axios")
            }
        }catch(error){
            console.error(error)
        }

        setSubmitting(false)


}

const Signup_axios = async(values, setSubmitting) => {

    console.log(values,"values signup axios")
    
    try{
    const response = await axios.post(URL,data,{
        headers:{
            "Content-Type" : "application/json",
        }

    })
     if(response.status === 200){
        console.log(response.data,"response signup axios")
    }
}catch(error){
    console.error(error)
}

    setSubmitting(false)
}   
   


return {Signin_axios, Signup_axios}
}


export default UseAuth;