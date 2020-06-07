import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 400px;
  height: 800px;
  border: 1px solid black;
`;
const Wrapper = ({ contents }) => {
  return <Container>{contents}</Container>;
};

export default Wrapper;
