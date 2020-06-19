import React, { Component } from "react";
import ExercisePresenter from "./ExercisePresenter";
import * as isLogin from "../../Modules/store/login";
import * as dbConnect from "../../Modules/store/dbConnect";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createCalendar } from "../../api/api";
// import * as tf from "@tensorflow/tfjs";
import * as tmPose from "@teachablemachine/pose";

// 이벤트 선언부

class ExerciseContainer extends Component {
	constructor(props) {
		super(props);
		this.webcam = "";
	}
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
	componentDidMount = async () => {
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
	componentWillUnmount = async () => {
		await this.webcam.pause();
		await this.webcam.stop();
		window.requestAnimationFrame(() => {});
		console.log("unmount");
	};
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

	createTeachable = async () => {
		const { increment } = this.props.dbConnect;

		let model;
		let ctx;
		let check = false;

		const URL = "http://localhost:4000/my_model/";
		model = await tmPose.load(URL + "model", URL + "metadata");

		const size = 288;
		this.webcam = new tmPose.Webcam(size, size, true);
		await this.webcam.setup();
		await this.webcam.play();
		window.requestAnimationFrame(loop);
		let webcam = this.webcam;
		const canvas = document.getElementById("canvas");
		canvas.width = size;
		canvas.height = size;
		ctx = canvas.getContext("2d");

		async function loop() {
			webcam.update();
			if (await predict()) {
				return;
			}
			window.requestAnimationFrame(loop);
		}
		async function predict() {
			const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
			const prediction = await model.predict(posenetOutput);
			const { probability: squat } = prediction[0];
			const { probability: stand } = prediction[1];
			// const { score } = pose;
			// try {
			// 	console.log(pose.keypoints[0].position);
			// } catch (e) {
			// 	console.log(e);
			// }
			console.log(pose);
			drawPose(pose, webcam);
			setTimeout(() => {
				if (squat >= 0.94 && check) {
					increment();
					check = false;
					console.log(stand, squat);
				} else if (stand >= 0.9) {
					check = true;
				}
			}, 2000);

			if (await stop()) {
				return true;
			} else {
				return false;
			}
		}

		function drawPose(pose, webcam) {
			if (webcam.canvas) {
				ctx.drawImage(webcam.canvas, 0, 0);
			}
			if (pose) {
				const minPartConfidence = 0.5;
				// tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx, 0.1);
				tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
			}
		}
		async function stop() {
			if (canvas.attributes[1].value === "true") {
				await webcam.pause();
				await webcam.stop();

				return true;
			} else {
				return false;
			}
		}
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
					onCam={this.createTeachable}
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
