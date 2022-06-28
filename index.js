const express = require('express')
const app = express()
const port = 3289
const bodyParser = require('body-parser')
const router = require('./routes')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api/v1', router)


app.listen(port, () => {
  console.log(`Tickitz Backend listening on port ${port}`)
})