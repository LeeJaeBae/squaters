import db from "../../db";

var user_no = 1;
export const dbCreate = (req, res) => {
    // 기본 생성 레벨
    db.query(
        `CREATE TABLE default_level(
    lv_id   		    INT	 	    NOT NULL  	AUTO_INCREMENT,
    lv_data		        INT 	 	NOT NULL,
    user_no  		    INT   		NOT NULL,
    PRIMARY KEY(lv_id)
    ) engine=InnoDB;`,
        () => {}
    );

    // 생성된 레벨의 세트정보(p_type: 운동종류/휴식/운동, p_data: 운동값/초,횟수)
    db.query(
        `CREATE TABLE default_plan(
    p_id  		INT	 	        NOT NULL  	AUTO_INCREMENT,
    lv_id  		INT	 	        NOT NULL,
    p_type   	TINYINT(1)  	NOT NULL  	DEFAULT 0,
    p_data 		INT	 	        NOT NULL,
    PRIMARY KEY(p_id)
    ) engine=InnoDB;`,
        () => {}
    );

    // 캘린더(lv_id: 운동난이도, cl_data: 날짜/30일 기준, cl_date: 실제날짜/타임스텀프, cl_ck: 운동 완료여부)
    db.query(
        `CREATE TABLE calendar(
        cl_id 		    INT 		NOT NULL 	AUTO_INCREMENT,
        lv_id  		    INT 		NOT NULL,
        cl_data 		INT 		NOT NULL,
        cl_date 		TEXT 		NOT NULL,
        user_no 		INT  		NOT NULL,
        cl_ck  		    TINYINT(1) 	NOT NULL  	DEFAULT 0,
        PRIMARY KEY(cl_id)
    ) engine=InnoDB;`,
        () => {}
    );

    // 생성된 레벨의 세트정보(p_type: 운동종류/휴식/운동, p_data: 운동값/초,횟수)
    db.query(
        `CREATE TABLE plan(
        p_id  		    INT	 	        NOT NULL  	AUTO_INCREMENT,
        cl_data 	    INT 		    NOT NULL,
        p_type  	    TINYINT(1)  	NOT NULL  	DEFAULT 0,
        p_data 		    INT	 	        NOT NULL,
        user_no 	    INT  		    NOT NULL,
        PRIMARY KEY(p_id)
    ) engine=InnoDB;`,
        () => {}
    );

    // 계획 테이블(cl_data/날짜: 0) 사용자 설정운동 컬럼 생성
    db.query(`INSERT INTO plan(cl_data,p_data,user_no) VALUES(0, 15,${user_no});`, () => {});
    db.query(
        `INSERT INTO plan(cl_data,p_type, p_data,user_no) VALUES(0, 1, 30,${user_no});`,
        () => {}
    );
    db.query(`INSERT INTO plan(cl_data,p_data,user_no) VALUES(0, 15,${user_no});`, () => {});
    db.query(
        `INSERT INTO plan(cl_data,p_type, p_data,user_no) VALUES(0, 1, 30,${user_no});`,
        () => {}
    );
    db.query(`INSERT INTO plan(cl_data,p_data,user_no) VALUES(0, 15,${user_no});`, () => {});

    // 기본 운동 컬럼 생성
    for (let i = 0; i < 45; i++) {
        let num1 = 10 + i * 2;

        db.query(
            `INSERT INTO default_level(lv_data, user_no) VALUES(${i + 1}, ${user_no});`,
            () => {}
        );

        db.query(
            `SELECT lv_id FROM default_level WHERE user_no = ${user_no} AND lv_data = ${i + 1};`,
            (err, levleId) => {
                db.query(
                    `INSERT INTO default_plan(lv_id,p_data) VALUES(${levleId[0].lv_id}, ${num1});`,
                    () => {}
                );
                //휴식
                db.query(
                    `INSERT INTO default_plan(lv_id, p_type, p_data) VALUES(${levleId[0].lv_id}, 1, 30);`,
                    () => {}
                );
                //휴식
                db.query(
                    `INSERT INTO default_plan(lv_id,p_data) VALUES(${levleId[0].lv_id}, ${
                        num1 + 1
                    });`,
                    () => {}
                );
                //휴식
                db.query(
                    `INSERT INTO default_plan(lv_id, p_type, p_data) VALUES(${levleId[0].lv_id}, 1, 30);`,
                    () => {}
                );
                //휴식
                db.query(
                    `INSERT INTO default_plan(lv_id,p_data) VALUES(${levleId[0].lv_id}, ${
                        num1 + 2
                    });`,
                    () => {}
                );
            }
        );
    }
};

export const dbDelete = (req, res) => {
    let d1 = `DROP TABLE calendar;`;
    let d2 = `DROP TABLE default_level;`;
    let d3 = `DROP TABLE default_plan;`;
    let d4 = `DROP TABLE plan;`;

    db.query(d1, () => {});
    db.query(d2, () => {});
    db.query(d3, () => {});
    db.query(d4, () => {});
};

export const selectExercise = (req, res) => {
    let calendarCheck;

    db.query(`SELECT * FROM caledar WHERE user_no = ${user_no}`, (err, calendar) => {
        let todayStamp = new Date();
        let today = `${todayStamp.getMonth()}-${todayStamp.getDate()}`;

        for (let i = 0; i < calendar.length; i++) {
            let calendarDate = new Date(calendar[i].cl_date / 1000);
            let date = `${calendarDate.getMonth()}-${calendarDate.getDate()}`;

            if (today === date) {
                calendarCheck = calendar[i].cl_data;
                break;
            }
        }
    });
    res.send(calendarCheck);
};

export const selectLevel = (req, res) => {
    db.query(`SELECT * FROM calender WHERE user_no = ${user_no}`, (err, calendar) => {
        // 계획이 있으면 캘린더 페이지 이동
        if (calendar.length > 0) {
            res.writeHead(302, { Location: `/calendar` });
            res.end();
            // 계획이 없으면 난이도 선택창
        } else {
            // let html = template.selectLevel();
            // res.send(html);
        }
    });
};
