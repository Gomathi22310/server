// test2
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

getConnection = () => {
	const connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: 'root',
                database: 'onlinelibrarysystem'
        });
	return connection;

}

app.get('/book', (req, res) => {
	const params = req.query;
	console.log(params);
	// create the connection to database
	const connection = getConnection();
	const query = connection.query('SELECT b.Id, b.BookNo, b.Edition, b.Title, b.Author, b.ISBN, r.StartDate, r.Duration, case when r.Book_Id is null then date(now()) when r.Book_Id is not null then date_add(r.StartDate, INTERVAL r.Duration DAY) end as AvailableFrom FROM onlinelibrarysystem.book b LEFT JOIN onlinelibrarysystem.reservation r ON b.Id=r.Book_Id WHERE ?? LIKE ?', [params.searchBy, `%${params.searchTerm}%`], function(err, results, fields) {
		if(err) {
			console.log(err);
			res.status(500).json(err);
			return;
		}
		console.log(results);
		res.status(200).json(results);
  	});
	console.log(query.sql);
})

app.post('/book', (req, res) => {
	const data = req.body;
	// create the connection to database
	const connection = getConnection();
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

app.get('/student', (req, res) => {
	const params = req.query;
	console.log(params);
	// create the connection to database
	const connection = getConnection();
	const query = connection.query('SELECT StudentNum, Name, MobileNum, EmailId, AddressLine1, AddressLine2, City, State, Pincode, Country, AlternateMobile  FROM onlinelibrarysystem.student WHERE ?? LIKE ?', [params.searchBy, `%${params.searchTerm}%`], function(err, results, fields) {
		if(err) {
			console.log(err);
			res.status(500).json(err);
			return;
		}
		console.log(results);
		res.status(200).json(results);
  	});
	console.log(query.sql);
})

app.post('/student', (req, res) => {
	const data = req.body;
	// create the connection to database
	const connection = getConnection();
	connection.query('INSERT INTO onlinelibrarysystem.student (StudentNum, Name, MobileNum, EmailId,City,State,Pincode,Country,AddressLine1,AddressLine2,AlternateMobile) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [data.studentNum,data.name, data.mobileNum, data.emailId,data.city,data.state,data.pincode,data.country,data.addressLine1,data.addressLine2,data.alternateMobile], function(err, results, fields) {
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

app.post('/reservation', (req, res) => {
	const data = req.body;
	console.log(data);
	// create the connection to database
	const connection = getConnection();
	connection.query('INSERT INTO onlinelibrarysystem.reservation (StartDate, Duration, Status, Book_Id, Student_Id) VALUES (?, ?, ?, ?, ?)', [data.startDate,data.duration, 'RESERVED', data.bookId, data.studentId], function(err, results, fields) {
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
