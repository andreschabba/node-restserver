// =======================
// PUERTO
// =======================
process.env.PORT = process.env.PORT || 3000;

// =======================
// ENVIRONMENT
// =======================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'; //To know if is running like developer or production.

// =======================
// BASE DE DATOS
// =======================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe'; //Like developer
} else {
    urlDB = 'mongodb://cafe-user:cafe123@ds113749.mlab.com:13749/cafe'; //Like production
}

process.env.urlDB = urlDB;