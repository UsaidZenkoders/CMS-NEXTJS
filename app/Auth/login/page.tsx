"use client";
import Link from "next/link";
import React, { useState } from "react";

const page = () => {
  const [displayName, setDisplayName] = useState("");
  const [showPara, setShowPara] = useState(false);

  const handleDisplay = (name: string) => {
    setDisplayName(name);
    setShowPara(true);
  };
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col gap-4 p-10 bg-white shadow-2xl rounded-lg">
        <div className="flex justify-between py-4">
          <button
            className="btn btn-neutral px-8 text-lg"
            onClick={() => handleDisplay("Teacher")}
          >
            Teacher
          </button>
          <button
            className="btn px-8 btn-neutral text-lg"
            onClick={() => handleDisplay("Student")}
          >
            Student
          </button>
        </div>
        {showPara && (
          <p className="text-center font-semibold text-xl animate-fade-in ">
            Registering as {displayName}
          </p>
        )}
        <label className="input input-bordered flex items-center gap-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input type="text" className="grow" placeholder="Email" />
        </label>
        <label className="input input-bordered flex items-center gap-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input type="password" className="grow" placeholder="Password" />
        </label>
        <button className="btn btn-neutral px-8 text-lg">Login</button>
        <p className="my-1">
          Dont have an account?{" "}
          <Link className="text-blue-500 text-center " href="/Auth/register">
            Register here
          </Link>
        </p>
      </div>
    </main>
  );
};

export default page;
