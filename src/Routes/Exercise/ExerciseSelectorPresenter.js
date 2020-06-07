import React from "react";
import styled from "styled-components";

// 칸의 개수 입력 ->
const obj = new Array(20);
const top = { classI: "fa fa-arrow-circle-up" };

// 안에 객체로 선언하여서 칸에 추가해야할 정보 여기에
// 데이터를 받아와서 정보를 여기다가 초기화 시켜서 해야할듯 ㅠ
for (let i = 0; i < obj.length; i++) {
  obj[i] = {};
  obj[i].num = i + 1;
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  background-color: #3949ab;
  border-radius: 1.5rem;

  /* 스크롤 없이 스크롤 동작 시키기 */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const Emspace = styled.div`
  width: 85%;
  height: 2.5rem;
  margin: 0.2rem auto;
  border-radius: 2rem;

  border: 2px solid #111;
  display: flex;
  align-items: center;
`;

const Top = styled.div`
  width: 2rem;
  height: 2rem;
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  font-size: 2rem;
  line-height: 2rem;
  text-align: center;
  color: #fff;
  cursor: pointer;
  user-select: none;
  &:focus {
    outline: none;
  }
`;

const ExerciseSelectorPresenter = ({ touchTopHandle }) => {
  return (
    <Wrapper>
      {obj.map((element, index) => (
        <Emspace key={index}>{element.num}</Emspace>
      ))}
      <Top className={top.classI} onTouchStart={touchTopHandle} />
    </Wrapper>
  );
};

export default ExerciseSelectorPresenter;
