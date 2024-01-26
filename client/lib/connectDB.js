import mongoose from "mongoose";


const connectDB = async () => {
    if(mongoose.connections[0].readyState){
        console.log("Already connected.");
        return;
    }  
    
    mongoose.connect(process.env.MONGO_DB_URI, {}, (err) => {
        if(err) throw err;
        console.log("Connected to MongoDB.");
    });
};


export default connectDB;