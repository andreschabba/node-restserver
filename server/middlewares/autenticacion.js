const jwt = require('jsonwebtoken');


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
        req.usuario = deocoded.usuario;
        next();
    });
};

// =======================
// VERIFICAR ADMINROLE
// =======================

let verificaRole = (req, res, next) => {
    let role = req.usuario.role;

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

module.exports = {
    verificaToken,
    verificaRole
}