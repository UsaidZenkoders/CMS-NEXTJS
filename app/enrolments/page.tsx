"use client";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import CourseList from "../courses/CourseList";
interface Enrolment {
  course_code: string;
  course_name: string;
}
const Page = () => {
  const email = localStorage?.getItem("email");
  const [enrolments, setEnrolments] = useState<Enrolment[]>([]);
  const [isLoading, setIsloading] = useState(true);
  const [course_code, setCourse_code] = useState("");
  const [newEnrolment, setnewEnrolment] = useState<Enrolment>({
    course_name: "",
    course_code: "",
  });
  useEffect(() => {
    const handleEnrolment = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3100/enrolments/getEnrolment",
          { email }
        );

        if (response.status === 200) {
          setEnrolments(response.data);
          setIsloading(false);
        } else {
          alert("Error while fetching enrolments");
        }
      } catch (error) {
        alert(error);
      }
    };

    handleEnrolment();
  }, []);
  const userdata = {
    email,
    course_code
  };
  const handleEnrolStudent = async () => {
    try {
      const result = await axios.post(
        "http://localhost:3100/enrolments/addEnrolment",
        userdata
      );
      setEnrolments([...enrolments, newEnrolment]);
      document.getElementById("add_course_modal")?.removeAttribute("open");
      toast.success("Student enrolled successfully!");
      setnewEnrolment({ course_name: "", course_code: "" });
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <div>
      <div>
      <h1 className="text-3xl text-center py-2 font-extrabold my-2">
       AVAILABLE COURSES 
      </h1>
      <CourseList/>

      </div>
      <h1 className="text-3xl text-center py-2 font-extrabold my-2">
        YOUR ENROLMENTS
      </h1>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        
        enrolments.map((enrolment) => (
          <div className="flex">

         
          <div className="card w-96 glass flex gap-2">
            <figure>
              <img
                src="https://blog.coursify.me/wp-content/uploads/2018/08/plan-your-online-course.jpg"
                alt="course"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-xl font-extrabold">
                {enrolment.course_code}
              </h2>
              <p className=" text-lg">{enrolment.course_name}</p>
              <div className="card-actions justify-end my-2">
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    document
                      .getElementById("add_course_modal")
                      ?.setAttribute("open", "true")
                  }
                >
                  Enroll in new course
                </button>
              </div>
            </div>
          </div>
          </div>
        ))
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
              onChange={(e) =>
                setCourse_code(e.target.value)
              }
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
    </div>
  );
};

export default Page;
