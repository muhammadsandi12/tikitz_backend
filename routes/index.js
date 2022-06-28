const express = require("express");
const app = express()
const moviesRoute = require('./moviesRouter')
const scheduleRoute = require('./scheduleRouter')
const bookingRoute = require('./bookingRouter')

app.use('/movies', moviesRoute)
app.use('/schedule', scheduleRoute)
app.use('/booking', bookingRoute)






module.exports = app

