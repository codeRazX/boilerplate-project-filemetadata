var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require('multer');

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


app.post('/api/fileanalyse', upload.single('upfile'), (req,res)=>{
  try{
    const file = req.file;
    if(!file) throw Error;
    const {mimetype, size, originalname} = file;
    res.json({ name:originalname, type: mimetype, size: size,});
  }
  catch(err){
    
    res.send(err);
  }
  


})



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
