import db from "../db";

var user_no = 1;

var countCalling = 0;

export const dbCreate = (req, res) => {
	console.log(++countCalling);
	const createSql = {
		user: `user_no          INT               NOT NULL     AUTO_INCREMENT,
           user_id               VARCHAR(20)    NOT NULL,
           user_pw               VARCHAR(20)    NOT NULL,
           user_name            VARCHAR(20)    NOT NULL,
           user_phone           CHAR(11)        NOT NULL,
           UNIQUE (user_id, user_phone),
           PRIMARY KEY (user_no)`,
		calendar: `calendar_no        INT            NOT NULL    AUTO_INCREMENT,
           calendar_id          INT(2)          NOT NULL,
           calendar_succeeded   TINYINT(1)      default FALSE,
           user_no              INT             NOT NULL,
           PRIMARY KEY (calendar_no),
           FOREIGN KEY (user_no) REFERENCES user (user_no) ON DELETE CASCADE`,
		user_status: `user_no             INT             NOT NULL,
           user_level           INT(3)          default NULL,
           calendar_no          INT             default NULL,
           last_exercise_data   INT(2)          default NULL,
           last_date            DATE            default NULL,
           PRIMARY KEY (user_no),
           FOREIGN KEY (user_no) REFERENCES user (user_no) ON DELETE CASCADE,
           FOREIGN KEY (calendar_no) REFERENCES calendar (calendar_no) ON DELETE CASCADE`,
		exercise: `exercise_no         INT             NOT NULL    AUTO_INCREMENT,
           calendar_no          INT             NOT NULL,
           exercise_data        INT(3)          NOT NULL,
           exercise_type        TINYINT(1)      default FALSE,
           exercise_success   TINYINT(1)      default FALSE,
           PRIMARY KEY (exercise_no),
           FOREIGN KEY (calendar_no) REFERENCES calendar (calendar_no) ON DELETE CASCADE`,
		chart: `chart_no            INT             NOT NULL    AUTO_INCREMENT,
           chart_date           DATE            NOT NULL,
           chart_laps           INT             NOT NULL,
           user_no              INT             NOT NULL,
           PRIMARY KEY (chart_no),
           FOREIGN KEY (user_no) REFERENCES user (user_no) ON DELETE CASCADE`,
	};

	let dbType = `engine=InnoDB`;

	(async function () {
		for (let tableName in createSql) {
			await db.query(`CREATE TABLE ${tableName}(${createSql[tableName]})${dbType}`).then(
				(result) => {
					console.log(`${tableName} Table created`);
				},
				(err) => {
					res.end();
					console.log(err);
				}
			);
		}
		return (() => {
			res.end();
		})();
	})();
};

export const dbDelete = (req, res) => {
	console.log(++countCalling);
	const allTable = ["chart", "exercise", "user_status", "calendar", "user"];

	(async function () {
		for (let value of allTable) {
			await db.query(`DROP TABLE ${value}`).then(
				(result) => {
					console.log(`${value} Table deleted`);
				},
				(err) => {
					console.log(err);
				}
			);
		}
		return (() => {
			res.end();
		})();
	})();
};

export const getUser = (req, res) => {
	console.log(++countCalling);
	console.log("--------------------------------------");
	console.log("getUser");
	console.log("--------------------------------------");
	db.query(`SELECT * FROM user WHERE user_id=1`).then((row) => {
		res.json({ data: row[0] });
	});
};

export const userCreate = (req, res) => {
	console.log(++countCalling);
	console.log("--------------------------------------");
	console.log("userCrea†e");
	console.log("--------------------------------------");
	const user_id = req.query.user_id;
	db.query("SELECT * FROM user WHERE user_id=?", [user_id])
		.then((row) => {
			if (typeof row[0] === "undefined") {
				db.query(
					"INSERT INTO user (user_id, user_name, user_pw, user_phone) VALUES (?, ?, ?, ?)",
					[user_id, "test", "1234", "01012341234"]
				)
					.then(() => {
						db.query("INSERT INTO calendar (user_no, calendar_id) VALUES (?, ?)", [
							user_no,
							0,
						]);
					})
					.then(() => {
						db.query("INSERT INTO user_status (user_no) VALUES (?)", [user_no]).then(
							console.log("insert")
						);
					});
			} else {
				console.log(`${user_id} is already inserted`);
				res.end();
			}
		})
		.catch((err) => {
			console.log(err);
			return res.end();
		});
};

//  입렵한 레벨에 따라 캘린더 및 운동 생성 - 초급 1 중급 2 고급 사용자 레벨
export const calendarCreate = (req, res) => {
	console.log(++countCalling);
	let createLevel = req.query.level ? req.query.level : 1;
	let laps = (10 + createLevel) * 7;
	console.log(convertDate(new Date()));
	function convertDate(date) {
		let month = "" + (date.getMonth() + 1),
			day = "" + date.getDate(),
			year = date.getFullYear();
		if (month.length < 2) month = "0" + month;
		if (day.length < 2) day = "0" + day;

		return `${year}-${month}-${day}`;
	}

	db.query("SELECT * FROM user_status WHERE user_no=?", [user_no])
		.then((rows) => {
			let today = new Date();
			return db
				.query("UPDATE user_status SET last_date=?, user_level=? WHERE user_no=?", [
					convertDate(today),
					createLevel,
					user_no,
				])
				.then(
					() => {
						console.log(`UPDATED status`);
					},
					(err) => {
						console.log(`UPDATED error ${err}`);
					}
				)
				.catch((err) => {
					// db.end();
					return res.end();
				});
		})
		.then(() => {
			(async function () {
				let calendarNo = [];

				await db
					.query("DELETE FROM calendar WHERE calendar_id NOT IN(0)", [user_no])
					.then(
						() => {
							console.log(`DELETE lastCalendar`);
						},
						(err) => {
							console.log(`DELETE error calendar : ${err}`);
						}
					)
					.catch((err) => {
						// db.end();
						return res.end();
					});

				for (let i = 1; i < 31; i++) {
					await db
						.query("INSERT INTO calendar (user_no, calendar_id) VALUES (?, ?)", [
							user_no,
							i,
						])
						.then(
							() => {
								console.log(`INSERTED calendar id:${i}`);
								return db.query(
									"SELECT calendar_no FROM calendar WHERE user_no=? AND calendar_id =?",
									[user_no, i]
								);
							},
							(err) => {
								console.log(`INSERT error calendar id-${i} : ${err}`);
							}
						)
						.then((row) => {
							calendarNo.push(row[0].calendar_no);
						})
						.catch((err) => {
							// db.end();
							return res.end();
						});
				}
				for (let value of calendarNo) {
					for (let j = 0; j < 5; j++) {
						let type = true;
						let temp = j % 2 === 1 ? [30, !type] : [laps, type];
						await db
							.query(
								"INSERT INTO exercise (calendar_no, exercise_data, exercise_type, exercise_success) VALUES (?, ?, ?, ?)",
								[value, ...temp, false]
							)
							.then(
								() => {
									console.log(`INSERTED exercise id:${j}`);
								},
								(err) => {
									console.log(`INSERT error exercise id-${j} ${err}`);
								}
							)
							.catch((err) => {
								// db.end();
								return res.end();
							});
					}
					laps++;
				}
			})();
			return;
			// db.end();
		})
		.then(() => {
			res.json({ created: true });
		})
		.catch((err) => {
			// db.end();
			return res.end();
		});
};

export const exerciseDelete = (req, res) => {
	console.log(++countCalling);
	let calendarId = req.query.calendarId;
	let exerciseNo = req.query.exerciseNo;

	db.query("SELECT calendar_no FROM calendar WHERE user_no=? AND calendar_id=?", [
		user_no,
		calendarId,
	])
		.then((row) => {
			return db.query("SELECT exercise_no exercise_type FROM exercise WHERE calendar_no=?", [
				row[0].calendar_no,
			]);
		})
		.then((rows) => {
			let rutine = rows;
			if (rutine[exerciseNo].exercise_type === 1) res.json({ delete: false });
			let deleteRow = [];
			if (rutine.length === 1) {
				db.query("DELETE FROM calender WHERE exercise_no=?", [calendarId]).catch((err) => {
					// db.end();
					return res.end();
				});
			} else if (rutine.length === exerciseNo) {
				deleteRow.push(rutine[rutine.length - 1].exercise_no);
				if (rutine.length > 1) {
					deleteRow.push(rutine[rutine.length - 2].exercise_no);
				}
			} else {
				deleteRow.push(rutine[exerciseNo].exercise_no, rutine[exerciseNo + 1].exercise_no);
			}
			(async function () {
				for (let i = 0; i < deleteRow.length; i++) {
					await db
						.query("DELETE FROM exercise WHERE exercise_no=?", [deleteRow[i]])
						.catch((err) => {
							// db.end();
							return res.end();
						});
				}
				// return db.end();
			})();
		})
		.then(() => {
			return res.end();
		})
		.catch((err) => {
			// db.end();
			return res.end();
		});
};

export const calendarCreate2 = (req, res) => {
	console.log(++countCalling);
	let calendarDate = req.query.calendarId;

	db.query("SELECT EXISTS (SELECT * from exercise where calendar_no=?) as success", [
		calendarDate,
		user_no,
	])
		.then((row) => {
			if (row[0].success === 0) {
				return db.query("INSERT INTO calendar (user_no, calendar_id) VALUES (?, ?)", [
					user_no,
					calendarDate,
				]);
			}
		})
		.then(() => {
			// db.end();
			// return res.end();
		})
		.catch((err) => {
			// db.end();
			return res.end();
		});
};

export const exerciseCreate = (req, res) => {
	console.log(++countCalling);
	let calendarDate = req.query.calendarId;
	let exerciseData = req.query.exerciseData;
	let calendarNo;

	let insertExerciseSql =
		"INSERT INTO exercise (calendar_no, exercise_data, exercise_type) VALUES (?, ?, ?)";

	db.query("SELECT calendar_no FROM calendar WHERE calendar_id=? AND user_no=?", [
		calendarDate,
		user_no,
	])
		.then((row) => {
			calendarNo = row[0].calendar_no;
			return db.query(
				"SELECT EXISTS (SELECT * from exercise where calendar_no=?) as success",
				[calendarNo]
			);
		})
		.then((row) => {
			if (row[0].success === 0) {
				return;
			} else {
				return db.query(insertExerciseSql, [calendarNo, 30, false]);
			}
		})
		.then(() => {
			return db.query(insertExerciseSql, [calendarNo, exerciseData, true]);
		})
		// .then(() => {
		//     db.end();
		//     return res.end();
		// })
		.catch((err) => {
			// db.end();
			return res.end();
		});
};

export const calendarGet = (req, res) => {
	console.log(++countCalling);
	let calendarId = req.query.calendarId ? req.query.calendarId : 0;

	db.query(
		"SELECT A.exercise_data, A.exercise_type FROM exercise A LEFT JOIN calendar B ON A.calendar_no = B.calendar_no WHERE calendar_id=? AND user_no=?",
		[calendarId, user_no]
	)
		.then((rows) => {
			// db.end();
			return res.json(rows);
		})
		.catch((err) => {
			// db.end();
			// return res.end();
			console.log(err);
		});
};

export const calendarInquiry = async (req, res) => {
	console.log(++countCalling);

	let createdDate;
	let lastLevel;
	let calendarData = [];

	function convertDate(date) {
		let d = date,
			month = "" + (d.getMonth() + 1),
			day = "" + d.getDate(),
			year = d.getFullYear();
		if (month.length < 2) month = "0" + month;
		if (day.length < 2) day = "0" + day;

		return `${year}-${month}-${day}`;
	}

	await db
		.query("SELECT last_date, user_level FROM user_status WHERE user_no=?", [user_no])
		.then((rows) => {
			if (rows[0].last_date !== null) {
				createdDate =
					(new Date().getTime() - new Date(convertDate(rows[0].last_date)).getTime()) /
					(1000 * 3600 * 24);
				if (createdDate === 30) {
					lastLevel = rows[0].user_level++;
					res.send({ level: lastLevel });
				} else {
					lastLevel = 0;
					db.query({
						rowsAsArray: true,
						sql:
							"SELECT calendar_no, calendar_id, calendar_succeeded FROM calendar WHERE user_no=? AND calendar_id NOT IN(0)",
						values: [user_no],
					}).then((rows) => {
						let returnArray = [];
						for (let i = 0; i < rows.length; i++) {
							returnArray.push({ id: rows[i][1], check: rows[i][2] });
						}
						Object.freeze(returnArray);
						calendarData = returnArray;
						res.json({
							level: lastLevel,
							calendarData: calendarData,
							today: createdDate,
						});
					});
				}
			} else {
				lastLevel = undefined;
				res.json({ level: "undefined" });
			}
		})
		.catch((err) => {
			console.log(err);
		});
	await console.log(lastLevel, createdDate, calendarData);
};

export const exerciseStart = (req, res) => {
	console.log(++countCalling);
	let createdDate;
	let createLevel;
	let calendar = req.query.type;

	function convertDate(date) {
		let d = date,
			month = "" + (d.getMonth() + 1),
			day = "" + d.getDate(),
			year = d.getFullYear();
		if (month.length < 2) month = "0" + month;
		if (day.length < 2) day = "0" + day;

		return `${year}-${month}-${day}`;
	}

	db.query("SELECT last_date FROM user_status WHERE user_no=?", [user_no])
		.then((row) => {
			if (!calendar) createdDate = 0;
			else
				createdDate =
					(new Date().getTime() - new Date(convertDate(row[0].last_date)).getTime()) /
					(1000 * 3600 * 24);
			return db.query("SELECT calendar_no FROM calendar WHERE user_no=? AND calendar_id=?", [
				createLevel,
				createdDate,
			]);
		})
		.then((row) => {
			return db.query("UPDATE user_status SET calendar_no=? WHERE user_no=?", [
				row[0].calendar_no,
				user_no,
			]);
		})
		.then(() => {
			// db.end();
			// return res.end();
		})
		.catch((err) => {
			// db.end();
			// return res.end();
		});
};

export const exerciseRecord = (req, res) => {
	db.query("UPDATE user_status SET last_exercise_data=0 WHERE user_no=?", [user_no])
		.then(() => {
			// db.end();
			// return res.end();
		})
		.catch((err) => {
			// db.end();
			// return res.end();
		});
};

export const exerciseGet = (req, res) => {
	let exerciseData;

	db.query(
		"SELECT A.exercise_data, A.exercise_type, A.exercise_success FROM exercise A " +
			"LEFT JOIN user_status B ON A.calendar_no = B.calendar_no " +
			"WHERE user_no=? AND A.exercise_success=0 LIMIT 1",
		[user_no]
	)
		.then((rows) => {
			exerciseData.rep = rows[0].exercise_data;
			exerciseData.type = rows[0].exercise_type;
			// return db.end();
		})
		.then(() => {
			return res.JSON(exerciseData);
		})
		.catch((err) => {
			// db.end();
			// return res.end();
		});
};

export const exerciseSet = (req, res) => {
	let exerciseNo;

	db.query(
		"SELECT A.exercise_no FROM exercise A " +
			"LEFT JOIN user_status B ON A.calendar_no = B.calendar_no " +
			"WHERE user_no=1 AND A.exercise_success=0 LIMIT 1",
		[user_no]
	)
		.then((rows) => {
			exerciseNo = rows[0].exercise_no;
			return db.query("UPDATE exercise SET calendar_success =? WHERE calendar_no=?", [
				1,
				exerciseNo,
			]);
		})
		.then(() => {
			return db.query(
				"UPDATE user_status SET last_exercise_data=0 WHERE user_no=? AND exercise_no=?",
				[user_no, exerciseNo]
			);
		})
		.then(() => {
			// db.end();
			// return res.end();
		})
		.catch((err) => {
			// db.end();
			return res.end();
		});
};

export const userExerciseReset = (req, res) => {
	db.query("SELECT calendar_no FROM calendar WHERE calendar_id=0 AND user_no=?", [user_no])
		.then((row) => {
			return db.query("UPDATE exercise SET calendar_succeeded =? WHERE calendar_no=?", [
				1,
				row[0].calendar_no,
			]);
		})
		.then(() => {
			// db.end();
			// return res.end();
		})
		.catch((err) => {
			// db.end();
			return res.end();
		});
};

export const exerciseDone = (req, res) => {
	let totallaps = req.query.laps;
	let succeedCalendar;

	let today = (function (date) {
		let d = date,
			month = "" + (d.getMonth() + 1),
			day = "" + d.getDate(),
			year = d.getFullYear();
		if (month.length < 2) month = "0" + month;
		if (day.length < 2) day = "0" + day;
		return `${year}-${month}-${day}`;
	})(new Date());

	db.query("SELECT calendar_no FROM user_status WHERE user_no=?", [user_no])
		.then((row) => {
			succeedCalendar = row[0].calendar_no;
			return db.query(
				"UPDATE calendar SET calendar_succeeded =? WHERE calendar_no=? AND user_no=?",
				[true, succeedCalendar, user_no]
			);
		})
		.then(() => {
			return db.query("SELECT chart_no FROM chart_date WHERE chart_date=?", [today]);
		})
		.then((row) => {
			if (row[0].chart_no === undefined) {
				return db.query(
					"INSERT INTO chart (chart_data, chart_laps, user_no) VALUES (?, ?, ?)",
					[today, totallaps, user_no]
				);
			} else {
				return db.query("UPDATE chart SET chart_laps = chart_laps+? WHERE chart_no=?", [
					totallaps,
					row[0].chart_no,
				]);
			}
		})
		.then(() => {
			// db.end();
			// return res.end();
		})
		.catch((err) => {
			db.end();
			return res.end();
		});
};

export const exerciseUpdate = (req, res) => {
	let calendarId = req.query.calendarId;
	let exerciseData = req.query.exerciseData;
	let exerciseNo = req.query.exerciseNo; // 0번째부터 시작

	db.query(
		"SELECT A.exercise_no FROM exercise A LEFT JOIN calendar B ON A.calendar_no=B.calendar_no " +
			"WHERE calendar_id=? AND user_no=? ORDER BY A.exercise_no LIMIT ?, 1",
		[calendarId, user_no, exerciseNo]
	)
		.then((row) => {
			return db.query("UPDATE exercise SET exercise_data=? WHERE exercise_no=?", [
				exerciseData,
				user_no,
			]);
		})
		.then((row) => {
			db.end();
			return res.end();
		})
		.catch((err) => {
			db.end();
			return res.end();
		});
};

// limit - 날짜 단위(ex 7(일주일), 30(30일))
// index - 1, 2, 3, 4, 5 ~ ~

// 차트 정보 받기
export const chartGet = (req, res) => {
	let limit = req.query.limit;
	let next = req.query.index;

	db.query("SELECT * FROM chart WHERE user_no=? ORDER BY chart_no DECS LIMIT ? OFFSET ?", [
		user_no,
		limit,
		(next - 1) * limit,
	])
		.then((rows) => {
			// db.end();
			return res.json({ chartData: rows });
		})
		.catch((err) => {
			db.end();
			return res.end();
		});
};

export const getDB = (req, res) => {
	var data = [];
	(function getQuery(data) {
		db.query(`select * from user where user_no=1`).then((row) => {
			data[0] = row[0];
		});
		db.query(`select * from calendar where user_no=1`).then((row) => {
			data[1] = row[0];
		});
		db.query(`select * from user_status where user_no=1`).then((row) => {
			data[2] = row[0];
		});
		db.query(`select * from chart where user_no=1`).then((row) => {
			data[3] = row[0];
		});
		db.query(`select * from exercise where calendar_no=1`).then((row) => {
			data[4] = row[0];
		});
	})(data);
	var test = "";

	for (const iterator of data) {
		test += iterator;
	}

	res.send(test);
};
