import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    author:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    comment:{
        type:String,
    }
}
)

export default mongoose.models.Review || mongoose.model('Review',reviewSchema)