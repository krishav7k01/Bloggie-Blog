import mongoose from "mongoose";

const connectDB = async () =>{

    try{
        const connectioninstance = await mongoose.connect(process.env.MONGO_URL)
        console.log(`/n MONGO DB Connected !! `)
    }
    catch(err){

        console.log("Mongo DB Connection Failed", err)
        process.exit(1)
    }
}
export default connectDB