import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer;

beforeAll(async () => {
	mongoServer = await MongoMemoryServer.create();
	const mongoUri = mongoServer.getUri();
	await mongoose.connect(mongoUri);
	await mongoose.connection.db.dropDatabase();
});

afterAll(async () => {
	await mongoose.connection.close();
	if (mongoServer) {
		await mongoServer.stop();
	}
});