// test
const express = require('express')
const path = require('path');
const mysql = require('mysql2');
const qs = require('qs');

const app = express()
const port = 3000
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');
app.use(express.static('./public'))

app.get('/', (req, res) => {
	res.render('home');
})

app.post('/book', (req, res) => {
	const data = qs.parse(req.body);
	// create the connection to database
	const connection = mysql.createConnection({
		host: 'localhost',
  		user: 'root',
		password: 'root',
		database: 'onlinelibrarysystem'
	});
	connection.query('INSERT INTO onlinelibrarysystem.book (BookNo, Edition, Title, Author, ISBN) VALUES (?, ?, ?, ?, ?)', [data.bookNo, data.edition, data.title, data.author, data.isbn], function(err, results, fields) {
	if(err) {
		res.status(500).send(err);
		return;
	}
	console.log(results); // results contains rows returned by server
	console.log(fields); // fields contains extra meta data about results, if available
	res.status(200).send('Book created');
  });

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
