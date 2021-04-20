const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Color = require('./models/color');

const db = require('./config/config').get(process.env.NODE_ENV);
const bodyparser = require('body-parser');

//roures
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const colorRoutes = require('./routes/color');

const app = express();

app.use(cors());

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use('/api/users', userRoutes);
app.use('/api/posts', userRoutes);
app.use('/api/color', colorRoutes);

// database connection
mongoose.Promise = global.Promise;
mongoose.connect(db.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, function(
	err
) {
	if (err) console.log(err);
	console.log('database is connected');
});

const PORT = 3000;
app.listen(process.env.PORT || PORT, async () => {
	await Color.findById('607addb34517b607e436c26d')
		.then((data) => {
			if (!data || data == null || typeof data == undefined) {
				var vendor = new Color();
				vendor.primary = '#bbbbbb';
				vendor.secondr = '#cccccc';
				vendor.save().then((doc) => console.logs(doc)).catch((err) => console.log(err));
			} else {
			}
		})
		.catch((err) => {});

	console.log(`Server Running on Port ${PORT}`);
});
