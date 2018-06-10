const express = require('express');
const mysql = require('mysql');
const router = express.Router();

let db = require(__DBdir);

router.get('/today', function(req, res, next) {
	let conn, subconn;
	let rand;
	let today;

	db.getConnection()
	.then((connection)=>{
		conn = connection;
		let date = new Date();
		let month = date.getMonth() + 1;
		today = date.getFullYear() + '/' + month + '/' + date.getDate();
		
		console.log(today);

		let sql = `
			SELECT *
			FROM JOKE_TB
			WHERE Date = '${today}'
		`;

		return conn.query(sql);

	}).then((sql_result) => {
		if(sql_result.length > 0) {
			
			console.log("이미 한번 시도했음");
			conn.release();

			res.send(sql_result[0]);
		} else {
			console.log("첫 시도");

			db.getConnection()
			.then((connection) => {
				subconn = connection;
				let sql = `
					SELECT COUNT(*)
					FROM JOKE_TB
				`;
				return subconn.query(sql);
			}).then((sql_result) => {
				console.log(sql_result[0]);
				let num = parseInt(sql_result[0]['COUNT(*)']);
				rand = Math.floor(Math.random() * num) + 1;
				let sql = `
					SELECT *
					FROM JOKE_TB
					WHERE jokeId = ${rand}
				`;
				return subconn.query(sql);
			}).then((sql_result) => {
				console.log(today);
				let sql = `
					UPDATE JOKE_TB 
					set Date = '${today}' 
					WHERE jokeId = ${rand}
				`;
				console.log(sql);
				subconn.query(sql);
				subconn.release();
				res.send(sql_result[0]);
			});

			conn.release();
		}
	});
});

router.get('/random', function(req, res, next) {
	let conn;

	db.getConnection()
	.then((connection) => {
		conn = connection;
		let sql = `
			SELECT *
			FROM JOKE_TB
			ORDER BY RAND()
			LIMIT 1
		`;
		return conn.query(sql);
	}).then((sql_result) => {
		res.send(sql_result[0]);
		conn.release();
	})
})


module.exports = router;