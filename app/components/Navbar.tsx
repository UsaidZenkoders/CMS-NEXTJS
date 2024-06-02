"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import UserImage from "../assets/user.png";
import UserProfile from "./UserProfile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [logout, setLogout] = useState(false);

  useEffect(() => {
    const storedToken = Cookies.get("accessToken");
    const storedEmail = Cookies.get("email");
    const storedRole = Cookies.get("role");

    setToken(storedToken ?? null);
    setEmail(storedEmail ?? null);
    setRole(storedRole ?? null);
  }, [token])

  const handleProfileClicked = () => {
    if (!token || !role || !email) {
      toast.info("Register or login first to update your profile");
    } else {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("email");
    Cookies.remove("role");

    setToken(null); // Reset state immediately
    setEmail(null);
    setRole(null);
    setLogout(true); // Trigger useEffect to update state

    setIsDropdownOpen(false); // Close dropdown on logout

    // Redirect to login page
    router.push("/Auth/login");
  };

  return (
    <nav className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 text-black shadow-md mb-8">
      <div className="container mx-auto flex justify-between items-center py-4 px-4 lg:px-8">
        <div className="flex items-center">
          <p className="text-2xl font-bold">CMS</p>
        </div>
        {role === "admin" && (
          <div className="flex gap-6">
            <a
              href="/users"
              className="text-lg font-bold hover:text-gray-600 transition-colors duration-200"
            >
              View Students
            </a>
            <a
              href="/courses"
              className="text-lg font-bold hover:text-gray-600 transition-colors duration-200"
            >
              View Courses
            </a>
          </div>
        )}
        <div className="relative">
          <button
            onClick={handleProfileClicked}
            className="flex items-center focus:outline-none"
          >
            <div className="w-10 h-10 rounded-full border-2 border-gray-600 overflow-hidden">
              <Image alt="User avatar" src={UserImage} width={40} height={40} />
            </div>
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black border rounded-lg shadow-lg z-50">
              <UserProfile
                token={token}
                email={email}
                role={role}
                setLogout={setLogout}
              />
            </div>
          )}
        </div>
      </div>
      <ToastContainer autoClose={1000} />
    </nav>
  );
};

export default Navbar;
