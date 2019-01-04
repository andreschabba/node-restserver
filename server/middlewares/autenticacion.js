const jwt = require('jsonwebtoken');

//MIDDLEWARES

// =======================
// VERIFICAR TOKEN
// =======================

let verificaToken = (req, res, next) => { //si no se ejecuta el next, se queda en el middleware
    let token = req.get('token'); // nombre del header

    jwt.verify(token, process.env.SEED, (err, deocoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            })
        }
        req.user = deocoded.user;
        next();
    });
};

// =======================
// VERIFICAR ADMINROLE
// =======================

let verificaRole = (req, res, next) => {
    let role = req.user.role;

    if (role === 'ADMIN_ROLE') {
        next();
    } else {
        res.json({
            ok: false,
            err: {
                message: 'User is not an admin'
            }
        })
    }

}


// =======================
// VERIFICAR TOKEN IMG
// =======================

let verificaImgToken = (req, res, next) => {
    let token = req.query.token;

    jwt.verify(token, process.env.SEED, (err, deocoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            })
        }
        req.user = deocoded.user;
        next();
    });
};

module.exports = {
    verificaToken,
    verificaRole,
    verificaImgToken
}