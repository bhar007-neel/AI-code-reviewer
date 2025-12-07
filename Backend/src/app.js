const express = require('express'); // we telling our program that we require express package

const app = express() // creating a new instance of express 
app.get('/', (req,res) => {
    res.send("hello world")
})

module.exports = app