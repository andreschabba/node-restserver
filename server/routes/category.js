const express = require('express');
let { verificaToken, verificaRole } = require('../middlewares/autenticacion');
let app = express();
let Category = require('../models/category');

app.get('/category', verificaToken, (req, res) => {
    //Show the whole categories
    // let skip = req.query.skip || 0;
    // skip = Number(skip);
    // let limit = req.query.limit || 5;
    // limit = Number(limit);
    Category.find({})
        // .skip(skip)
        // .limit(limit)
        .populate('user', 'name email')
        .sort('description')
        .exec((err, categories) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Category.count({}, (err, total) => {
                res.json({
                    ok: true,
                    categories,
                    total
                });
            });
        });
});

app.get('/category/:id', verificaToken, (req, res) => {
    //Show the category of the id
    let id = req.params.id;
    Category.findById(id, (err, category) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!category) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Invalid ID'
                }
            });
        }
        res.json({
            ok: true,
            category
        });
    }).populate('user', 'name email')
});

app.post('/category', verificaToken, (req, res) => {
    //Create new category
    let body = req.body;
    let category = new Category({
        description: body.description,
        user: req.user._id
    });
    category.save((err, newCategory) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!newCategory) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            category: newCategory
        });
    });

});

app.put('/category/:id', verificaToken, (req, res) => {
    //Upload the category description
    let id = req.params.id;
    let newDescription = {
        description: req.body.description
    }
    Category.findByIdAndUpdate(id, newDescription, { new: true, runValidators: true }, (err, newCategory) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!newCategory) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Invalid ID'
                }
            });
        }
        res.json({
            ok: true,
            category: newCategory
        });
    });
});

app.delete('/category/:id', [verificaToken, verificaRole], (req, res) => {
    //Only the admin can delete categories
    let id = req.params.id;
    Category.findByIdAndRemove(id, (err, deleteCategory) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Invalid ID'
                }
            });
        }
        res.json({
            ok: true,
            message: 'Category was deleted correctly',
            category: deleteCategory
        })
    });
});

module.exports = app;