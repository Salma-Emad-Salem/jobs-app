import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URI);
    console.log("Database connected");
  } catch (error) {
    if (error instanceof ReferenceError) {
      console.log("ReferenceError", error);
    }
    console.log("Error connecting to database", error);
  }
}