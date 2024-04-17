const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/task')
	.then(() => console.log('MongoDB Connected'))
	.catch(err => console.log(err));

const bookSchema = new mongoose.Schema({}, { strict: false });
const Book = mongoose.model('Book', bookSchema);
module.exports = Book