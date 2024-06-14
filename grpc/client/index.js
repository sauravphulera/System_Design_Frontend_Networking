
import bodyParser from "body-parser";

import client from "./client.js";

import express from 'express';



const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//expose rest calls which will internally call grpc server
app.get("/", (req, res) => {
	client.getAll(null, (err, data) => {
		console.log(data)
		res.send(data);
	})
})
app.post("/create", (req, res) => {
	const { name, age, address } = req.body;

	const newCustomer = {
		name,
		age,
		address
	}
	client.insert(newCustomer, (err, data) => {
		if (err) throw err;
		console.log("Customer created");
		res.send({ message: "Customer Created Successfully" })
	})
})
app.put("/update", (req, res) => {
	const { name, age, address, id } = req.body;

	const updatedCustomer = {
		name,
		age,
		address,
		id
	}
	client.update(updatedCustomer, (err, data) => {
		if (err) throw err;
		console.log("Customer updated successfully");

		res.send({ message: "Updated" })
	})

})
app.delete("/remove", (req, res) => {
	client.remove(req.body.id, (err, data) => {
		if (err) throw err;
		console.log("Customer Deleted successfully");

		res.send({ message: "Deleted" })
	})
})



const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
	console.log("server running at " + PORT)
})