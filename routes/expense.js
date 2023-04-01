const path = require('path');

const express = require('express');

const expenseController = require('../controllers/expense');

const router = express.Router();

router.get('/expense/get-expense', expenseController.getExpense);
router.post('/expense/add-expense', expenseController.postExpense);
router.delete('/expense/delete-expense/:id', expenseController.deleteExpense);

module.exports = router;