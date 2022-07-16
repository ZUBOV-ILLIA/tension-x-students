import React from "react";
import './BodyHeader.scss';

export const BodyHeader: React.FC = () => {
  return (
    <header className="body-header">
      <nav className="nav students_nav body__nav">
        <ul className="nav__list">
          <li className="nav__item">
            <a className="nav__link body__link" href="#/">
              <span className="nav__link-content">
                show all
              </span>
              <img src="./images/arrow_down_whiter.png" alt="" />
            </a>
          </li>
          <li className="nav__item">
            <a className="nav__link body__link" href="#/">
              <span className="nav__link-content">
                all grades
              </span>
              <img src="./images/arrow_down_whiter.png" alt="" />
            </a>
          </li>
          <li className="nav__item">
            <a className="nav__link body__link" href="#/">
              <span className="nav__link-content">
                all classes
              </span>
              <img src="./images/arrow_down_whiter.png" alt="" />
            </a>
          </li>
          <li className="nav__item">
            <a className="nav__link body__link" href="#/">
              <span className="nav__link-content">
                av.score
              </span>
              <img src="./images/arrow_down_whiter.png" alt="" />
            </a>
          </li>
          <li className="nav__item">
            <a className="nav__link body__link" href="#/">
              <span className="nav__link-content">
                av.speed
              </span>
              <img src="./images/arrow_down_whiter.png" alt="" />
            </a>
          </li>
          <li className="nav__item">
            <a className="nav__link body__link" href="#/">
              <span className="nav__link-content">
                all classes
              </span>
              <img src="./images/arrow_down_whiter.png" alt="" />
            </a>
          </li>

          <li className="nav__item">
            <a className="nav__link body__link" href="#/">
              <img className="close-btn" src="./images/close_x.png" alt="" />
              <span className="nav__link-content">
                clear all
              </span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}