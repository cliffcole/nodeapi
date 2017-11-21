const express = require('express');
const Sequelize = require('sequelize');

const app = express();
const port = 3000;

//initialize sequelize;
const sequelize = new Sequelize('postgres://cliff:@localhost:5432/traveltroll');

//Creating user table with on field named user
const User = sequelize.define('users', {
    username: {
        type: Sequelize.TEXT
    }
})

//Creating Review tables to hold all review.
//Belongs to a user;
const Review = sequelize.define('review', {
    review: {
      type: Sequelize.TEXT
    },
    city: {
      type: Sequelize.STRING
    },
    country: {
        type: Sequelize.STRING
    },
    rating: {
        type: Sequelize.INTEGER
    }
});
//Review belongs to user
User.hasMany(Review);

User.sequelize.sync({force: true}).then(() => {});
Review.sequelize.sync({force: true}).then(() =>{});

//express replacement for body-parser
app.use(express.json());
app.use(express.urlencoded({extended: true}))

// sets the static folder for html/javascript/css/etc
app.use(express.static('public'));


//read http://localhost:3000/api/
app.get("/api", (req, res) => {
    Review.findAll({}).then((reviews) => {
        res.json(reviews);    
    })  
})


//create http://localhost:3000/api/create
app.post("/api/create", (req,res) => {
    console.log(req.body);

    /* User.findOrCreate({username: req.body.username}).then((results) => {
        console.log(results)
        res.json(results)
    
    }) */

    User.findOrCreate({where: {username: req.body.username}})
    .spread((user,created) =>{
        console.log("USER: "+user );
        console.log("CREATED: "+created)
    }).catch((err) => {
        console.log(err);
    })

    /* User.findOrCreate({where: {username: req.body.username}})
        .then((results) => {
            console.log(results);
            res.json(results);
        })
     */

    /* Review.create({
        review: req.body.review,
        city: req.body.city,
        country: req.body.country,
        rating: req.body.rating
    },{
        include: [User]
    }).then((results) => {
        res.json(results);
    }) */
    
})

//update http://localhost:3000/api/1/edit
app.put("/api/:id/edit", (req,res) => {
    res.json({put: "Route"})
})
//delete http://localhost:3000/api/1/delete
app.delete('/api/:id/delete', (req,res) => {
    res.json({delete: "Route"})
})



app.listen(port, () => {
    console.log("Running on "+ port);
})
