import React from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";

const Button = styled.div`
  position: relative;
  left: -135px;
  height: 3rem;
  &:hover {
    /* cursor: pointer; */
  }
`;

const GoBack = ({ goBack }) => {
  return (
    <Button>
      <FontAwesomeIcon
        icon={faLongArrowAltLeft}
        size="4x"
        color="#b9cced"
        onClick={goBack}
      />
    </Button>
  );
};

export default GoBack;
