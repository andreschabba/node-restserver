const express = require('express');
const bcrypt = require('bcrypt'); //encriptar
const _ = require('underscore');
const Usuario = require('../models/usuario'); //My Schema
const app = express();
const { verificaToken, verificaRole } = require('../middlewares/autenticacion');


app.get('/usuario', verificaToken, (req, res) => { //routa, middleware, function 

    let skip = req.query.skip || 0;
    skip = Number(skip);
    let limit = req.query.limit || 5;
    limit = Number(limit);

    Usuario.find({ status: true }, 'name email role status google img') //Puedes excluir los campos que quieras 
        .skip(skip)
        .limit(limit)
        .exec((err, users) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count({ status: true }, (err, total) => {
                res.json({
                    ok: true,
                    users,
                    total
                });
            });
        });
});

app.post('/usuario', [verificaToken, verificaRole], (req, res) => {


    let body = req.body;

    let usuario = new Usuario({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        //usuarioDB.password = null;

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });

});

app.put('/usuario/:id', [verificaToken, verificaRole], (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'email', 'img', 'role']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});


app.delete('/usuario/:id', [verificaToken, verificaRole], (req, res) => {
    let id = req.params.id;
    //**IN THIS WAY DELETE ALL THE INFORMATION FROM THE DB**//
    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    //     if (err) {
    //         return res.status(400).json({
    //             ok: false,
    //             err
    //         });
    //     };
    //      res.json({
    //     ok: true, 
    //     usuario: usuarioBorrado
    // });
    let newStatus = {
        status: false
    };
    //HERE JUST CHANGE THE STATUS
    Usuario.findByIdAndUpdate(id, newStatus, { new: true }, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'User does not find'
                }
            });
        }
        res.json({
            ok: true,
            usuario: usuarioBorrado
        })
    })
});

module.exports = app;