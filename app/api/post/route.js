import { NextResponse } from "next/server";
import { connectDB } from "@/utils/connectDb";
import Blog from "@/models/blogSchema"
import jwt from "jsonwebtoken"

export async function GET(req){
try {
    await connectDB()
    const posts = await Blog.find().populate('author')

    return NextResponse.json(posts,{status:200})
} catch (error) {
    return NextResponse.json('No posts found ',{status:500})
}
}

export async function POST(req){

    const accessToken = req.headers.get('authorization')
    const token = accessToken.split(' ')[1]
    const verifyToken = jwt.verify(token,process.env.NEXTAUTH_SECRET)

    if(!accessToken || !verifyToken){
        return NextResponse.json("You aren't authorized",{status:500})
    }

    try {

        const { title,description } = await req.json()

        await connectDB()
        let post = new Blog({title,description})
        
        post.author = verifyToken._id
        await post.save()
    
        return NextResponse.json(post,{status:200})
    } catch (error) {
        return NextResponse.json('Failed to create post',{status:404})
    }
 }