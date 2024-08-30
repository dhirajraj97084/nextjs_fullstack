import mongoose from "mongoose";

const dbToConnect=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL!);
        console.log("***your database connection successfully connect***");
       
    } catch (error) {
       console.log('your database connection is failed'); 
    }
}

export default dbToConnect;