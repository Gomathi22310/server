const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
	console.log('<html><head><title>Test Server</title></head><body><p>Hello World!!!</p></body></html>')
  res.send('Hello World!ii')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
