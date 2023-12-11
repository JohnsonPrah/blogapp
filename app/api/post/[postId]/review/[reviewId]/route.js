import Review from "@/models/reviewSchema"
import Blog from "@/models/blogSchema"
import { NextResponse } from "next/server";
import { connectDB } from "@/utils/connectDb";
import jwt from 'jsonwebtoken'

export async function GET(req,{params}){

    const {reviewId} =  params

    try {
        
        await connectDB()

        let review = await Review.findById(reviewId).populate('author')
        
        return NextResponse.json(review,{status:200})

    } catch (error) {
        return NextResponse.json({message : "Failed to deleted comment "},{status:500})

    }
}

export async function DELETE(req,{params}){

    const accessToken = req.headers.get('authorization')
    const token = accessToken.split(' ')[1]
    const verifyToken = jwt.verify(token,process.env.NEXTAUTH_SECRET)

    if(!accessToken || !verifyToken){
        return NextResponse.json("You aren't authorized",{status:500})
    }

try {
    const {postId,reviewId} =  params

    await connectDB()

    let review = await Review.findById(reviewId).populate('author')
    
    if(!review){
        return NextResponse.json({message : "Comment couldnt be found "},{status:500})
    }

    if(review.author._id.toString() !== verifyToken._id.toString()){
        return NextResponse.json({message : "You are not authorized to delete this comment"},{status:500})
    }

    await Review.findByIdAndDelete(reviewId)
    await Blog.findByIdAndUpdate(postId,{$pull:{comments:reviewId}},{new:true,revalidate:true})

    return NextResponse.json({message : "Comment successfully deleted"},{status:200})

} catch (error) {
    return NextResponse.json({message : "Failed to deleted comment "},{status:500})

}
}