const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const User = require('../models/usuario');
const Product = require('../models/product');
const fs = require('fs'); //file system
const path = require('path');


//default option, you can add more params
app.use(fileUpload());

app.put('/upload/:type/:id', (req, res) => {

    let type = req.params.type;
    let id = req.params.id;

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'File does not found'
            }
        })
    }

    let file = req.files.file;

    // Valid types
    let validTypes = ['users', 'products'];

    if (validTypes.indexOf(type) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Valid types are ' + validTypes.join(', '),
                type
            }
        });
    }
    // Valid extensions
    let validExtensions = ['png', 'jpg', 'gif', 'jpeg'];
    let splitNameFile = file.name.split('.');
    let extension = splitNameFile[splitNameFile.length - 1];
    extension = extension.toLowerCase();

    if (validExtensions.indexOf(extension) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Valid extensions are ' + validExtensions.join(', '),
                extension
            }
        });
    }

    //change name
    let nameFile = `${ id }-${ new Date().getMilliseconds() }.${ extension }`;


    file.mv(`uploads/${type}/${ nameFile }`, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (type === 'users') {
            userImage(id, res, nameFile);
        }

        if (type === 'products') {
            productImage(id, res, nameFile);
        }
    });
});

function userImage(id, res, nameFile) {
    User.findById(id, (err, userDB) => {
        if (err) {
            deleteImage('users', nameFile);
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!userDB) {
            deleteImage('users', nameFile);
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'User does not exist'
                }
            })
        }

        deleteImage('users', userDB.img);

        userDB.img = nameFile;

        userDB.save((err, saveUser) => {
            res.json({
                ok: true,
                user: saveUser
            })
        });
    });
}

function productImage(id, res, nameFile) {
    Product.findById(id, (err, productDB) => {
        if (err) {
            deleteImage('products', nameFile);
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!productDB) {
            deleteImage('products', nameFile);
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Product does not exist'
                }
            })
        }

        deleteImage('products', productDB.img);

        productDB.img = nameFile;

        productDB.save((err, saveProduct) => {
            res.json({
                ok: true,
                product: saveProduct
            })
        });
    });
}

function deleteImage(type, nameFile) {
    let imagePath = path.resolve(__dirname, `../../uploads/${type}/${nameFile}`);
    if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
    }
}

module.exports = app;