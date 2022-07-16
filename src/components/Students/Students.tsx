import React from "react";
import { StudentsBody } from "../StudentsBody";
import { StudentsHeader } from "../StudentsHeader";

export const Students: React.FC = () => {
  return (
    <>
      <StudentsHeader />
      <StudentsBody />
    </>
  );
}