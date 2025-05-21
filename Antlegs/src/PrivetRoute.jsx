import React from 'react';
import { Navigate } from 'react-router-dom';    
import Cookies from 'js-cookie';

const PrivetRoute = ({ children }) => {

    const token = Cookies.get('Usertoken');
    return token ? children : <Navigate to="/" />;
}

export default PrivetRoute