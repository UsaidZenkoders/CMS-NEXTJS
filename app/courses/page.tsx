'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Courses {
  course_name: string;
  course_code: string;
  course_description: string;
}

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState<Courses[]>([]);
  const [currentCourse, setCurrentCourse] = useState<Courses | null>(null);
  const [newCourse, setNewCourse] = useState<Courses>({ course_name: '', course_code: '', course_description: '' });
  const token = localStorage?.getItem('accessToken');

  useEffect(() => {
    const getCourseList = async () => {
      try {
        const result = await axios.get('http://localhost:3100/course', {
          headers: {
            Authorization: token
          }
        });
        console.log(result.data);
        setCourses(result.data);
        setIsLoading(false);
      } catch (error: any) {
        toast.error(error.message);
      }
    };
    getCourseList();
  }, [token]);

  const handleAddCourse = async () => {
    try {
      const result = await axios.post('http://localhost:3100/course', newCourse, {
        headers: {
          Authorization: token
        }
      });
      setCourses([...courses, result.data]);
      document.getElementById('add_course_modal')?.removeAttribute('open'); // Close the modal
      toast.success('Course added successfully!');
      setNewCourse({ course_name: '', course_code: '', course_description: '' });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleUpdateCourse = async () => {
    try {
      if (currentCourse) {
        await axios.put(`http://localhost:3100/course/${currentCourse.course_code}`, currentCourse, {
          headers: {
            Authorization: token
          }
        });
        setCourses(courses.map(course => (course.course_code === currentCourse.course_code ? currentCourse : course)));
        document.getElementById('update_course_modal')?.removeAttribute('open'); // Close the modal
        toast.success('Course updated successfully!');
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDeleteCourse = async (course_code: string) => {
    if (confirm('Are you sure you want to delete this course?')) {
      try {
        await axios.delete(`http://localhost:3100/course/${course_code}`, {
          headers: {
            Authorization: token
          }
        });
        setCourses(courses.filter(course => course.course_code !== course_code));
        toast.success('Course deleted successfully!');
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div>
      <ToastContainer autoClose={1000} />
      <h1 className="text-2xl text-center py-2 font-extrabold">COURSES LIST</h1>
      <div className="flex justify-center space-x-4">
        <button className="btn btn-primary" onClick={() => document.getElementById('add_course_modal')?.setAttribute('open', 'true')}>Add Course</button>
        <button className="btn btn-secondary" onClick={() => {
          if (currentCourse) {
            document.getElementById('update_course_modal')?.setAttribute('open', 'true');
          } else {
            toast.info('Please select a course to update.');
          }
        }}>Update Course</button>
        <button className="btn btn-danger" onClick={() => {
          if (currentCourse) {
            handleDeleteCourse(currentCourse.course_code);
          } else {
            toast.info('Please select a course to delete.');
          }
        }}>Delete Course</button>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : courses.length > 0 ? (
        <table className="mx-auto mt-4 rounded-lg overflow-hidden w-1/3">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 text-xl font-semibold">Course Code</th>
              <th className="py-2 px-4 text-xl font-semibold">Course Name</th>
              <th className="py-2 px-4 text-xl font-semibold">Course Description</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr
                key={course.course_code}
                className="bg-gray-100 transition-colors duration-300 hover:bg-gray-200"
                onClick={() => setCurrentCourse(course)}
              >
                <td className="py-2 px-4">{course.course_code}</td>
                <td className="py-2 px-4">{course.course_name}</td>
                <td className="py-2 px-4">{course.course_description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <p className="text-4xl font-bold text-red-500">{"PROBLEM"}</p>
        </div>
      )}
      {/* Add Course Modal */}
      <dialog id="add_course_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add Course</h3>
          <div className="py-4">
            <input
              type="text"
              placeholder="Course Code"
              className="input input-bordered w-full mb-4"
              value={newCourse.course_code}
              onChange={(e) => setNewCourse({ ...newCourse, course_code: e.target.value })}
            />
            <input
              type="text"
              placeholder="Course Name"
              className="input input-bordered w-full mb-4"
              value={newCourse.course_name}
              onChange={(e) => setNewCourse({ ...newCourse, course_name: e.target.value })}
            />
            <textarea
              placeholder="Course Description"
              className="textarea textarea-bordered w-full"
              value={newCourse.course_description}
              onChange={(e) => setNewCourse({ ...newCourse, course_description: e.target.value })}
            ></textarea>
          </div>
          <div className="modal-action">
            <button className="btn btn-primary" onClick={handleAddCourse}>Add</button>
            <button className="btn" onClick={() => document.getElementById('add_course_modal')?.removeAttribute('open')}>Cancel</button>
          </div>
        </div>
      </dialog>
      {/* Update Course Modal */}
      {currentCourse && (
        <dialog id="update_course_modal" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Update Course</h3>
            <div className="py-4">
              <input
                type="text"
                placeholder="Course Code"
                className="input input-bordered w-full mb-4"
                value={currentCourse.course_code}
                onChange={(e) => setCurrentCourse({ ...currentCourse, course_code: e.target.value })}
                disabled
              />
              <input
                type="text"
                placeholder="Course Name"
                className="input input-bordered w-full mb-4"
                value={currentCourse.course_name}
                onChange={(e) => setCurrentCourse({ ...currentCourse, course_name: e.target.value })}
              />
              <textarea
                placeholder="Course Description"
                className="textarea textarea-bordered w-full"
                value={currentCourse.course_description}
                onChange={(e) => setCurrentCourse({ ...currentCourse, course_description: e.target.value })}
              ></textarea>
            </div>
            <div className="modal-action">
              <button className="btn btn-primary" onClick={handleUpdateCourse}>Update</button>
              <button className="btn" onClick={() => document.getElementById('update_course_modal')?.removeAttribute('open')}>Cancel</button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default Page;
