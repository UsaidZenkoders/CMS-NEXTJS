'use client'
import React from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteCookie } from "cookies-next";

interface UserProfileProps {
  token: string | undefined;
  role: string | undefined;
  email: string | undefined;
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
    
    deleteCookie("accessToken");
    deleteCookie("role");
    deleteCookie("email");

  
    setLogout(true);
    toast.success("Logged out successfuly")
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
            <p className="justify-between">Profile</p>
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
