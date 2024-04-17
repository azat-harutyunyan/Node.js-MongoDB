const Book = require('../db')

const books_get = (req, res) => {
	Book.find().then(books => {
		res.render('books/index', { title: 'All Books', books })
	})
}

const book_get = (req, res) => {
	const id = req.params.id;
	Book.findById(id)
		.then((book) => {
			res.render('books/single', { title: book.title, book })
		})
		.catch((err) => {
			console.log(err);
			res.status(404).render('404', { title: '404' })
		})
}

const book_create_get = (req, res) => {
	res.render('books/create', { title: "Add a new Book", book: undefined })
}

const book_create_post = (req, res) => {
	const body = {
		title: req.body.title,
		author: req.body.author,
		publishedDate: {
			$date: req.body.date,
		},
		genre: req.body.genre.split(', '),
		rating: +req.body.rating,
	}

	const book = new Book(body)
	book.save()
		.then(() => {
			res.redirect('/books');
		})
		.catch((err) => {
			console.log(err)
		})
}

const book_delete = (req, res) => {
	const id = req.params.id;

	Book.findByIdAndDelete(id)
		.then(result => {
			res.json({ redirect: '/books' });
		})
		.catch(err => {
			console.log(err);
		});
}

const book_update_get = (req, res) => {
	const id = req.params.id;
	Book.findById(id)
		.then((book) => {
			res.render('books/create', { title: "Update " + book.title, book })
		})
		.catch((err) => {
			console.log(err);
			res.status(404).render('404', { title: '404' })
		})
}

const book_update = (req, res) => {
	const id = req.params.id;

	const updatedBook = {
		title: req.body.title,
		author: req.body.author,
		publishedDate: req.body.date,
		genre: req.body.genre.split(','),
		rating: +req.body.rating,
	}

	const book = new Book(updatedBook)
	Book.findOneAndUpdate({ _id: id }, updatedBook,)
		.then(() => {
			res.redirect('/books');
		})
		.catch((err) => {
			console.log(err)
		})
}

module.exports = {
	books_get,
	book_get,
	book_create_get,
	book_create_post,
	book_delete,
	book_update_get,
	book_update,
}