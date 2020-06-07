import express from "express";
import routes from "../routes";
import {
  dbCreate,
  dbDelete,
  selectExercise,
} from "../Controllers/dbControllers";

const dbRouter = express.Router();

dbRouter.get(routes.dbCreate, dbCreate);
dbRouter.get(routes.dbDelete, dbDelete);
dbRouter.get(routes.calendar, selectExercise);

export default dbRouter;
