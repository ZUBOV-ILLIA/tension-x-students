import React from "react";
import { BodyHeader } from "../BodyHeader";
import { BodyMain } from "../BodyMain";

export const StudentsBody: React.FC = () => {
  return (
    <div className="body">
      <BodyHeader />
      <BodyMain />
    </div>
  );
}
