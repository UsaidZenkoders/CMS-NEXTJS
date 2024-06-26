'use client';
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

interface Courses {
  course_name: string;
  course_code: string;
  description: string;
}

interface CourseContextType {
  courses: Courses[];
  isLoading: boolean;
  setCourses: React.Dispatch<React.SetStateAction<Courses[]>>;
  currentCourse: Courses | null;
  setCurrentCourse: React.Dispatch<React.SetStateAction<Courses | null>>;
  getCourseList: () => void;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const useCourseContext = (): CourseContextType => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourseContext must be used within a CourseProvider');
  }
  return context;
};

interface CourseProviderProps {
  children: React.ReactNode;
}

export const CourseProvider: React.FC<CourseProviderProps> = ({ children }) => {
  const [courses, setCourses] = useState<Courses[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentCourse, setCurrentCourse] = useState<Courses | null>(null);

  const getCourseList = useCallback(async () => {
  setIsLoading(true)
    try {
      const token = Cookies.get('accessToken');
      if (token) {
        const result = await axios.get('http://localhost:3100/course', {
          headers: {
            Authorization: token,
          },
        });
        setCourses(result.data.result.data);
        setIsLoading(false)
      }
} catch (error: any) {
      toast.error('API Error');
    } 
  }, []);

  useEffect(() => {
    getCourseList();
  }, [getCourseList]);

  return (
    <CourseContext.Provider
      value={{ courses, isLoading, setCourses, currentCourse, setCurrentCourse, getCourseList }}
    >
      {children}
    </CourseContext.Provider>
  );
};
