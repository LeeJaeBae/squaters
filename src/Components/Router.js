import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";

// 각각의 컴포넌트 import
import HomeContainer from "../Routes/Home";
import ExerciseContainer from "../Routes/Exercise";
import GraphContainer from "../Routes/Graph";
import CalendarContainer from "../Routes/Calendar";
import RewardsContainer from "../Routes/Rewards";

const Header = styled.div`
	margin-top: 1rem;
	width: 100%;
	height: 6rem;
	text-align: center;
	position: relative;
	background-color: rgba(0, 0, 0, 0.1);
`;
const Container = styled.div`
	width: 18rem;
	height: 27rem;
	margin: 1.1rem auto;
	position: relative;
	background-color: rgba(0, 0, 0, 0.1);
`;
export default () => (
	<Router>
		<>
			{/* 임시 헤더 끝 */}
			<Header>
				<Link to="/">
					<img alt="" src="/yoga_white.png" width="120px" height="100px" />
				</Link>
			</Header>
			<Container>
				<Switch>
					{/* 홈, 로그인 */}
					<Route path="/" exact component={HomeContainer} />

					{/* 운동 */}
					<Route path="/exercise" component={ExerciseContainer} />

					{/* 기타 */}
					<Route path="/calendar" component={CalendarContainer} />
					<Route path="/rewards" component={RewardsContainer} />
					<Route path="/graph" component={GraphContainer} />
				</Switch>
			</Container>
		</>
	</Router>
);
