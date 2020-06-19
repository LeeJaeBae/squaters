import React, { Component } from "react";
import ExercisePresenter from "./ExercisePresenter";
import * as isLogin from "Modules/store/login";
import * as dbConnect from "Modules/store/dbConnect";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createCalendar } from "../../api/api";
// 이벤트 선언부

class ExerciseContainer extends Component {
	// 카메라 로딩의 상태 제어
	state = {
		checking: { db: false, calendar: false },
	};
	// db connecting check & get data to props
	checkingStatus = () => {
		const { isDbOn, level } = this.props;
		const { getUser, getCalendar } = this.props.dbConnect;
		const {
			checking: { db, calendar },
		} = this.state;
		const { push } = this.props.history;
		isDbOn ? console.log() : getUser();
		if (level === "") {
			getCalendar();
			this.props.history.push("/");
		}
	};
	// 시작 애니메이션
	componentDidMount = () => {
		this.checkingStatus();
		// const counter = document.getElementById("counter");
		// ? document.getElementsByClassName("counter")
		// : undefined;
		// isDbOn
		// 	? counter
		// 		? setTimeout(() => {
		// 				counter[0].style.top = "0rem";
		// 				counter[0].style.opacity = "1";
		// 		  }, 10)
		// 		: console.log(counter)
		// 	: console.log();
		// : this.props.history.goBack("/");
	};
	componentDidUpdate(prevProps) {
		// 전형적인 사용 사례 (props 비교를 잊지 마세요)
		if (this.props.level !== prevProps.level) {
		}
	}
	touchTopHandle = (e) => {
		// 버튼의 부모 -> 즉 스크롤 기능을 하는 div 참조
		const eParent = e.currentTarget.parentElement;
		eParent.scrollTop = 0;
	};

	createCalendar = (level) => {
		createCalendar(level);
		this.props.dbConnect.getCalendar();
		this.props.history.push("/exercise");
	};

	render() {
		const { count, level } = this.props;
		const { increment } = this.props.dbConnect;
		return (
			<>
				<ExercisePresenter
					isLoading={level}
					setNum={count}
					amount={count}
					touchTopHandle={this.touchTopHandle}
					createCalendar={this.createCalendar}
					increment={() => increment()}
				/>
			</>
		);
	}
}

export default connect(
	(state) => ({
		user_id: state.dbConnect.get("user_id"),
		isDbOn: state.dbConnect.get("isDbOn"),
		level: state.dbConnect.get("calendar").level,
		count: state.dbConnect.get("count"),
	}),
	(dispatch) => ({
		isLogin: bindActionCreators(isLogin, dispatch),
		dbConnect: bindActionCreators(dbConnect, dispatch),
	})
)(ExerciseContainer);
