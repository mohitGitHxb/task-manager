import Mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const connection = await Mongoose.connect(process.env.MONGODB_URL);
    console.log("db connected...");
    // console.log(connection.connection);
  } catch (error) {
    console.log("Failed to connect to Mongoose ", error);
  }
};
