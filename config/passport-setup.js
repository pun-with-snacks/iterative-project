const passport = require('passport');
const googleAuth = require('passport-google-oauth20');
const githubStrat = require('passport-github');
const keys = require('./keys');
const pg = require('pg');


let user = 'ulurpczi';
let pass = 'TVQxxaVGcvh2ZFlNZHXaHReKN_3DfZbm';
let config = {
	host: "nutty-custard-apple.db.elephantsql.com",
	user: user,
	password: pass,
	database: user,
	post: 5432,
	ssl: true
}
//Generating pool API
let pool = new pg.Pool(config);
let db;

pool.connect((err, result) => {
	if (err) throw new Error(err);
	else console.log("Connecting to DB");
	db = result;
	//////////////////////////////////////////////
	passport.serializeUser((user, done) => {
		// maybe id if _id undefined
		// console.log(user+'<====serializer');
		done(null, user);
		// 'phillip
	})

	passport.deserializeUser((id, done) => {
		//find _id that matches id
		// console.log(id+'<=====deserializer');
		done(null, id);
	})

	////////////////////////////////////////////
	passport.use(
		new googleAuth({
			//google strat
			callbackURL: '/auth/google/redirect',
			clientID: keys.google.clientID,
			clientSecret: keys.google.clientSecret,
		}, () => {

		}
		));
	///////////////////////////////////
	passport.use(
		new githubStrat({
			callbackURL: '/auth/github/redirect',
			clientID: keys.github.clientID,
			clientSecret: keys.github.clientSecret,
		}, (accessToken, refreshToken, profile, done) => {
			console.log('hit passport github');
			db.query(`SELECT "gitHandle" from User where "gitHandle" = '${profile.username}';`, (err, result) => {
				if (err) throw err;
				if (!result.rows[0]) {
					console.log('hit line 59');
					db.query(`INSERT INTO User (gitHandle, votesRemaining, electsRemaining, isAdmin)
					VALUES ('${profile.username}', ${3}, ${1}, ${false});`, (err, user) => {
							if (err) console.log('Im the error from insert ' + err);
							db.query(`SELECT * FROM User WHERE "gitHandle" = '${profile.username}';`, (err, user) => {
								done(null, user.rows[0].gitHandle);
							});
						});
				} else {
					db.query(`SELECT * FROM User WHERE gitHandle = '${profile.username}';`, (err, user) => {
						done(null, JSON.stringify(user.rows[0]));
					});
				}
			});
}
));

})
