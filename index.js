const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

app.use('/', express.static('public'));
//for parsing json input from angular
app.use(bodyParser.json());

app.post('/upload', upload.single('myimage'), (req, res) => {
    let imagePath = path.join(__dirname, `/uploads/${req.file.originalname}`);
    fs.rename(req.file.path, imagePath, function(err) {
        if(err) res.send(err.toString());
        res.send("Success");
    });
});

app.get('/get/:name', function(req, res) {
    let imagePath = path.join(__dirname, `/uploads/${req.params.name}`);
    fs.readFile(imagePath, (err, result) => {
        if(err) res.send(err.toString());

        console.log(result.buffer);
        //res.contentType('image/jpeg');
        res.send(result);
    });
});

app.get('/getbase64/:name', function(req, res) {
    let imagePath = path.join(__dirname, `/uploads/${req.params.name}`);
    fs.readFile(imagePath, (err, result) => {
        if(err) res.send(err.toString());

        //console.log(result.buffer);
        //res.contentType('image/jpeg');
        res.send(result.toString('base64'));
    });
});

app.listen(3000, (err, res) => {
    console.log("Server is listening to port 3000 !!");
});