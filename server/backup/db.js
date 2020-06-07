import mysql from "mysql";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "111111",
  database: "squat"
});

// db connect check
export const handleOpen = () => console.log("✅ Connected to DB");
export const handleError = error =>
  console.log(`❌ Error on DB Connection: ${error}`);

export default db;
