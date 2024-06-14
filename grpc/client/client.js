const PROTO_PATH = './Customers.proto';

import grpc from "@grpc/grpc-js";
import protoLader from "@grpc/proto-loader";

const packageDefinition = protoLader.loadSync(PROTO_PATH, {
	keepCase: true,
	longs: String,
	enums: String,
	arrays: true,
})

const CustomerService = grpc.loadPackageDefinition(packageDefinition).CustomerService;

const client = new CustomerService(
	"127.0.0.1:30043",
	grpc.credentials.createInsecure()
)

export default client;