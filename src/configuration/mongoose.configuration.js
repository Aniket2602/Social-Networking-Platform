import mongoose from "mongoose";

const url = process.env.DB_URL;

const connectUsingMongoose = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB using mongoose is connected.");
  } catch (error) {
    console.log(error);
  }
};

export default connectUsingMongoose;
