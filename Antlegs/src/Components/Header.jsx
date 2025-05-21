import React, { useState } from "react";
import profile from "../assets/profile_img.png";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";
import { addUserdata } from "../Redux/UserSlice";

const Header = () => {
  const [toggel, settoggel] = useState(false);
  const user = useSelector((state) => state.userdata.user_data);
  const { username } = user;
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    Cookies.remove('Usertoken')
    dispatch(addUserdata({}))
    navigate('/')

  };

  return (
    <div className="flex  justify-between p-6 bg-gradient-to-l from-blue-400 via-cyan-400 to-cyan-200 h-20 w-full">
      <div className="flex items-center   ">
      </div>
      <div
        className="flex items-center gap-2 pr-6 md:pr-10 cursor-pointer "
        onClick={() => settoggel(!toggel)}
      >
        <img src={profile} alt="" className="h-10 w-10 rounded-full" />
        <span className="text-lg font-semibold text-gray-900">{username}</span>
      </div>
      {toggel && (
        <div
          onClick={handleLogout}
          className="right-0 shadow-xl absolute mt-10 z-10 cursor-pointer"
        >
          <ul className="flex pr-2">
            {" "}
            <li className="bg-white text-left hover:bg-red-500 hover:text-white pr-10 pl-6 py-2 rounded-sm flex items-end  text-black font-semibold space-x-2">
              <ArrowLeftOnRectangleIcon  className="w-5 h-5" />
              <span>Logout</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
