import express from "express";
import routes from "../routes";
import {
	dbCreate,
	dbDelete,
	exerciseDelete,
	userCreate,
	calendarCreate,
	calendarCreate2,
	calendarInquiry,
	calendarGet,
	exerciseStart,
	exerciseCreate,
	exerciseRecord,
	exerciseGet,
	exerciseSet,
	exerciseDone,
	userExerciseReset,
	chartGet,
	getDB,
	getUser,
} from "../Controllers/dbControllers";
import * as metadata from "./my_model/metadata.json";
import * as model from "./my_model/model.json";

const dbRouter = express.Router();

dbRouter.get(routes.dbCreate, dbCreate);
dbRouter.get(routes.dbDelete, dbDelete);
dbRouter.get(routes.userCreate, userCreate);
dbRouter.get(routes.calendarCreate, calendarCreate);
dbRouter.get(routes.calendarCreate2, calendarCreate2);
dbRouter.get(routes.calendarInquiry, calendarInquiry);
dbRouter.get(routes.calendarGet, calendarGet);
dbRouter.get(routes.exerciseCreate, exerciseCreate);
dbRouter.get(routes.exerciseDelete, exerciseDelete);
dbRouter.get(routes.exerciseStart, exerciseStart);
dbRouter.get(routes.exerciseRecord, exerciseRecord);
dbRouter.get(routes.exerciseGet, exerciseGet);
dbRouter.get(routes.exerciseSet, exerciseSet);
dbRouter.get(routes.exerciseDone, exerciseDone);
dbRouter.get(routes.userExerciseReset, userExerciseReset);
dbRouter.get(routes.chartGet, chartGet);
dbRouter.get(routes.db, getDB);
dbRouter.get(routes.userGet, getUser);
dbRouter.get("/my_model/metadata", (req, res) => {
	res.json(metadata);
});
dbRouter.get("/my_model/model", (req, res) => {
	res.json(model);
});
dbRouter.get("/test/webRTC", (req, res) => {
	res.send(`<!DOCTYPE html>
	<html>
		<head>
			<title> Mitel WebRTC client </title>
			<script src="https://webrtc.github.io/adapter/adapter-latest.js"></script>
			<script src='dist/webrtc.min.js'></script>
	
			<script type="text/javascript">
				function startUp() {
	
					var options = {
						audio: true,
						video: true
					};
					if (getUserMedia) {
						getUserMedia(options)
						.then(function (stream) {
							console.log("Acquired audio and video!");
						})
						.catch(function (err) {
							console.log(err.name + ": " + err.message);
						});
					} else {
						alert("WebRTC not supported on this browser");
					}
				}
			</script>
		</head>
	
		<body onload="startUp();">
			<h1>WebRTC Promise API Client Application</h1>
		</body>
	</html>`);
});
export default dbRouter;
