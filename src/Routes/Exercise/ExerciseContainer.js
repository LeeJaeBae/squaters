/* eslint-disable eqeqeq */
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
		this.tmObj = {};
		this.exerciseStatus = {};
		this.state = {
			checking: { db: false, calendar: false },
			statusExercise: "squat",
			count: 10,
			set: 3,
		};
		this.loop = "";
		this.countReducer = this.countReducer.bind(this);
		this.checkingExercise = this.checkingExercise.bind(this);
		this.toggleExercise = this.toggleExercise.bind(this);
		this.stopTeachable = this.stopTeachable.bind(this);
	}
	// db connecting check & get data to props
	checkingStatus = () => {
		const { isDbOn, level } = this.props;
		const { getUser, getCalendar } = this.props.dbConnect;
		const {
			checking: { db, calendar },
		} = this.state;
		const { push } = this.props.history;
		isDbOn ? console.log("on") : getUser();
		if (level === "") {
			getCalendar();
			push("/");
		}
	};

	componentDidMount = async () => {
		this.checkingStatus();
		if (this.props.level !== 0) return;
		this.tmObj = await this.createTeachable();
		const { model, webcam } = this.tmObj;
		const { predict } = this;
		const canvas = document.getElementById("canvas");
		const { checkingExercise, toggleExercise, countReducer } = this;

		try {
			if (webcam !== undefined) {
				canvas.width = 288;
				canvas.height = 288;
				const ctx = await canvas.getContext("2d");
				await webcam.setup();
				await webcam.play();

				async function loop() {
					if (webcam) {
						await webcam.update();
						const values = await predict(model, webcam, ctx);

						if (values[0].toFixed(2) == 1.0) {
							if (checkingExercise() === "stand") {
								countReducer();
							}
							toggleExercise("squat");
						} else if (values[1].toFixed(2) == 1.0) {
							toggleExercise("stand");
						}
					}
					window.requestAnimationFrame(loop.bind(this));
				}
				this.loop = loop.bind(this);
				// loop.prototype.state = this.state;
				window.requestAnimationFrame(this.loop);
			}
		} catch (error) {}
	};
	componentDidUpdate = (prevProps, prevState) => {
		if (prevState.count !== this.state.count) {
		}
		if (this.state.count === 0) {
			this.setState({ count: 10 });
			this.setState({ set: this.state.set - 1 });
		}
	};

	componentWillUnmount = () => {
		this.stopTeachable(this.tmObj.webcam);
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

	/*
		1. createTeachable
		2. loopTeachable(in componentDidMount)
		3. predictTeachable
	*/

	async createTeachable() {
		let webcam, model;

		const URL = "http://localhost:4000/my_model/";
		model = await tmPose.load(URL + "model", URL + "metadata");
		const size = 288;
		webcam = new tmPose.Webcam(size, size, true);

		let tmObj = { model: model, webcam: webcam };
		return tmObj;
	}

	async predict(model, webcam, ctx) {
		const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
		const prediction = await model.predict(posenetOutput);
		const { probability: squat } = prediction[0];
		const { probability: stand } = prediction[1];
		drawPose(pose, webcam);
		return [squat, stand];

		async function drawPose(pose, webcam) {
			try {
				if (webcam.canvas) {
					ctx.drawImage(webcam.canvas, 0, 0);
				}
				if (pose) {
					const minPartConfidence = 0.5;
					tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
				}
			} catch (e) {
				console.log(e);
				await webcam.stop();
			}
		}
	}
	toggleExercise(string) {
		const { statusExercise } = this.state;
		if (statusExercise === "stand") {
			this.setState({ statusExercise: string });
		} else {
			this.setState({ statusExercise: string });
		}
	}
	checkingExercise() {
		const { statusExercise } = this.state;
		return statusExercise;
	}
	countReducer() {
		const { count } = this.state;
		this.setState({ count: count - 1 });
	}
	async stopTeachable(webcam) {
		try {
			webcam.pause();
			webcam.stop();
		} catch (error) {}
	}

	render() {
		const { level, count, set } = this.props;
		const { increment } = this.props.dbConnect;
		return (
			<>
				<ExercisePresenter
					isLoading={level}
					setNum={this.state.set}
					amount={this.state.count}
					touchTopHandle={this.touchTopHandle}
					createCalendar={this.createCalendar}
					increment={increment}
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
