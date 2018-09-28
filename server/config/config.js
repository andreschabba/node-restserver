// =======================
// PUERTO
// =======================
process.env.PORT = process.env.PORT || 3000;

// =======================
// ENVIRONMENT
// =======================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'; //To know if is running like developer or production.

// =======================
// EXPIRED DATE
// =======================
//60 SECONDS, 60 MINUTES, 24 HOURS, 30 DAYS
process.env.EXPIRED_TOKEN_DATE = 60 * 60 * 24 * 30;

// =======================
// AUTHENTICATION SEED
// =======================
process.env.SEED = process.env.SEED || 'este-es-el-seed-de-desarrollo';

// =======================
// DATA BASE
// =======================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe'; //Like developer
} else {
    urlDB = process.env.MONGO_URL; //Like production
}

process.env.urlDB = urlDB;

//heroku config:set *nombreVariable=....* TO CREATE ENVIRONMEMT VARIABLES AND TO PROTECT INFORMATION

// =======================
// GOOGLE CLIENT ID
// =======================
process.env.CLIENT_ID = process.env.CLIENT_ID || '54507858328-n4aml7nq7sa4qqd8925h06fep2tc0g5s.apps.googleusercontent.com';