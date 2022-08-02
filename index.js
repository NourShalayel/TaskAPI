'use strict'
const express = require('express')
const config = require('./config')
const cors = require('cors')
const taskRoutes = require('./routes/taskRoute')
const userRoutes = require('./routes/taskRoute')


const app = express()

app.use(express.json())
app.use(cors())

app.use('/api', taskRoutes.routes)
// app.use('/api' , userRoutes.routes)

app.listen(config.port, () => {
  console.log('app listening on url http://localhost:' + config.port)
})

module.exports = app
