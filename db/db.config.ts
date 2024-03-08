import mongoose from "mongoose"

const connectDB = async (DB_URI: string): Promise<void> =>
{
    console.log('connecting to the database....')


    //Add your database specific connection logic
    //pass in your uri passed in here
    await mongoose.connect(DB_URI)

    console.log('connected to the database')
}

export default connectDB