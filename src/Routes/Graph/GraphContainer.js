import React, { Component } from "react";
import GraphPresenter from "./GraphPresenter";
import * as isLogin from "../../Modules/store/login";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// 이벤트 선언부

// import moment from "moment";
// import Chart from "chart.js";

// let today = new Date(); //오늘 날짜 가지고 옴
// var day = [];
// var month = [];
// var number = [];
// var date = [];
// var date2 = [];
// var todaymonth = new Date();
// for (let i = 0; i < 7; i++) {
//     day[i] = moment(today).format("YYYY[-]MM[-]DD");
//     today.setDate(today.getDate() - 1);
// }
// for (let i = 0; i < 7; i++) {
//     month[i] = moment(todaymonth).format("YYYY[-]MM");
//     todaymonth.setMonth(todaymonth.getMonth() - 1);
// }
// month.reverse();

// function dayf() {
//     for (let j = 0; j < 7; j++) {
//         for (let i = 0; i < date2.length; i++) {
//             if (
//                 moment(date2[i]).format("YYYY[-]MM[-]DD") ===
//                 moment(day[j]).format("YYYY[-]MM[-]DD")
//             ) {
//                 comp_data[6 - j] = number[i];
//                 break;
//             } else {
//                 comp_data[6 - j] = 0;
//             }
//         }
//         comp_data2[6 - j] = moment(day[j]).format("MM[-]DD");
//     }
//     data.datasets[0].data = comp_data;
//     data.labels = comp_data2;

//     myBarChart.update();
// }
// function monthf() {
//     var times = [0, 0, 0, 0, 0, 0, 0];
//     for (let j = 0; j < 7; j++) {
//         for (let i = 0; i < date2.length; i++) {
//             if (moment(month[j]).format("YYYY[-]MM") === moment(date2[i]).format("YYYY[-]MM")) {
//                 times[j] += number[i];
//             }
//         }
//         comp_data[j] = times[j];
//         comp_data2[j] = month[j];
//     }

//     data.datasets[0].data = comp_data;
//     data.labels = comp_data2;

//     myBarChart.update();
// }

// //차트 관련
// var data = {
//     labels: ["1", "2", "3", "4", "5", "6", "7"],
//     datasets: [
//         {
//             label: "운동횟수(개)",
//             fill: false,
//             lineTension: 0.1,
//             backgroundColor: "rgba(75,192,192,0,4)",
//             borderColor: "rgba(75,192,192,1)",
//             borderCapStyle: "butt",
//             borderDash: [],
//             borderDashOffset: 0.0,
//             borderJoinStyle: "miter",
//             pointBorderColor: "rgba(75,192,192,1)",
//             pointBackgroundColor: "#fff",
//             pointBorderWidth: 1,
//             pointHoverRadius: 5,
//             pointHoverBackgroundColor: "rgba(75,192,192,1)",
//             pointHoverBorderColor: "rgba(220,220,220,1)",
//             pointHoverBorderWidth: 2,
//             pointRadius: 1,
//             pointHitRadius: 10,
//             data: [0, 0, 0, 0, 0, 0, 0],
//             spanGaps: false,
//         },
//     ],
// };
// var options = {
//     animation: {
//         animateScale: true,
//     },
//     responsive: false,
//     scales: {
//         yAxes: [
//             {
//                 ticks: {
//                     beginAtZero: true,
//                 },
//             },
//         ],
//     },
// };
// var ctx = document.getElementById("myChart").getContext("2d");
// var myBarChart = new Chart(ctx, {
//     type: "line",
//     data: data,
//     options: options,
// });

// var comp_data = data.datasets[0].data;
// var comp_data2 = data.labels;

// window.onload = function () {
//     var oReq = new XMLHttpRequest();

//     oReq.open("POST", "http://localhost:3000");
//     oReq.setRequestHeader("Content-Type", "application/json"); // json 형태로 보냄
//     oReq.send();

//     oReq.addEventListener("load", function () {
//         var result = JSON.parse(oReq.responseText);
//         number = result.number;
//         date = result.date;
//         date2 = [];
//         for (var i = 0; i < date.length; i++) {
//             date2[i] = moment(date[i]).format("YYYY[-]MM[-]DD");
//         }
//         dayf();
//     });
// };

// document.getElementById("day").onclick = function () {
//     dayf();
// };
// document.getElementById("month").onclick = function () {
//     monthf();
// };

class GraphContainer extends Component {
	componentDidMount() {
		const { islogin, history } = this.props;
		if (!islogin) {
			history.push("/login");
		}
	}
	render() {
		return <GraphPresenter />;
	}
}

export default connect(
	(state) => ({
		islogin: state.login.get("loginValue"),
	}),
	(dispatch) => ({
		isLogin: bindActionCreators(isLogin, dispatch),
	})
)(GraphContainer);
