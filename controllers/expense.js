const Expense = require('../models/Expense');

exports.getExpense = async (req, res, next) => {
    try {
    const users = await Expense.findAll();
    res.status(200).json({allUsers: users});
    }catch(err){
        console.log("Get expense is failing", JSON.stringify(err));
        res.status(500).json({
            err:err
        })
    }
};

exports.postExpense = async (req, res, next) => {
    try {
    const expense = req.body.expense;
    const desc = req.body.desc;
    const cat = req.body.cat;

    const data = await Expense.create( {expense: expense, desc: desc, cat: cat});
    res.status(201).json({newUserDetail: data});
    }catch(err){
       res.status(500).json({
        err: err
       })
    }
};

exports.deleteExpense = async (req, res, next) => {
    try{
        if(req.params.id == 'undefined'){
            console.log('Id is missing');
            return res.status(400).json({err: 'ID is missing'})
        }
    const uId = req.params.id;
    await Expense.destroy({where: {id: uId}});
    res.sendStatus(200);
    }catch(err){
        console.log(err);
      res.status(500).json(err);
    }
};