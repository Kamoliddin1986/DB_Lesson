const express = require('express')
const { loadavg } = require('os')

const userRouter = require("./router/user.router")

const app = express()
app.use(express.json())
app.use(userRouter)

app.listen(9999, console.log(9999))