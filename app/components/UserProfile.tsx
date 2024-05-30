import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast,ToastContainer } from "react-toastify";
interface UserProfileProps {
  token: string | null;
}

const UserProfile: React.FC<UserProfileProps> = ({ token }) => {
  
  const [logout,setLogout]=useState(false)
  const router=useRouter()
  const handleLogout = () => {
    localStorage.setItem("accessToken", "");
    router.push("/Auth/login")
    setLogout(true)
    toast.info("logged out successfully")

  };
  return (
    <>
      {token && !logout && (
        <ul
          tabIndex={0}
          className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
        >
          <li>
            <a className="justify-between">Profile</a>
          </li>
          <li>
            <button  onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      )}
              <ToastContainer autoClose={1000}/>

    </>
  );
};

export default UserProfile;
