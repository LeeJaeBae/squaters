/* eslint-disable no-undef */
let URL = "./my_model/";
let model, webcam, ctx, labelContainer, maxPredictions;
var cameraValue = { x: 0, y: 0 };
var value;

export default async function onCam(decrement) {
	let test;
	try {
		await init(decrement);
	} catch (error) {
		console.log(error);
	} finally {
		cameraValue = test;
	}
}
// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/pose

// the link to your model provided by Teachable Machine export panel

async function init(decrement) {
	const modelURL = URL + "model.json";
	const metadataURL = URL + "metadata.json";

	// load the model and metadata
	// Refer to tmImage.loadFromFiles() in the API to support files from a file picker
	// Note: the pose library adds a tmPose object to your window (window.tmPose)
	model = await tmPose.load(modelURL, metadataURL);
	maxPredictions = model.getTotalClasses();

	// Convenience function to setup a webcam
	const sizeX = 288;
	const sizeY = 288;
	const flip = true; // whether to flip the webcam
	webcam = new tmPose.Webcam(sizeX, sizeY, flip); // width, height, flip
	await webcam.setup(); // request access to the webcam
	await webcam.play();
	window.requestAnimationFrame(loop);

	// append/get elements to the DOM
	const canvas = document.getElementById("canvas");
	canvas.width = sizeX;
	canvas.height = sizeY;
	ctx = canvas.getContext("2d");
	labelContainer = { childNodes: [] };
	labelContainer = document.getElementById("label-container");
	labelContainer.style.display = "hidden";
	for (let i = 0; i < maxPredictions; i++) {
		// and class labels
		labelContainer.appendChild(document.createElement("div"));
	}
	async function loop(decrement) {
		webcam.update(); // update the webcam frame
		await predict(decrement);
		window.requestAnimationFrame(loop);
	}
	// 반복되는
	async function predict(decrement) {
		// Prediction #1: run input through posenet
		// estimatePose can take in an image, video or canvas html element
		const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
		// Prediction 2: run input through teachable machine classification model
		const prediction = await model.predict(posenetOutput);

		for (let i = 0; i < maxPredictions; i++) {
			const classPrediction =
				prediction[i].className + ": " + prediction[i].probability.toFixed(2);
			labelContainer.childNodes[i].innerHTML = classPrediction;
			// squat
		}
		let button = { style: "" };
		button = document.getElementById("button");

		if (prediction[0].probability >= 0.9) {
			button.style.backgroundColor = "white";
			// decrement();
			console.log(prediction[0].probability, prediction[1].probability);
		} else {
		}

		let camera = document.getElementById("camera");
		value = button.getBoundingClientRect();
		cameraValue = camera.getBoundingClientRect();

		// finally draw the poses
		drawPose(pose, webcam, button);
	}
}
let status = "red";
function drawPose(pose, webcam, button) {
	if (webcam.canvas) {
		ctx.drawImage(webcam.canvas, 0, 0);
		if (pose !== undefined) {
			if (
				cameraValue.x + pose.keypoints[10].position.x > value.x &&
				cameraValue.x + pose.keypoints[10].position.x < value.x + value.width
			) {
				if (
					cameraValue.y + pose.keypoints[10].position.y > value.y &&
					cameraValue.y + pose.keypoints[10].position.y < value.y + value.height
				) {
					button.style.backgroundColor = status;
				}
			} else {
				if (button.style.backgroundColor === "red") {
					status = "black"; // 중지 메서드
				} else if (button.style.backgroundColor === "black") {
					status = "red"; // 진행 메서드
				}
			}
		}
	}
	// draw the keypoints and skeleton
	if (pose) {
		const minPartConfidence = 0.5;
		tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
		tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
	}
}
