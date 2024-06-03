"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import CourseList from "../courses/CourseList";
import Image from "next/image";
import CourseImage from "../assets/course.jpg";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
interface Enrolment {
  course_code: string;
  course_name: string;
}

const Page = () => {
  const [enrolments, setEnrolments] = useState<Enrolment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [course_code, setCourseCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [newEnrolment, setNewEnrolment] = useState<Enrolment>({
    course_name: "",
    course_code: "",
  });
  const email = typeof window !== "undefined" ? Cookies.get("email") : null;
  const handleDelEnrolment = async () => {
    const userData = {
      email,
      course_code,
    };
    try {
      const response = await axios.post(
        "http://localhost:3100/enrolments/deleteEnrolment",
        userData
      );
      if (response.status === 200) {
        setEnrolments(
          enrolments.filter(
            (enrolment) => enrolment.course_code !== course_code
          )
        );
        setCourseCode("");
        document.getElementById("delete_course_modal")?.removeAttribute("open");
        toast.success("Enrolment deleted successfully!");
      } else {
        toast.error("Error while deleting enrolment");
      }
    } catch (error: any) {
      toast.error("API error");
    }
  };
  useEffect(() => {
    const handleEnrolment = async () => {
      if (!email) return;

      try {
        setIsLoading(true);
        const response = await axios.post(
          "http://localhost:3100/enrolments/getEnrolment",
          { email }
        );
        if (response.status === 200) {
          setIsLoading(false);
          setEnrolments(response.data);
          setIsLoading(false);
        } else if (response.status === 401) {
          setErrorMessage(response.data.message);
          toast.error(errorMessage);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<any>;

          if (axiosError.response?.status === 401) {
            toast.error(axiosError.response.data.message);
            setIsLoading(false);
          } else {
            toast.error("An error occurred while fetching enrolments");
          }
        } else {
          toast.error("An error occurred while fetching enrolments");
        }
      }
    };

    handleEnrolment();
  }, [email, errorMessage]);

  const fetchCourseDetails = async (course_code: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3100/enrolments/${course_code}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching course details:", error);
      return null;
    }
  };
  const handleEnrolStudent = async () => {
    if (!email) {
      toast.error("Email is not available");
      return;
    }

    const userdata = {
      email,
      course_code,
    };

    try {
      const result = await axios.post(
        "http://localhost:3100/enrolments/addEnrolment",
        userdata
      );
      if (result.status === 201) {
        const courseDetails = await fetchCourseDetails(course_code);
        if (courseDetails) {
          setEnrolments([
            ...enrolments,
            { course_code, course_name: courseDetails.course_name },
          ]);
        } else {
          setEnrolments([...enrolments, { course_code, course_name: "" }]);
        }
        setCourseCode("");
        document.getElementById("add_course_modal")?.removeAttribute("open");
        toast.success("Student enrolled successfully!");
        setNewEnrolment({ course_name: "", course_code: "" });
      } else {
        toast.error("Error while enrolling");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<any>;

        if (axiosError.response?.status === 401) {
          toast.error(axiosError.response.data.message);
          setIsLoading(false);
        } else {
          toast.error("An error occurred while fetching enrolments");
        }
      } else {
        toast.error("An error occurred while fetching enrolments");
      }
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-3xl text-center py-2 font-extrabold my-2">
          AVAILABLE COURSES
        </h1>
        <CourseList />
      </div>
      <h1 className="text-3xl text-center py-2 font-extrabold my-2">
        YOUR ENROLMENTS
      </h1>
      <div className="px-6 pt-4 pb-2 flex justify-center gap-2">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-fit"
          onClick={() =>
            document
              .getElementById("add_course_modal")
              ?.setAttribute("open", "true")
          }
        >
          Add Enrolment
        </button>

        <button
          className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-fit"
          onClick={() =>
            document
              .getElementById("delete_course_modal")
              ?.setAttribute("open", "true")
          }
        >
          Delete Enrolment
        </button>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4 justify-center">
          {enrolments.map((enrolment) => (
            <div
              key={enrolment.course_code}
              className="max-w-sm rounded overflow-hidden shadow-lg m-4"
            >
              <div className="px-6 py-4">
                <div className="flex items-center justify-center">
                  <Image
                    src={CourseImage}
                    alt="course"
                    width={400}
                    height={400}
                  />
                </div>
                <div className="font-bold text-xl mb-2 text-center">
                  {enrolment.course_code}
                </div>
                <p className="text-lg text-gray-700 text-center">
                  {enrolment.course_name}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      <dialog
        id="add_course_modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Enroll Now</h3>
          <div className="py-4">
            <input
              type="text"
              placeholder="Course Code"
              className="input input-bordered w-full mb-4"
              value={course_code}
              onChange={(e) => setCourseCode(e.target.value)}
            />
          </div>
          <div className="modal-action">
            <button className="btn btn-primary" onClick={handleEnrolStudent}>
              Enroll
            </button>
            <button
              className="btn"
              onClick={() =>
                document
                  .getElementById("add_course_modal")
                  ?.removeAttribute("open")
              }
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>

      <dialog
        id="delete_course_modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete Now</h3>
          <div className="py-4">
            <input
              type="text"
              placeholder="Course Code"
              className="input input-bordered w-full mb-4"
              value={course_code}
              onChange={(e) => setCourseCode(e.target.value)}
            />
          </div>
          <div className="modal-action">
            <button className="btn btn-primary" onClick={handleDelEnrolment}>
              Delete
            </button>
            <button
              className="btn"
              onClick={() =>
                document
                  .getElementById("delete_course_modal")
                  ?.removeAttribute("open")
              }
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
      <ToastContainer autoClose={1000} />
    </div>
  );
};

export default Page;
