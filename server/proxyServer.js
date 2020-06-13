import express from "express";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import dbRouter from "./Routes/dbRouter";

const app = express();

const PORT = process.env.PORT || "4000";

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "..", "public/")));

// db connection
app.use("/", dbRouter);

app.listen(PORT, () => {
	console.log("app listening on port 4000");
});
