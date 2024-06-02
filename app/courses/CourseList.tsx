import React, { useEffect } from 'react'
import { useCourseContext } from '../Context/CourseContext';
import { toast } from 'react-toastify';

const CourseList = () => {
    const {isLoading,courses,getCourseList,setCurrentCourse}=useCourseContext()

    useEffect(() => {
      
        const redirectTimeout = setTimeout(() => {
          getCourseList();
        }, 2000);
        return () => clearTimeout(redirectTimeout);
      
    }, [getCourseList]);
  return (
    isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : courses.length > 0 ? (
        <table className="mx-auto mt-4 rounded-lg overflow-hidden w-fit mb-6">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 text-xl font-semibold">Course Code</th>
              <th className="py-2 px-4 text-xl font-semibold">Course Name</th>
              <th className="py-2 px-4 text-xl font-semibold">
                Course Description
              </th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr
                key={course.course_code}
                className="bg-gray-100 transition-colors duration-300 hover:bg-gray-200 cursor-pointer"
                onClick={() => {
                  setCurrentCourse(course);
                  toast.info(course.course_code + " selected");
                }}
              >
                <td className="py-2 px-4">{course.course_code}</td>
                <td className="py-2 px-4">{course.course_name}</td>

                <td className="py-2 px-4">
                  {course.description.replace(/\n/g, "")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <p className="text-4xl font-bold">{"NO COURSES TO SHOW"}</p>
        </div>
      )
  )
}

export default CourseList