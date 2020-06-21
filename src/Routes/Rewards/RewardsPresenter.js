import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
// import PropTypes from "prop-types";
// import { Link } from "react-router-dom";

// class, css 대체할 styled
const Container = styled.div`
	width: 100%;
	height: 100%;
	text-align: center;
	background-color: rgba(255, 255, 255, 0.1);
`;

const Header = styled.div`
	position: relative;
	top: 2rem;
	color: #ffffff;
	font-size: 1.7rem;
	font-family: "Raleway", sans-serif;
`;

const Text = styled.p`
	position: relative;
	color: #ffffff;
	top: 4rem;
	font-size: 1rem;
	font-family: "Raleway", sans-serif;
`;
const Home = styled.p`
	position: relative;
	color: #ffffff;
	bottom: -18rem;
	font-size: 1rem;
	font-family: "Raleway", sans-serif;
`;

const RewardsPresenter = () => {
	return (
		<Container>
			<Header>CONGRATULATIONS!</Header>
			<Text>
				you have done <br /> your squat
			</Text>
			<Link to="/">
				<Home>MAIN</Home>
			</Link>
		</Container>
	);
};

// props의 type설정
RewardsPresenter.propTypes = {};

export default RewardsPresenter;
