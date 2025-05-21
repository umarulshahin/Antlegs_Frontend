import React from 'react';
import { Navigate } from 'react-router-dom';    
import Cookies from 'js-cookie';

const AuthPrivetRoute = ({ children }) => {

    const token = Cookies.get('Usertoken');
    return !token ? children : <Navigate to="Dashboard/" />;
}

export default AuthPrivetRoute