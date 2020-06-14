import React, { Component } from "react";
import ExercisePresenter from "./ExercisePresenter";
import * as isLogin from "Modules/store/login";
import * as dbConnect from "Modules/store/dbConnect";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import ExerciseSelectorPresenter from "./ExerciseSelectorPresenter";
// 이벤트 선언부

class ExerciseContainer extends Component {
	// 카메라 로딩의 상태 제어
	state = {
		isLoading: false,
	};
	// 시작 애니메이션
	componentDidMount = () => {
		const counter = document.getElementsByClassName("counter");
		this.props.isDbOn
			? setTimeout(() => {
					counter[0].style.top = "0rem";
					counter[0].style.opacity = "1";
			  }, 10)
			: this.props.history.goBack("/");

		// const camera = document.getElementsByClassName("camera");

		//실제로 로딩이 되었을 때 isLoading이 true로 되어야 한다.
		// setTimeout(() => {
		//     this.setState({ isLoading: true });
		// }, 2000);
	};
	touchTopHandle = (e) => {
		// 버튼의 부모 -> 즉 스크롤 기능을 하는 div 참조
		const eParent = e.currentTarget.parentElement;
		eParent.scrollTop = 0;
	};

	render() {
		const { isLoading } = this.state;
		const { setNum, amount } = this.props;

		return (
			<>
				{/* <ExerciseSelectorPresenter touchTopHandle={touchTopHandle} /> */}
				<ExercisePresenter isLoading={isLoading} setNum={setNum} amount={amount} />
			</>
		);
	}
}

export default connect(
	(state) => ({
		user_id: state.dbConnect.get("user_id"),
		isDbOn: state.dbConnect.get("isDbOn"),
	}),
	(dispatch) => ({
		isLogin: bindActionCreators(isLogin, dispatch),
		dbConnect: bindActionCreators(dbConnect, dispatch),
	})
)(ExerciseContainer);
