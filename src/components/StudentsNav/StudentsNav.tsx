import React from "react";
import './StudentsNav.scss';

export const StudentsNav: React.FC = () => {
  return (
    <nav className="nav students_nav">
      <div className="nav__school">
        <a className="nav__link header__link" href="#/">
          <span className="nav__link-content">School 1</span>
          <img src="./images/arrow_down.png" alt="" />
        </a>
      </div>

      <ul className="nav__list">
        <li className="nav__item">
          <a className="nav__link header__link" href="#/">Analytics</a>
        </li>
        <li className="nav__item">
          <a className="nav__link header__link" href="#/">Gradebooks</a>
        </li>
        <li className="nav__item">
          <a className="nav__link header__link" href="#/">Tests</a>
        </li>
        <li className="nav__item nav__item--active">
          <a className="nav__link header__link header__link--active" href="#/">Students</a>
        </li>
        <li className="nav__item">
          <a className="nav__link header__link" href="#/">Teachers</a>
        </li>
        <li className="nav__item">
          <a className="nav__link header__link" href="#/">Archive</a>
        </li>
      </ul>

      <div className="nav__user">
        <a className="nav__link header__link" href="#/">
          <span className="nav__link-content">
            <img src="./images/user_avatar.png" alt="" />
          </span>
          <img src="./images/arrow_down.png" alt="" />
        </a>
      </div>
    </nav>
  );
}