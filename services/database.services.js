import mongoose from "mongoose";
import { config } from "dotenv";

config();

class DatabaseService {
  constructor() {
    this.uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@midtest.zux4gwa.mongodb.net/?retryWrites=true&w=majority&appName=MidTest`;
  }
  async connect() {
    try {
      await mongoose.connect(this.uri);
      console.log(`MongoDB connect successfully`);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

const databaseService = new DatabaseService();

export default databaseService;
