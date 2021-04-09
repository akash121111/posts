const express = require('express');
const mongoose = require('mongoose');

//roures
const userRoutes = require('./routes/user');

const app = express();

app.get('/', (rqe, res) => {
	res.json({ background: '#aa3422', navbar: '#bbbbbb' });
});

app.use('/api', userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server Running on Port ${PORT}`);
});
