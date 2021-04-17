const express = require('express');
const mongoose = require('mongoose');

const db = require('./config/config').get(process.env.NODE_ENV);

//roures
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

const app = express();


app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'localhost:3000');
	res.header('Access-Control-Allow-Credentials', true);
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With,auth, Content-Type,Access-Control-Allow-Origin,withcredentials, Accept, Authorization'
	);
	if (req.method === 'OPTIONS') {
		req.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	}
	next();
});


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
app.listen(process.env.PORT || PORT, () => {
	console.log(`Server Running on Port ${PORT}`);
});
