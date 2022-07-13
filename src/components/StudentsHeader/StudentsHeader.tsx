import React from "react";
import { StudentsNav } from "../StudentsNav";
import './StudentsHeader.scss';

export const StudentsHeader: React.FC = () => {
  return (
    <header className="header">
      <div className="container">
        <StudentsNav />
      </div>
    </header>
  );
}