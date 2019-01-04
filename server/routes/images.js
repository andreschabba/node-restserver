const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
const { verificaImgToken } = require('../middlewares/autenticacion');

app.get('/image/:type/:img', verificaImgToken, (req, res) => {
    let type = req.params.type;
    let img = req.params.img;
    let imagePath = path.resolve(__dirname, `../../uploads/${type}/${img}`);
    if (fs.existsSync(imagePath)) {
        res.sendFile(imagePath);
    } else {
        let noImagePath = path.resolve(__dirname, '../assets/no-image.jpg');
        res.sendFile(noImagePath);
    }
});

module.exports = app;