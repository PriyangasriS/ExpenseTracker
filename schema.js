const mongoose = require('mongoose')

const expenseDetailsSchema = new mongoose.Schema({
    amount: {
        type: Number
    },
    category: {
        type: String 
    },
    date: {
        type: String
    }
},{versionKey:false})


// creating a model
const Expense = mongoose.model('ExpenseDetails', expenseDetailsSchema)

const userDetailsSchema = new mongoose.Schema({
    emailID: {
        type: String
    },
    password: {
        type: String
    },
    user_name: {
        type: String
    }
},{versionKey:false})

const User = mongoose.model('UserDetails', userDetailsSchema)

module.exports = { Expense, User }