import React from "react";
import { BodyHeader } from "../BodyHeader";
import { BodyMain } from "../BodyMain";

export const StudentsBody: React.FC = () => {
  return (
    <body className="body">
      <BodyHeader />
      <BodyMain />
    </body>
  );
}
