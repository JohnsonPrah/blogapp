import Review from "@/models/reviewSchema"
import { NextResponse } from "next/server";
import { connectDB } from "@/utils/connectDb";
import Blog from "@/models/blogSchema"
import jwt from 'jsonwebtoken'


export async function POST(req,{params}){

    const accessToken = req.headers.get('authorization')
    const token = accessToken.split(' ')[1]
    const verifyToken = jwt.verify(token,process.env.NEXTAUTH_SECRET)

    if(!accessToken || !verifyToken){
        return NextResponse.json("You aren't authorized",{status:500})
    }

try {
    const {postId} = params
    const {comment} = await req.json()

    await connectDB()

    const review = new Review({comment})
    const post = await Blog.findById(postId)

    if(!post){
        return NextResponse.json({message : "Post with this id couldn't be found "},{status:200})
    }

    review.author = verifyToken._id
    post.comments.push(review)

    await post.save()
    await review.save()

    return NextResponse.json({message : "Comment successfully created"},{status:201})
    
} catch (error) {
    return NextResponse.json({message : "Comment successfully created"},{status:201})
    
}
}