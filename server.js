const express = require('express')
const app = express()


app.get('/', (req, res) => {
    res.send('Hello Node API')
})

app.listen(3000, () => {
    console.log("Hi its working on 3000")
})