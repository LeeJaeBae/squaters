import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import ExerciseSelectorPresenter from "./ExerciseSelectorPresenter";
// import { Link } from "react-router-dom";
// import onCam from "./teach";

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

const Button = styled.div`
	width: 80px;
	height: 40px;
	position: relative;
	top: 5px;
	left: 5px;
	background-color: #555;
	color: #fff;
	line-height: 40px;
	text-align: center;
	border-radius: 20px;
	z-index: 2000;
`;

const ExercisePresenter = ({
	isLoading,
	setNum,
	amount,
	touchTopHandle,
	createCalendar,
	increment,
	onCam,
}) => {
	return isLoading === 0 ? (
		<>
			<Counter id="counter">
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
				<button onClick={increment}></button>
			</Counter>
			{isLoading === 0 ? (
				<Camera
					id="camera"
					onLoad={(function () {
						try {
							onCam();
						} catch (error) {}
					})()}
				>
					<Button
						id="button"
						onClick={() => {
							let canvas = document.getElementById("canvas");
							if (canvas.attributes[1].value === "false") {
								canvas.attributes[1].value = "true";
								console.log(canvas.attributes[1].value);
							} else {
								canvas.attributes[1].value = "false";
								try {
									onCam();
								} catch (error) {}
							}
						}}
					>
						button
					</Button>
					<canvas id="canvas" attr="false"></canvas>
				</Camera>
			) : (
				<Load>Loading</Load>
			)}
			<div id="label-container" />
		</>
	) : (
		<ExerciseSelectorPresenter
			touchTopHandle={touchTopHandle}
			createCalendar={createCalendar}
		/>
	);
};

// Camera className => id 속성으로 수정
// div id = "label-container" 추가
// Counter className => id 속성으로 수정

// props의 type설정
ExercisePresenter.propTypes = {
	isLoading: PropTypes.number,
	setNum: PropTypes.number,
	amount: PropTypes.number,
};

export default ExercisePresenter;
