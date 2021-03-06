require('dotenv').config()

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Posts = require('./models/posts');

//Connecting to DB
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('DB Connected.'))
.catch(err => console.log(err));

//App Configs
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
app.use(express.json());

//Connecting files for Routes
const postsRoutes = require('./routes/posts');
const indexRoutes = require('./routes/indexRoutes');

//Connecting Routes
app.use('/posts', postsRoutes);
app.use('/', indexRoutes);

app.get('/', (req, res) => {
    Posts.find().sort({ _id:-1 }).limit(10).exec((err, posts) => {
      if (err) throw err;
      res.render('homepage', { posts: posts });
    });
});

app.listen(process.env.PORT, () => console.log('Server has Started.'));
