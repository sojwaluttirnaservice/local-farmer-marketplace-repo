require('dotenv').config({ path: './bin/.env' });
const express = require('express');
const path = require('path');
const session = require('express-session');

const cookieParser = require('cookie-parser');
const upload = require('express-fileupload');


const cors = require('cors');

const logger = require('morgan');



const indexRouter = require('./routes/indexRouter');
const { createFileDirectories } = require('./application/utils/files/createDirectories');

const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,

  // cookie: {
  //   secure: process.env.NODE_ENV == "PROD",
  //   httpOnly: true,
  //   maxAge: 24 * 60 * 60 * 1000 // 24 hours
  // }
}));

app.use(cors())

// app.use(cors(
//   {
//   //   origin: process.env.FRONTEND_URL,
//     // credentials: true,
//   //   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   //   allowedHeaders: ['Content-Type', 'Authorization']
//   }
// ));

app.use(upload());


// view engine setup
app.set('views', path.join(__dirname, 'application/views/pages'));
app.set('view engine', 'ejs');


app.use(function (req, res, next) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
});

app.use(logger('dev'));
app.use(express.json({ limit: '1024mb' }));
app.use(express.urlencoded({ extended: true, limit: '1024mb' }));
app.use(cookieParser());

// ✅ Serve all static files correctly
app.use(express.static(path.join(__dirname, 'public')));



// // ✅ Ensure MP4 files get the correct MIME type
// app.use(
//   '/assets/videos',
//   express.static(path.join(__dirname, 'public/assets/vidoes'), {
//     setHeaders: (res, path) => {
//       if (path.endsWith('.mp4')) {
//         res.setHeader('Content-Type', 'video/mp4')
//       }
//     }
//   })
// );

// public\assets\videos\home\hero\vegetablemotion.mp4




app.use('/', indexRouter);





app.listen(process.env.PORT, () => {
  createFileDirectories();
  console.log('Server started on port', process.env.PORT);
})





module.exports = app;
