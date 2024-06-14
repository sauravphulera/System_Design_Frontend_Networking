import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json())

const PORT = '5111';

app.all('/', (req, res) => {
	console.log(req);
	console.log(res);
	console.log(req.body);
	res.send(`I am up`)
})

app.listen(PORT, () => {
	console.log(`server is running ats ${PORT}`)
})