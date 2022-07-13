import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudents } from "../../api/students";
import { setUsersAction } from "../../store";
import { getStudentsSelector } from "../../store/selectors";
import { StudentsBody } from "../StudentsBody";
import { StudentsHeader } from "../StudentsHeader";

export const Students: React.FC = () => {
  const dispatch = useDispatch();
  const students = useSelector(getStudentsSelector);

  const loadStudentsFromServer = async () => {
    try {
      const studentsFromServer = await getStudents();

      dispatch(setUsersAction(studentsFromServer));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadStudentsFromServer();
  }, []);

  console.log(students);

  return (
    <>
      <StudentsHeader />
      <StudentsBody />
    </>
  );
}