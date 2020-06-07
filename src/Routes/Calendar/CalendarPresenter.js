import React from "react";
import styled from "styled-components";
// import PropTypes from "prop-types";
// import { Link } from "react-router-dom";

// class, css 대체할 styled
const calendar = [];

// 캘린더 개수 저장
for (let i = 0; i < 30; i++) {
  calendar[i] = i + 1;
}

const CalendarWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #0c7b93;
  padding: 0.5rem;
  border-radius: 30px;
  opacity: 0;
  transition: all 0.2s ease;
`;
const CalendarTitle = styled.h1`
  width: 100%;
  margin-bottom: 0.5rem;
  text-align: center;
  font-size: 2rem;
  opacity: 0;
  transition: all 0.2s ease;
  color: #fff;
`;
const Calendar = styled.div`
  opacity: 0;
  transition: 0.2s all ease;
  float: left;
  width: 19%;
  height: 50px;
  box-sizing: border-box;
  border: 1px solid #999;
  border-radius: 50%;
  margin-top: 3%;
  margin-right: ${props => {
    if (props.id % 5 !== 0) {
      return "1%";
    }
  }};
  text-align: center;
  line-height: 50px;
  font-size: 14px;
  color: #fff;
  background-color: #00a8cc;
`;

const CalendarPresenter = () => {
  return (
    <>
      <CalendarWrapper className="calendarWrapper">
        <CalendarTitle>Calendar</CalendarTitle>
        {calendar.map(calendar => (
          <Calendar key={calendar} id={calendar} className="calendar">
            {calendar}
          </Calendar>
        ))}
      </CalendarWrapper>
    </>
  );
};

// props의 type설정
CalendarPresenter.propTypes = {};

export default CalendarPresenter;
