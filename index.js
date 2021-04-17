const express = require('express');
const mongoose = require('mongoose');

const db = require('./config/config').get(process.env.NODE_ENV);

//roures
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

const app = express();

app.get('/', (rqe, res) => {
	res.json({ primaryColor: '#aa3422', secondryColor: '#bbbbbb' });
});

app.use('/api/users', userRoutes);
app.use('/api/posts', userRoutes);

// database connection
mongoose.Promise = global.Promise;
mongoose.connect(db.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, function(
	err
) {
	if (err) console.log(err);
	console.log('database is connected');
});

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server Running on Port ${PORT}`);
});
