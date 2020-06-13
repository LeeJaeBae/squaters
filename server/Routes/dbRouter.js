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

export default dbRouter;
