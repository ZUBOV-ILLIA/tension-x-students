import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { getStudents } from "../../api/students";
import { Student } from "../../react-app-env";
import { addExportUsersAction, removeExportUsersAction, setUsersAction } from "../../store";
import { exportUsersSelector, getCountSelector, getStudentsSelector } from "../../store/selectors";
import './BodyMain.scss';

export const BodyMain: React.FC = () => {
  const dispatch = useDispatch();
  const students: Student[] = useSelector(getStudentsSelector);
  const totalCount = useSelector(getCountSelector);
  const usersToCSV = useSelector(exportUsersSelector);

  const [rows, setRows] = useState(4);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('');

  const [checkboxesList, setCheckboxesList] = useState<number[]>([]);

  const loadStudentsFromServer = async () => {
    try {
      const studentsFromServer = await getStudents(page, rows, query, sortBy);

      dispatch(setUsersAction(studentsFromServer));
    } catch (error) {
      console.log(error);
    }
  }

  const csvReport = {
    filename: 'Students-list.csv',
    headers: [
      { label: 'Full Name', key: 'name' },
      { label: 'Class', key: 'class' },
      { label: 'Score', key: 'score' },
      { label: 'Speed', key: 'speed' },
      { label: 'Parents', key: 'parents' },
      { label: 'ID', key: 'id' },
    ],
    data: usersToCSV,
  }

  useEffect(() => {
    loadStudentsFromServer();
  }, [rows, page, query, sortBy]);

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

            <div
              className="body-main__search-block"
            >
              <input
                className="body-main__search"
                type="text"
                placeholder="Enter Student Name, Parent or ID here"
                value={query}
                onChange={event => {
                  setQuery(event.target.value);
                }}
              />

              <img
                className="body-main__search-image"
                src="images/search.svg"
                alt="search"
              />
            </div>

            <CSVLink
              {...csvReport}
              className="body-main__export-block"
            >
              <img
                className="body-main__upload-image"
                src="images/upload.svg"
                alt="upload"
              />
              <p className="body-main__export">
                export csv
              </p>
            </CSVLink>
          </div>

          <div className="body-main__main-content">
            <div
              className="body-main__header-row"
            >
              <div
                className="
                  body-main__header-row-names
                  body-main__header-row-checkbox">
                <input
                  className="body-main__header-checkbox"
                  type="checkbox"
                />
              </div>
              <div
                className="
                  body-main__header-row-names
                  body-main__header-name"
                onClick={() => {
                  if (sortBy !== '&sortBy=name&sortDir=-1') {
                    setSortBy('&sortBy=name&sortDir=-1');
                  } else {
                    setSortBy('&sortBy=name&sortDir=1');
                  }
                }}
              >
                <span>Name</span>
                <img src="./images/sort_by_name.svg" alt="sort by name" />
              </div>

              <div
                className="
                  body-main__header-row-names
                  body-main__header-id"
                onClick={() => {
                  setSortBy('');
                }}
              >
                <span>ID</span>
                <img src="./images/up-down.svg" alt="sort by name" />
              </div>

              <div
                className="
                  body-main__header-row-names
                  body-main__header-class"
                onClick={() => {
                  if (sortBy !== '&sortBy=class&sortDir=-1') {
                    setSortBy('&sortBy=class&sortDir=-1');
                  } else {
                    setSortBy('&sortBy=class&sortDir=1');
                  }
                }}
              >
                <span>Class</span>
              </div>

              <div
                className="
                  body-main__header-row-names
                  body-main__header-score"
                onClick={() => {
                  if (sortBy !== '&sortBy=score&sortDir=-1') {
                    setSortBy('&sortBy=score&sortDir=-1');
                  } else {
                    setSortBy('&sortBy=score&sortDir=1');
                  }
                }}
              >
                <span>Av.Score,%</span>
                <img src="./images/up-down.svg" alt="sort by name" />
              </div>

              <div
                className="
                  body-main__header-row-names
                  body-main__header-speed"
                onClick={() => {
                  if (sortBy !== '&sortBy=speed&sortDir=-1') {
                    setSortBy('&sortBy=speed&sortDir=-1');
                  } else {
                    setSortBy('&sortBy=speed&sortDir=1');
                  }
                }}
              >
                <span>Av.Speed</span>
                <img src="./images/up-down.svg" alt="sort by name" />
              </div>

              <div
                className="
                  body-main__header-row-names
                  body-main__header-parents"
              >
                <span>Parents</span>
              </div>
            </div>

            {students.map((student: Student) => (
              <React.Fragment key={student.id}>

                <div className="body-main__rows-container">
                  <div
                    className="
                      body-main__header-row-names
                      body-main__header-row-checkbox">
                    <input
                      id={`checkbox-${student.id}`}
                      className="body-main__header-checkbox"
                      type="checkbox"
                      name="student-checkbox"
                      checked={usersToCSV.some(user => user.id === student.id)}
                      onChange={event => {
                        if (event.target.checked && !usersToCSV.some(user => user.id === student.id)) {
                          dispatch(addExportUsersAction(student));
                          setCheckboxesList([...checkboxesList, student.id]);
                        } else {
                          dispatch(removeExportUsersAction(student.id));
                          setCheckboxesList([...checkboxesList.filter(checkbox => checkbox !== student.id)]);
                        }
                      }}
                    />
                  </div>

                  <div
                    className="
                    body-main__header-row
                    body-main__person"
                    onClick={() => {
                      const el = document.getElementById(student.id.toString());
                      const arrow = document.getElementById(`arrow-${student.id}`);

                      if (el && arrow) {
                        if (el.style.height === '0px') {
                          el.style.height = `${252 + 35 * student.tests.length}px`;
                          arrow.style.transform = 'rotateZ(180deg)';
                        } else {
                          el.style.height = '0'
                          arrow.style.transform = 'rotateZ(0)';
                        }
                      }
                    }}
                  >

                    <span
                      className="
                    body-main__row
                    body-main__header-name"
                    >
                      <span>{student.name}</span>
                    </span>

                    <span
                      className="
                    body-main__row
                    body-main__header-id"
                    >
                      <span>{student.id}</span>
                    </span>

                    <span
                      className="
                    body-main__row
                    body-main__header-class"
                    >
                      <span>{student.class}</span>
                    </span>

                    <span
                      className={`
                      body-main__row
                      body-main__header-score
                    ${+student.score.slice(0, -1) < 50 && 'color__color--red'}
                    ${(+student.score.slice(0, -1) >= 50)
                        && (+student.score.slice(0, -1) < 80) && 'color__color--orange'}
                    ${(+student.score.slice(0, -1) >= 80)
                        && (+student.score.slice(0, -1) < 90) && 'color__color--green'}
                    ${+student.score.slice(0, -1) >= 90 && 'color__color--blue'}`}
                    >
                      <span>{student.score}</span>
                    </span>

                    <span
                      className={`
                      body-main__row
                      body-main__header-speed
                      ${student.speed === 'Below Expected' && 'color__color--red'}
                      ${student.speed === 'As Expected' && 'color__color--green'}
                      ${student.speed === 'Above Expected' && 'color__color--blue'}`}
                    >
                      <span>{student.speed}</span>
                    </span>

                    <span
                      className="
                      body-main__row
                      body-main__header-parents"
                    >
                      <div
                        className="body-main__header-parents-container"
                      >
                        <img
                          src="./images/info.svg"
                          alt="info"
                          className="body-main__info-img"
                        />

                        <span>
                          {student.parents.map(parent => (
                            <span
                              key={parent}
                            >
                              {`${parent}${parent !== student
                                .parents[student.parents.length - 1] ? ', ' : ''} `}
                            </span>

                          ))}
                        </span>
                      </div>

                      <img
                        className="body-main__header-arrow"
                        id={`arrow-${student.id}`}
                        src="./images/arrow_down.png" alt="button"
                        style={{
                          transform: 'rotateZ(0)',
                        }}
                      />
                    </span>
                  </div>
                </div>

                <div
                  id={`${student.id}`}
                  className="body-main__details details"
                  style={{
                    height: 0,
                  }}
                >
                  <div className="details__inner">
                    <div className="details__student">
                      <h3 className="details__title">Student</h3>
                      <span className="details__subtitle">{student.name}</span>
                      <h3 className="details__title">id</h3>
                      <span className="details__subtitle">{student.id}</span>
                    </div>

                    <div className="details__selectors-block">
                      <div className="details__selector">
                        <span className="details__selector-name">all concepts</span>
                        <img src="./images/arrow_down.png" alt="button" />
                      </div>
                      <div className="details__selector">
                        <span className="details__selector-name">all score</span>
                        <img src="./images/arrow_down.png" alt="button" />
                      </div>
                      <div className="details__selector">
                        <span className="details__selector-name">all speed</span>
                        <img src="./images/arrow_down.png" alt="button" />
                      </div>

                      <div className="details__calendar">
                        <h4 className="details__calendar-title">
                          Select Period
                        </h4>

                        <img src="./images/calendar.svg" alt="" />
                      </div>

                      <img src="./images/refresh.svg" alt="" />
                    </div>

                    <div className="details__abylitys-row">
                      <div className="details__abylity-row">
                        <p className="details__abylity-text">score</p>

                        <div className="details__abylity-circle color__bgc--blue"></div>
                        <p className="details__abylity-text color__color--blue">90%+ Acuracy</p>

                        <div className="details__abylity-circle color__bgc--green"></div>
                        <p className="details__abylity-text color__color--green">80 - 89% ACCURACY</p>

                        <div className="details__abylity-circle color__bgc--orange"></div>
                        <p className="details__abylity-text color__color--orange">50 - 79% ACCURACY</p>

                        <div className="details__abylity-circle color__bgc--red"></div>
                        <p className="details__abylity-text color__color--red">BELOW 50% ACCURACY</p>
                      </div>

                      <div className="details__abylity-row">
                        <p className="details__abylity-text">speed</p>

                        <div className="details__abylity-circle color__bgc--blue"></div>
                        <p className="details__abylity-text color__color--blue">ABOVE EXPECTED</p>

                        <div className="details__abylity-circle color__bgc--green"></div>
                        <p className="details__abylity-text color__color--green">AS EXPECTED</p>

                        <div className="details__abylity-circle color__bgc--red"></div>
                        <p className="details__abylity-text color__color--red">BELOW EXPECTED</p>
                      </div>
                    </div>

                    <div className="details__more-container">
                      <div className="details__more-row">
                        <p className="details__id">
                          #
                        </p>

                        <p className="details__test">
                          Test Label
                        </p>

                        <p className="details__score">
                          Score
                        </p>

                        <p className="details__speed">
                          Speed
                        </p>

                        <p className="details__total">
                          Total Q-ns
                        </p>

                        <p className="details__exp">
                          Exp. Speed
                        </p>

                        <p className="details__concept">
                          Concept
                        </p>

                        <p className="details__date">
                          Date
                        </p>

                        <p className="details__absent">
                          Absent
                        </p>
                      </div>

                      {student.tests.map((test, index) => (
                        <div
                          key={index}
                          className="
                          details__more-row
                          details__more-user-row"
                        >
                          <p className="details__id">
                            {index + 1}
                          </p>

                          <p className="details__test">
                            Finding Averages {test.label.split(' ')[1]}
                          </p>

                          <p className={`details__score ${!!test.score && 'color__color--blue'}`}>
                            {test.score || 'NIL'}
                          </p>

                          <p className={`details__speed ${!!test.speed && 'color__color--blue'}`}>
                            {test.speed || 'NIL'}
                          </p>

                          <p className="details__total">
                            {test.total}
                          </p>

                          <p className="details__exp">
                            {test.expSpeed}
                          </p>

                          <p className="details__concept">
                            {test.concept}
                          </p>

                          <p className="details__date">
                            {test.date}
                          </p>

                          <div className="details__absent">
                            <input
                              type="checkbox"
                              defaultChecked={test.absent}
                            />
                          </div>
                        </div>
                      ))}

                    </div>

                    <div className="details__average">
                      <p className="details__average-title">
                        Average
                      </p>

                      <p
                        className={`
                        details__average-sore
                        color__color--blue
                        ${+student.score.slice(0, -1) < 50 && 'color__color--red'}
                        ${(+student.score.slice(0, -1) >= 50)
                          && (+student.score.slice(0, -1) < 80) && 'color__color--orange'}
                        ${(+student.score.slice(0, -1) >= 80)
                          && (+student.score.slice(0, -1) < 90) && 'color__color--green'}
                        ${+student.score.slice(0, -1) >= 90 && 'color__color--blue'}`}
                      >
                        {student.score}
                      </p>

                      <p
                        className={`
                        details__average-speed
                        color__color--blue
                        ${student.speed === 'Below Expected' && 'color__color--red'}
                        ${student.speed === 'As Expected' && 'color__color--green'}
                        ${student.speed === 'Above Expected' && 'color__color--blue'}`}
                      >
                        {student.speed}
                      </p>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}


            <div className="body-main__pages">
              <span className="body-main__pages-rows">Rows per page:</span>
              <select
                className="body-main__pages-per"
                name="rows"
                id="rows"
                defaultValue={rows}
                onChange={event => {
                  setRows(+event.target.value);
                  setPage(1);
                }}
              >
                <option value="2">2</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>

              <span className="body-main__pages-items">
                {rows * page - rows + 1}-{rows * page > totalCount
                  ? totalCount : rows * page} of {totalCount}
              </span>

              <div className="btn__left-right">
                <img
                  className="btn__arrow"
                  src="./images/btn-left.svg"
                  alt="btn"
                  onClick={() => {
                    if (page > 1) {
                      setPage(page - 1);
                    }
                  }}
                />
                <img
                  className="btn__arrow"
                  src="./images/btn-right.svg"
                  alt="btn"
                  onClick={() => {
                    if (rows * page < totalCount) {
                      setPage(page + 1);
                    }
                  }}
                />
              </div>

            </div>
          </div>
        </div>
      </div>
    </main >
  );
}