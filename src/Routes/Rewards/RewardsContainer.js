import React, { Component } from "react";
import RewardsPresenter from "./RewardsPresenter";
import * as isLogin from "../../Modules/store/login";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// 이벤트 선언부

class RewardsContainer extends Component {
	componentDidMount() {
		const { islogin, history } = this.props;
		if (!islogin) {
			history.push("/login");
		}
	}
	render() {
		return <RewardsPresenter />;
	}
}

export default connect(
	(state) => ({
		islogin: state.login.get("loginValue"),
	}),
	(dispatch) => ({
		isLogin: bindActionCreators(isLogin, dispatch),
	})
)(RewardsContainer);
