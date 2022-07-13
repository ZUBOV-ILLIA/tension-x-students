import React from "react";
import './BodyMain.scss';

export const BodyMain: React.FC = () => {
  return (
    <main className="body-main">
      <div className="container">
        <div className="body-main__inner">
          <div className="body-main__head-row">
            <h2
              className="body-main__title"
            >
              Students
            </h2>

            <input className="body-main__search" type="text" />

            <a href="#/" className="body-main__export">
              export csv
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}