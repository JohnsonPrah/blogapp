import mongoose from "mongoose"


export const connectDB = async() => {
    if(mongoose.connection >= 1 ){
        return
    }

    try {
       await mongoose.connect(process.env.DB_URL)
    }
     catch (error) {
        console.log("database connecton faled",error)
    }

}