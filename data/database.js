import mongoose from "mongoose";

export const connectDB = ()=>{
    mongoose
.connect(process.env.MONGO_URI, {
    dbName: "backendAPI",
})
.then((c) => console.log(`Database Connected is connected to ${c.connection.host}`))
.catch((e) => console.log(e));

}