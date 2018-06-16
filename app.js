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
  console.log('requested: ' + IMAGE_DIR + '/' + req.params.image)
  res.header("Access-Control-Allow-Origin", "*");
  res.sendFile(IMAGE_DIR + '/' + req.params.image)
})

app.post('/image', upload.single('file'), async function(req, res, next) {
  const req_file_json = JSON.stringify(req.file)
  const req_file = JSON.parse(req_file_json)
  const image_path = req_file.path

  const req_body_json = JSON.stringify(req.body)
  const req_body = JSON.parse(req_body_json)
  const label = req_body.picked

  console.log('saved: ' + image_path)

  let result = ''
  await exec_generate_image(image_path, label)
  .then(function(res) {
    console.log(res)
    result = 'success'
  })
  .catch(function(err) {
    result = 'failed'
  })

  // const buf = fs.readFileSync(IMAGE_DIR + '/' + image_path);
  res.header("Access-Control-Allow-Origin", "*");
  // res.send(buf, { 'Content-Type': 'image/png' }, 200);

  res.json({'result': `${result}`})
})

function exec_generate_image(image_path, label) {
  return new Promise(function(resolve, reject) {
    const exec = require('child_process').exec
    const COMMAND = `python generate.py ${image_path} ${label}`
    exec(COMMAND, function(error, stdout, stderr) {
      if (error) {
        reject(error)
      }
      resolve('generating is finished')
    })
  })
}
