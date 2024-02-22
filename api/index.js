import dotenv from 'dotenv'
import connectDB from './db/index.js';
import { app } from './app.js';

dotenv.config({
    path: './.env'
});

connectDB().then(() =>{
    
    app.listen(3000, () =>{
        console.log(`Server is Running`)
    })

}).catch((err)=>{
    console.log("Failed connection to DB")
})



