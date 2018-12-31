const express = require('express');
const { verificaToken } = require('../middlewares/autenticacion');
const app = express();
const Product = require('../models/product');

app.get('/products', verificaToken, (req, res) => {
    //get all the products
    //populate(user, category)
    //skip and limit
    let skip = req.query.skip || 0;
    skip = Number(skip);
    let limit = req.query.limit || 5;
    limit = Number(limit);
    Product.find({ availability: true })
        .populate('user', 'name email')
        .populate('category', 'description')
        .sort('name')
        .skip(skip)
        .limit(limit)
        .exec((err, products) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            Product.count({ availability: true }, (err, total) => {
                res.json({
                    ok: true,
                    products,
                    total
                })
            });
        });
});

app.get('/products/:id', verificaToken, (req, res) => {
    //populate(user, category)
    let id = req.params.id;
    Product.findById(id, (err, product) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            if (!product) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Invalid ID'
                    }
                });
            }
            res.json({
                ok: true,
                product
            });
        })
        .populate('user', 'name email')
        .populate('category', 'description')
});

app.get('/products/serch/:name', verificaToken, (req, res) => {
    //serch product
    let name = req.params.name;
    let serch = new RegExp(name, 'i');
    Product.find({ name: serch })
        .populate('category', 'description')
        .exec((err, products) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            Product.count({ name: serch }, (err, total) => {
                res.json({
                    ok: true,
                    products,
                    total
                })
            });
        });
});

app.post('/products', verificaToken, (req, res) => {
    //create a new product
    //save user and save category
    let body = req.body;
    let product = new Product({
        name: body.name,
        price: body.price,
        description: body.description,
        availability: body.availability,
        category: body.category,
        user: req.user._id
    })
    product.save((err, newProduct) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!newProduct) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            product: newProduct
        });
    });
});

app.put('/products/:id', verificaToken, (req, res) => {
    //update the product
    let id = req.params.id;
    let body = req.body;
    let updates = {
        name: body.name,
        price: body.price,
        description: body.description,
        availability: body.availability,
        category: body.category
    }
    Product.findByIdAndUpdate(id, updates, { new: true, runValidators: true }, (err, newProduct) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!newProduct) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Invalid ID'
                }
            });
        }
        res.json({
            ok: true,
            product: newProduct
        });
    });
});

app.delete('/products/:id', verificaToken, (req, res) => {
    //update the "available" information
    let id = req.params.id;
    let newAvailability = {
        availability: false
    }
    Product.findByIdAndUpdate(id, newAvailability, { new: true, runValidators: true }, (err, deleteProduct) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!deleteProduct) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            message: 'Product was deleted correctly',
            product: deleteProduct
        })
    });
});
module.exports = app;