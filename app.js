const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');

// const errorController = require('./controllers/error');

const User = require('./models/User');
var cors = require('cors');

const app = express();

app.use(cors());

app.set('view engine', 'ejs');
app.set('views', 'views');


// const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');

// db.execute('SELECT * FROM products').then((result) => {
//     console.log(result[0], result[1]);
// }).catch((err) => {
//     console.log(err);
// });

app.use(bodyParser.json({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/admin', adminRoutes);
// app.use(shopRoutes);

// app.use(errorController.get404);

app.post('/user/add-user', async (req, res, next) => {
    try {
    const name = req.body.name;
    const email = req.body.email;
    const phonenumber = req.body.phonenumber;

    const data = await User.create( {name: name, email: email, phonenumber: phonenumber});
    res.status(201).json({newUserDetail: data});
    }catch(err){
       res.status(500).json({
        err: err
       })
    }
})

app.get('/user/get-users', async(req, res, next) => {
    try {
    const users = await User.findAll();
    res.status(200).json({allUsers: users});
    }catch(err){
        console.log("Get users is failing", JSON.stringify(err));
        res.status(500).json({
            err:err
        })
    }
})

app.delete('/user/delete-user/:id', async (req, res, next) => {
    try{
        if(req.params.id == 'undefined'){
            console.log('Id is missing');
            return res.status(400).json({err: 'ID is missing'})
        }
    const uId = req.params.id;
    await User.destroy({where: {id: uId}});
    res.sendStatus(200);
    }catch(err){
        console.log(err);
      res.status(500).json(err);
    }
})

sequelize
.sync()
.then(result => {
    // console.log(result);
    app.listen(3001);
})
.catch(err => {
    console.log(err);
});


