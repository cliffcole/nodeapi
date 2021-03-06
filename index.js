const express = require('express');
const models = require('./models');
const Sequelize = require('sequelize');
const cors = require('cors');
const app = express();
const port = 3001;

//express replacement for body-parser
app.use(express.json());
app.use(express.urlencoded({extended: true}))

// sets the static folder for html/javascript/css/etc
app.use(express.static('public'));

app.use(cors());

//read http://localhost:3000/api/
app.get("/api", (req, res) => {
    models.Review.findAll({}).then((reviews) => {
        
        res.json(reviews);    
    })  
})
//create http://localhost:3000/api/create
app.post("/api/create", (req,res) => {
    console.log(req.body);
    models.Review.create(req.body).then((results) => {
        res.json(results);
    })
})
app.get("/api/review/:id", (req,res) => {
    console.log(req.params.id);
    models.Review.findById(req.params.id).then(results => {
        res.json(results);
    })
})
//update http://localhost:3000/api/1/edit
app.put("/api/review/:id/edit", (req,res) => {
    console.log(req.body);
    models.Review.update(req.body, {
        where: {id: req.params.id}
    }).then((results) => {
        res.json(results);
    })
    
})
//delete http://localhost:3000/api/1/delete
app.delete('/api/review/:id/delete', (req,res) => {
    models.Review.destroy({where: {id: req.params.id}}).then((results) => {
        res.json(results)
    })
    
})

models.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log("Running on "+ port);
    })
})


