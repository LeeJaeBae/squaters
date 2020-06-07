import React, { Component } from "react";
import CalendarPresenter from "./CalendarPresenter";
import * as isLogin from "Modules/store/login";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// 이벤트 선언부

class CalenderContainer extends Component {
  // 시작 애니메이션
  componentDidMount = () => {
    const calendar = document.querySelectorAll("*");
    setTimeout(() => {
      let i = 0;
      const clear = setInterval(() => {
        calendar[i++].style.opacity = "1";
        if (i === calendar.length) clearInterval(clear);
      }, 10);
    }, 5);
  };
  render() {
    return <CalendarPresenter />;
  }
}

export default connect(
  state => ({
    islogin: state.login.get("loginValue")
  }),
  dispatch => ({
    isLogin: bindActionCreators(isLogin, dispatch)
  })
)(CalenderContainer);
