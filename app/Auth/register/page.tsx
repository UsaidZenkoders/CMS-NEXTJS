"use client";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
interface User {
  name: string;
  emial: string;
  password: string;
}
const Page = () => {
  const [displayName, setDisplayName] = useState("Teacher");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [result, setResults] = useState<User[]>([]);

  const handleDisplay = (name: string) => {
    setDisplayName(name);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userData = {
      name,
      email,
      password,
    };

    if (!name || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        throw new Error("Failed to submit data");
      }

      const result = await res.json();
      setResults(result);
      setIsCompleted(true);
      toast.success("Submitted Successfully");
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while submitting");
    }
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
        <p className="text-center font-semibold text-xl animate-fade-in">
          Registering as {displayName}
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            <input
              type="email"
              className="grow"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="input input-bordered flex items-center gap-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
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
            <input
              type="password"
              className="grow"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit" className="btn btn-neutral px-8 text-lg">
            Register
          </button>
        </form>
        <ToastContainer autoClose={1000} />
        <p className="my-1">
          Already have an account?{" "}
          <Link className="text-blue-500 text-center" href="/Auth/login">
            Login here
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Page;
