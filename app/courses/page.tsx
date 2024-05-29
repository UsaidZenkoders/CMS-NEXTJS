"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Course {
  course_code: string;
  course_name: string;
  course_description: string;
}

const Page = () => {
  const [results, setResults] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("accessToken");
  console.log(token);
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: token }),
  };
  const getCourses = async () => {
    try {
      const res = await fetch("http://localhost:3100/course/", {
        method: "GET",
        headers,
      });

      if (!res.ok) {
        throw new Error("Failed to submit data");
      }

      const result = await res.json();
      setResults(result.result.data);
      setIsLoading(false);
    } catch (error) {
      toast.error("Error while fetching courses");
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  return !isLoading ? (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Course Code</th>
          <th>Course Name</th>
          <th>Course Description</th>
        </tr>
      </thead>
      <tbody>
        {results.map((course: Course, index: number) => (
          <tr key={index}>
            <td>{course.course_code}</td>
            <td>{course.course_name}</td>
            <td>{course.course_description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <div>Loading...</div>
  );
};

export default Page;
