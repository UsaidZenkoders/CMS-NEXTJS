'use client'
import React from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

interface UserProfileProps {
  token: string | null;
  role: string | null;
  email: string | null;
  setLogout: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserProfile: React.FC<UserProfileProps> = ({
  token,
  role,
  email,
  setLogout,
}) => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("email");
    Cookies.remove("role");
    setLogout(true); 
    router.push("/Auth/login")
      
  };

  return (
    <>
      {token && role && email && (
        <ul
          tabIndex={0}
          className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
        >
          <li>
            <a className="justify-between">Profile</a>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      )}
      <ToastContainer autoClose={1000} />
    </>
  );
};

export default UserProfile;
