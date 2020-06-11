const mariadb = require("mariadb");

const db = mariadb.createPool({
    host: "localhost",
    user: "root",
    password: "111111",
    database: "squat",
    connectionLimit: 5,
});

db.getConnection()
    .then((conn) => {
        console.log("✅ Connected to DB " + conn.threadId);
        conn.release(); //release to pool
    })
    .catch((err) => {
        console.log("❌ Error on DB Connection: " + err);
    });

export default db;
