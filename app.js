// test
const express = require('express')
const path = require('path');
const mysql = require('mysql2');

const app = express()
const port = 3000
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');
app.use(express.static('./public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.render('home');
})

app.post('/book', (req, res) => {
	const data = req.body;
	// create the connection to database
	const connection = mysql.createConnection({
		host: 'localhost',
  		user: 'root',
		password: 'root',
		database: 'onlinelibrarysystem'
	});
	connection.query('INSERT INTO onlinelibrarysystem.book (BookNo, Edition, Title, Author, ISBN) VALUES (?, ?, ?, ?, ?)', [data.bookNo, data.edition, data.title, data.author, data.isbn], function(err, results, fields) {
	if(err) {
		console.log(err);
		res.status(500).json(err);
		return;
	}
	console.log(results.insertId);
	const id = results.insertId
	res.status(200).json({id: id});
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
