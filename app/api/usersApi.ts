import axios, { AxiosError } from "axios";

export interface StudentsEnrolments {
  name: string;
  email: string;
  course_code: string;
}

export const getUsersEnrolments = async () => {
  try {
    const result = await axios.get("http://localhost:3100/student");
    if (result.status === 200) {
      return result.data;
    } else {
      throw new Error("An error occurred");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<any>;
      if (axiosError.response?.status === 401) {
        throw new Error(axiosError.response.data.message);
      } else {
        throw new Error("An error occurred while fetching enrolments");
      }
    } else {
      throw new Error("An error occurred while fetching enrolments");
    }
  }
};
