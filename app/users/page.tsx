'use client'
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getUsersEnrolments } from "../api/usersApi"; // Import API function
import {StudentsEnrolments} from "../api/usersApi"


const Users = () => {
  const [studentsEnrolment, setStudentsEnrolment] = useState<
    StudentsEnrolments[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsersEnrolments();
        setStudentsEnrolment(data);
        setIsLoading(false);
      } catch (error:any) {
        toast.error(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <div className="flex items-center justify-center h-screen">
      <span className="loading loading-bars loading-lg"></span>
    </div>
  ) : studentsEnrolment.length > 0 ? (
    <div>
      <h1 className="text-center pt-8 bg-gray-100 text-3xl font-extrabold">
        Students Enrolments
      </h1>

      <div className="flex items-start justify-center min-h-screen bg-gray-100 p-4 pt-24">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl">
          <table className="table-auto w-full text-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Course Code</th>
              </tr>
            </thead>
            <tbody>
              {studentsEnrolment.map((enrolment) => (
                <tr key={enrolment.course_code} className="bg-base-200">
                  <td className="border px-4 py-2 text-center">
                    {enrolment.name}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {enrolment.email}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {enrolment.course_code}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-start justify-center min-h-screen pt-16">
      <p className="text-lg">No Enrolments to show</p>
    </div>
  );
};

export default Users;
