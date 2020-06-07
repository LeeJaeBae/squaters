import React, { Component } from "react";
import HomePresenter from "./HomePresenter";
import * as isLogin from "Modules/store/login";
import * as dbConnect from "Modules/store/dbConnect";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// 이벤트 선언부

class HomeContainer extends Component {
    componentDidMount() {
        console.log(this);
        const button = document.getElementsByClassName("button");
        setTimeout(() => {
            button[0].style.top = "1rem";
            button[1].style.left = "0rem";
            button[2].style.left = "9.3rem";
            button[3].style.left = "0rem";
            button[4].style.left = "9.3rem";
            for (let i = 0; i < button.length; i++) {
                button[i].style.opacity = 1;
            }
        }, 10);
    }
    // 터치 이벤트 componenet가 죽은뒤에 애니메이션을 다루기 위하면 이동할때 시간차를 둠
    // ItouchHandle = e => {
    //   const i = document.getElementsByClassName("fa");
    //   if (i[3] === e.target) {
    //     return;
    //   }
    //   const location = window.location;
    //   i[0].style.top = "-1rem";
    //   i[1].style.left = "-2rem";
    //   i[2].style.left = "11.3rem";
    //   i[3].style.left = "-2rem";
    //   i[4].style.left = "11.3rem";
    //   for (let i = 0; i < i.length; i++) {
    //     i[i].style.opacity = 0;
    //   }
    //   if (i[0] === e.target) {
    //     setTimeout(() => (location.href = "/exercise"), setTime);
    //   } else if (i[1] === e.target) {
    //     setTimeout(() => (location.href = "/calender"), setTime);
    //   } else if (i[2] === e.target) {
    //     setTimeout(() => (location.href = "/graph"), setTime);
    //   } else if (i[4] === e.target) {
    //     setTimeout(() => (location.href = "/find"), setTime);
    //   }
    // };
    // touchHandle = e => {
    //   const button = document.getElementsByClassName("button");
    //   if (button[3] === e.target) {
    //     return;
    //   }
    //   const location = window.location;
    //   button[0].style.top = "-1rem";
    //   button[1].style.left = "-2rem";
    //   button[2].style.left = "11.3rem";
    //   button[3].style.left = "-2rem";
    //   button[4].style.left = "11.3rem";
    //   for (let i = 0; i < button.length; i++) {
    //     button[i].style.opacity = 0;
    //   }
    //   if (button[0] === e.target) {
    //     setTimeout(() => (location.href = "/exercise"), setTime);
    //   } else if (button[1] === e.target) {
    //     setTimeout(() => (location.href = "/calender"), setTime);
    //   } else if (button[2] === e.target) {
    //     setTimeout(() => (location.href = "/graph"), setTime);
    //   } else if (button[4] === e.target) {
    //     setTimeout(() => (location.href = "/find"), setTime);
    //   }
    // };

    render() {
        // const { touchHandle, ItouchHandle } = this;
        return (
            <>
                <HomePresenter />
                {this.state}
            </>
        );
    }
}

const mapToDispatch = (dispatch) => ({
    isLogin: bindActionCreators(isLogin, dispatch),
    dbConnect: bindActionCreators(dbConnect, dispatch),
});

export default connect(
    (state) => ({
        username: state.login.get("id"),
        islogin: state.login.get("loginValue"),
        counter: state.dbConnect.get("setNum"),
    }),
    mapToDispatch
)(HomeContainer);
