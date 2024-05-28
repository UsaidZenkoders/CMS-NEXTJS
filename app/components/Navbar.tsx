'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import UserImage from '../../user.png';
import UserProfile from './UserProfile';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('accessToken');
      setToken(storedToken);
    }
  }, []);

  const handleProfileClicked = () => {
    if (!token) {
      toast.info("Register or login first to update your profile");
    } else {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">COURSE MANAGEMENT SYSTEM</a>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
            onClick={handleProfileClicked}
          >
            <div className="w-10 rounded-full">
              <Image
                alt="Tailwind CSS Navbar component"
                src={UserImage}
                width={30}
                height={30}
              />
            </div>
          </div>
          {isDropdownOpen && <UserProfile token={token} />}
        </div>
      </div>
      <ToastContainer autoClose={1000} />
    </div>
  );
}

export default Navbar;
