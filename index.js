
const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const { Expense, User } = require('./schema.js')

const app = express()
app.use(bodyParser.json())
app.use(cors())
async function connectToDb() {
  try {
    await mongoose.connect('mongodb+srv://priya:priya123@cluster0.zlpfyh0.mongodb.net/ExpenseTracker?retryWrites=true&w=majority&appName=Cluster0')
    console.log("DB connection established")
    const port = process.env.PORT || 8000
    app.listen(port, function () {
      console.log(`Listening on port ${port}...`)
    })
  } catch (error) {
    console.log(error)
    console.log('Couldn\'t establish DB connection')
  }
}
connectToDb()

app.post('/add-expense', async function (request, response) {
  try {
    await Expense.create({
      "amount": request.body.amount,
      "category": request.body.category,
      "date": request.body.date
    })
    response.status(201).json({
      "status": "success",
      "message": "entry successfully added"
    })
  } catch (error) {
    response.status(500).json({
      "status": "failure",
      "message": "entry not created",
      "error": error
    })
  }
})

app.get('/get-expenses', async function (request, response) {
  try {
    const expenseDetails = await Expense.find()
    response.status(200).json(expenseDetails)
  }
  catch (error) {
    response.status(500).json({
      "status": "failure",
      "message": "Could not Fetch Data",
      "error": error
    })
  }
})

app.delete('/delete-expenses/:id', async function (request, response) {
  try {
    await Expense.findByIdAndDelete(request.params.id),
      response.status(200).json({
        "status": "success",
        "message": "Entry Deleted"
      })
  }
  catch (error) {
    response.status(500).json({
      "status": "failure",
      "message": "couldn't Delete entry",
      "error": error
    })
  }
})


app.patch('/update-expenses/:id', async function (request, response) {
  try {
    await Expense.findByIdAndUpdate(request.params.id, {
      "amount": request.body.amount,
      "category": request.body.category,
      "date": request.body.date
    })
    response.status(200).json({
      "status": "success",
      "message": "Entry updated"
    })
  }
  catch (error) {
    response.status(500).json({
      "status": "failure",
      "message": "couldn't Delete entry",
      "error": error
    })
  }
})


