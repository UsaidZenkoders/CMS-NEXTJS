'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCourseContext } from "../Context/CourseContext";
import CourseList from "./CourseList";
import Cookies from "js-cookie";

interface Courses {
  course_name: string;
  course_code: string;
  description: string;
}

const Page = () => {
  const { courses, setCourses, currentCourse, setCurrentCourse } = useCourseContext();
  const [newCourse, setNewCourse] = useState<Courses>({
    course_name: "",
    course_code: "",
    description: "",
  });
  const [token, setToken] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  useEffect(() => {
    const token = Cookies.get("accessToken")
    setToken(token?? null)
  }, []);

  const handleAddCourse = async () => {
    if (!token) {
      toast.error("No access token found");
      return;
    }
    try {
      const result = await axios.post(
        "http://localhost:3100/course",
        newCourse,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setCourses([...courses, newCourse]);
      setIsAddModalOpen(false);
      toast.success("Course added successfully!");
      setNewCourse({ course_name: "", course_code: "", description: "" });
    } catch (error: any) {
      toast.error("API Error");
    }
  };

  const handleUpdateCourse = async () => {
    try {
      if (currentCourse) {
        await axios.put(
          `http://localhost:3100/course/${currentCourse.course_code}`,
          currentCourse,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setCourses(
          courses.map((course) =>
            course.course_code === currentCourse.course_code
              ? currentCourse
              : course
          )
        );
        setIsUpdateModalOpen(false);
        toast.success("Course updated successfully!");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDeleteCourse = async (course_code: string) => {
    if (confirm(`Are you sure you want to delete ${course_code}?`)) {
      try {
        await axios.delete(`http://localhost:3100/course/${course_code}`, {
          headers: {
            Authorization: token,
          },
        });
        setCourses(courses.filter((course) => course.course_code !== course_code));
        toast.success("Course deleted successfully!");
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div>
      <ToastContainer autoClose={1000} />
      <h1 className="text-2xl text-center py-2 font-extrabold mb-6">COURSES LIST</h1>
      <div className="flex justify-center space-x-4 mb-11">
        <button
          className="btn btn-primary"
          onClick={() => setIsAddModalOpen(true)}
        >
          Add Course
        </button>
        <button
          className="btn btn-secondary"
          disabled={courses.length < 1}
          onClick={() => {
            if (currentCourse) {
              setIsUpdateModalOpen(true);
            } else {
              toast.info("Please select a course to update.");
            }
          }}
        >
          Update Course
        </button>
        <button
          className="btn btn-danger"
          disabled={courses.length < 1}
          onClick={() => {
            if (currentCourse) {
              handleDeleteCourse(currentCourse.course_code);
            } else {
              toast.info("Please select a course to delete.");
            }
          }}
        >
          Delete Course
        </button>
      </div>
      <CourseList />
      {isAddModalOpen && (
        <dialog className="modal modal-bottom sm:modal-middle" open>
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add Course</h3>
            <div className="py-4">
              <input
                type="text"
                placeholder="Course Code"
                className="input input-bordered w-full mb-4"
                value={newCourse.course_code}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, course_code: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Course Name"
                className="input input-bordered w-full mb-4"
                value={newCourse.course_name}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, course_name: e.target.value })
                }
              />
              <textarea
                placeholder="Course Description"
                className="textarea textarea-bordered w-full"
                value={newCourse.description}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, description: e.target.value })
                }
              ></textarea>
            </div>
            <div className="modal-action">
              <button className="btn btn-primary" onClick={handleAddCourse}>
                Add
              </button>
              <button
                className="btn"
                onClick={() => setIsAddModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}
      {currentCourse && isUpdateModalOpen && (
        <dialog className="modal modal-bottom sm:modal-middle" open>
          <div className="modal-box">
            <h3 className="font-bold text-lg">Update Course</h3>
            <div className="py-4">
              <input
                type="text"
                placeholder="Course Code"
                className="input input-bordered w-full mb-4"
                value={currentCourse.course_code}
                onChange={(e) =>
                  setCurrentCourse({
                    ...currentCourse,
                    course_code: e.target.value,
                  })
                }
                disabled
              />
              <input
                type="text"
                placeholder="Course Name"
                className="input input-bordered w-full mb-4"
                value={currentCourse.course_name}
                onChange={(e) =>
                  setCurrentCourse({
                    ...currentCourse,
                    course_name: e.target.value,
                  })
                }
              />
              <textarea
                placeholder="Course Description"
                className="textarea textarea-bordered w-full"
                value={currentCourse.description}
                onChange={(e) =>
                  setCurrentCourse({
                    ...currentCourse,
                    description: e.target.value,
                  })
                }
              ></textarea>
            </div>
            <div className="modal-action">
              <button className="btn btn-primary" onClick={handleUpdateCourse}>
                Update
              </button>
              <button
                className="btn"
                onClick={() => setIsUpdateModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default Page;
