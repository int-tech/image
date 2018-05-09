const express = require('express')
const multer = require('multer')
const app = express()
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/var/image')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage })

// listening 3000 port
const server = app.listen(3000)

app.get('/image', function(req, res, next) {
  res.send('hellooooo')
})

app.post('/image', upload.single('file'), function(req, res, next) {
  res.json({'result': 'success!'})
})
