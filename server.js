const express = require('express')
const generateUploadURL = require('./s3')

const app = express()

app.use(express.static('front'))

app.get('/s3Url', async (req, res) => {
  const url = await generateUploadURL()
  res.send({ url })
})

app.get('/', async (req, res) => {
  res.send('app is running successfully')
})

app.listen(8080, () => console.log("listening on port 8080"))