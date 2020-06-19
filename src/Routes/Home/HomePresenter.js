import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

const boxValue = [
	{
		id: 0,
		color: "#0c7b93",
		top: "-1rem",
		left: 0,
		classI: "fa fa-play",
		route: "/exercise",
	},
	{
		id: 1,
		color: "#00a8cc",
		top: "10rem",
		left: "-2rem",
		classI: "fa fa-calendar",
		route: "/calendar",
	},
	{
		id: 2,
		color: "#00a8cc",
		top: "10rem",
		left: "11.3rem",
		classI: "fa fa-bar-chart",
		route: "/graph",
	},
	{
		id: 3,
		color: "#00a8cc",
		top: "18.5rem",
		left: "-2rem",
		classI: "fa fa-volume-up",
		route: "",
	},
	{
		id: 4,
		color: "#00a8cc",
		top: "18.5rem",
		left: "11.3rem",
		classI: "fa fa-question-circle-o",
		route: "",
	},
];

// 두가지를 지정해서 id에 따라 다른값으로 return 해주는 함수
const returnedIdValue = function (value1, value2, id) {
	if (id === 0) return value1;
	else return value2;
};

const Button = styled.div`
	opacity: 0;
	position: absolute;
	font-size: ${(props) => {
		return returnedIdValue("4rem", "3.3rem", props.id);
	}};
	border-radius: 1.5rem;
	width: ${(props) => {
		return returnedIdValue("18rem", "8.7rem", props.id);
	}};
	height: ${(props) => {
		return returnedIdValue("8.5rem", "8rem", props.id);
	}};
	background-color: ${(props) => props.color};
	margin-right: ${(props) => {
		if (props.id === 1 || props.id === 3) {
			return "0.4rem";
		} else {
			return "0%";
		}
	}};
	top: ${(props) => props.top};
	left: ${(props) => props.left};
	display: flex;
	align-items: center;
	justify-content: center;
	transition: 0.3s all ease;
	color: #fff;
`;
const HomePresenter = ({ touchHandle, ItouchHandle }) => {
	return (
		<>
			{boxValue.map((boxValue) => (
				<Link to={boxValue.route}>
					<Button
						// onClick={touchHandle}
						// onTouchStart={touchHandle}
						className="button"
						key={boxValue.id}
						id={boxValue.id}
						color={boxValue.color}
						top={boxValue.top}
						left={boxValue.left}
					>
						<i
							className={boxValue.classI}
							// aria-hidden="true"
							// onTouchStart={touchHandle}
						></i>
					</Button>
				</Link>
			))}
			<div id="canvas"></div>
		</>
	);
};

// props의 type설정
HomePresenter.propTypes = {
	touchHandle: PropTypes.func,
	ItouchHandle: PropTypes.func,
};

export default HomePresenter;
