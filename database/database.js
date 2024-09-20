// import mongoose from "mongoose";

// const MongoD_URL =  "mongodb://localhost:27017"

// mongoose.connect(MongoD_URL)

// const db = mongoose.connection;

// db.on('connected',()=>{
//     console.log("connected to mongoDB server");

// })
// db.on('disconnected',()=>{
//     console.log("disconnected ");
// })
// db.on('error',(err)=>{
//     console.log("error in db connection",err);
// })

// export default db

import mongoose from "mongoose";

// Declare the MongoDB URI and database name
const MONGODB_URI = "mongodb://localhost:27017";
const DB_NAME = "hotels";

const connectDB = async () => {
  try {

    const connectionInstance = await mongoose.connect(`${MONGODB_URI}/${DB_NAME}`);

    // Log successful connection
    console.log(`\nMongoDB connected !! DB HOST : ${connectionInstance.connection.host}`);
  } catch (error) {

    console.log("Error in connectDB: ", error);
    // process.exit(1); // Exit the process with failure
  }
};

export default connectDB;
