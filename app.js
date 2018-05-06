const express = require('express')
const multer = require('multer')
const app = express()
const upload = multer({ dest: '/Users/amisris/'})

// listening 3000 port
const server = app.listen(3000)

app.get('/image', function(req, res, next) {
  res.send('hellooooo')
})

app.post('/image', upload.single('image'), function(req, res, next) {
  console.log(req.files)
  res.send(req.files)
})
