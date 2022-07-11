const express = require("express");
const app = express()
const moviesRoute = require('./moviesRouter')
const scheduleRoute = require('./scheduleRouter')
const bookingRoute = require('./bookingRouter')
const authRouter = require('./authRouter')
const userRoute = require('./usersRouter')
const authVerfity = require('../helper/verityAuth')
app.use('/movies', moviesRoute)
app.use('/schedule', scheduleRoute)
app.use('/booking', bookingRoute)
app.use('/auth', authRouter)
app.use('/users',authVerfity ,userRoute)








module.exports = app

