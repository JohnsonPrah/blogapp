import mongoose from "mongoose";
import Review from "./reviewSchema"


const blogSchema = new mongoose.Schema({
    author: {
        type : mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    title : {
        type : String,
        required : true,
    },
    description:{
        type:String,
        required:true
    },
    images:[{
        public_id : {type:String},
        url : {type:String},
    }],
    comments:[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref:"Review"
        }
    ]
},
{timestamps:true}
)

blogSchema.post('findOneAndDelete',async(docs)=>{
    if(docs){
        await Review.deleteMany({
            _id: {
                $in :docs.comments
            }
        })
    }
})


export default mongoose.models.Blog || mongoose.model('Blog',blogSchema)