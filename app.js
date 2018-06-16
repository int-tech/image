const express = require('express')
const multer = require('multer')
const fs = require('fs')
const app = express()
const IMAGE_DIR = '/var/image'
// const IMAGE_DIR = '/Users/amisris/tmp'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, IMAGE_DIR)
  }
  ,
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage })

// listening 3000 port
const server = app.listen(3000)

// app.use(express.static(IMAGE_DIR))

app.get('/:image', function(req, res, next) {
  console.log(req.params.image)
  res.header("Access-Control-Allow-Origin", "*");
  res.sendFile(IMAGE_DIR + '/' + req.params.image)
})

app.post('/image', upload.single('file'), function(req, res, next) {
  const req_file_json = JSON.stringify(req.file)
  const req_file = JSON.parse(req_file_json)
  const image_path = req_file.path

  const req_body_json = JSON.stringify(req.body)
  const req_body = JSON.parse(req_body_json)
  const label = req_body.picked

  // when python script is "do_generate.py" which takes 2 args, it seems like
  // ----------------------------------
  // do_generate.py image_path label
  // ----------------------------------
  // image_path : posted file path which might be /var/images/[file_name]
  // label : correct label the uploaded file has
  
  // console.log(req_file)
  console.log(IMAGE_DIR + '/' + image_path)
  
  // const buf = fs.readFileSync(IMAGE_DIR + '/' + image_path);
  res.header("Access-Control-Allow-Origin", "*");
  // res.send(buf, { 'Content-Type': 'image/png' }, 200);

  res.json({'result': 'success!'})
})
