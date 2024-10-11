import mongoose from "mongoose";

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNXTION_STRING)
    } catch (error) {
        console.log(error)
    }
}
export default connectToDatabase;