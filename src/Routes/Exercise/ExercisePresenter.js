import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";

const Counter = styled.div`
    border-radius: 1.3rem;
    width: 16rem;
    height: 5.5rem;
    padding: 1rem;
    background-color: #0dceda;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    transition: 0.4s all ease;
    top: -1rem;
    opacity: 0;
`;
const Count = styled.div`
    width: 5rem;
    height: 7rem;
    border-radius: 0.5rem;
    margin: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: #ebfffa;
`;
const Camera = styled.div`
    width: 18rem;
    height: 20rem;
    background-color: black;
    color: #fff;
    position: absolute;
    transition: 0.5s all ease;
    top: 8rem;
`;
const Text = styled.p`
    font-size: 2rem;
    font-weight: bold;
`;
const Text2 = styled.p`
    font-size: 3rem;
`;
const Load = styled.h3`
    color: #fff;
    font-size: 3rem;
    position: absolute;
    top: 10rem;
    left: 3rem;
`;

const ExercisePresenter = ({ isLoading, setNum, amount }) => {
    return (
        <>
            <Counter className="counter">
                <Count>
                    <ul>
                        <li>
                            <Text>Set</Text>
                        </li>
                        <li>
                            <Text2>{setNum}</Text2>
                        </li>
                    </ul>
                </Count>
                <Count>
                    <ul>
                        <li>
                            <Text>Count</Text>
                        </li>
                        <li>
                            <Text2>{amount}</Text2>
                        </li>
                    </ul>
                </Count>
            </Counter>
            {isLoading ? <Camera className="camera">camera</Camera> : <Load>Loading</Load>}
        </>
    );
};

// props의 type설정
ExercisePresenter.propTypes = {
    isLoading: PropTypes.bool,
    setNum: PropTypes.number,
    amount: PropTypes.number,
};

export default ExercisePresenter;
