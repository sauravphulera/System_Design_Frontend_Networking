const PROTO_PATH = './Customers.proto';

import grpc from "@grpc/grpc-js";
import protoLader from "@grpc/proto-loader";

const packageDefinition = protoLader.loadSync(PROTO_PATH, {
	keepCase: true,
	longs: String,
	enums: String,
	arrays: true,
})

const customerProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

const customers = [
	{
		id: "asdasd",
		name: "Saurav",
		age: 22,
		address: "Banglore"

	}, {
		id: "asdaasdasdsd",
		name: "Chirag",
		age: 26,
		address: "Uttarakhand"
	}
]

server.addService(customerProto.CustomerService.service, {
	getAll: (call, callback) => {
		console.log("reaching")
		// call is simillar to this in js
		// we can do db call here right now it is using local data
		callback(null, { customers })
	},

	get: (call, callback) => {
		let customer = customers.find(n => n.id === call.request.id);

		if (customer) {
			callback(null, customer)
		} else {
			callback({
				code: grpc.status.NOT_FOUND,
				details: "Not Found"
			})
		}

	},
	insert: (call, callback) => {
		let customer = call.request;

		customer.id = Math.random();
		customers.push(customer);

		callback(null, customer)
	},
	update: (call, callback) => {
		let customer = customers.find(n => n.id === call.request.id);
		if (customer) {
			customer.name = call.request.name;
			customer.age = call.request.age;
			customer.address = call.request.address;
			callback(null, customer)
		} else {
			callback({
				code: grpc.status.NOT_FOUND,
				detail: "Customer not founc"
			})
		}
	},
	remove: (call, callback) => {
		let customerInd = customers.findIndex(n => n.id === call.request.id);

		if (customerInd !== -1) {
			customers.splice(customerInd, 1);
			callback(null, {})
		} else {
			callback({
				code: grpc.status.NOT_FOUND,
				detail: "Customer not founc"
			})
		}
	},

})

server.bindAsync("127.0.0.1:30043", grpc.ServerCredentials.createInsecure(), (err, port) => {
	if (err) {
		console.log("Error => " + err);
	} else {
		//server.start();
		console.log('server started on ' + port)
	}
});


