const express = require('express');
const app = express();
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const dotenv = require('dotenv');
const i18next = require('i18next')
const Backend = require('i18next-fs-backend')
const middleware = require('i18next-http-middleware')
dotenv.config();
const users = require('./router/user')
const auth = require('./router/auth')
const Product = require('./router/Product')
const Project = require('./router/Project')
const Cart = require('./router/Cart')
const Order = require('./router/Order')
const Category = require('./router/Category')
const conversion = require('./router/conversion')
const message = require('./router/message')
const database = require('./database');
const  Socket  = require('socket.io');
const path = require('path');
const multer = require("multer");
const cors = require('cors')

app.use(cors({
  origin: '*'
}))


app.use("/images", express.static(path.join(__dirname, "/images")))
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
app.post("/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File Has Been Upload");
});

i18next.use(Backend).use(middleware.LanguageDetector).init({

  fallbackLng: 'en',
  backend: {
    loaPath: './locals/{{lng}}/transaltion.json'
  }


})



app.use(middleware.handle(i18next))
app.use(express.json());

io.on('connection', Socket => {

  Socket.on('message', ({ name, message }) => {


    io.emit('message', ({ nmae, message }))
  })



})
app.use('/users', users)
app.use('/auth', auth)
app.use('/Products', Product)
app.use('/Cart', Cart)
app.use('/Order', Order)
app.use('/project', Project)
app.use('/Category', Category)
app.use('/conversion', conversion)
app.use('/message', message)



app.listen(5000, () => {
  console.log('BackEnd Server Is Running Work In Port : 5000')
})

