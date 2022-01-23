const express = require('express');
var mongoose = require('mongoose');
const User = require('./models/User');
const UserRoutes = require('./routes/user.api');

mongoose.connect('mongodb://localhost/test').then(()=>console.log('connect to mongo'));

const app = express();

app.use(express.json());

app.listen(4000,()=>console.log('server running on 4000'))

app.use('/auth', UserRoutes)

