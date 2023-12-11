import { NextResponse } from "next/server";
import { connectDB } from "@/utils/connectDb";
import Blog from "@/models/blogSchema"
import jwt from "jsonwebtoken"


export async function GET(req,{params}){
    try {
        const {postId} = params

        await connectDB()
        const post = await Blog.findById(postId).populate("comments").populate('author')
        if(!post){
            return NextResponse.json({message : "Post with this id couldn't be found "},{status:200})
        }
    
        return NextResponse.json(post,{status:200})
    } catch (error) {
        return NextResponse.json({message : 'Failed to get this post'},{status:500})
    }
 }

 export async function PUT(req,{params}){
    try {

        const accessToken = req.headers.get('authorization')
        const token = accessToken.split(' ')[1]
        const verifyToken = jwt.verify(token,process.env.NEXTAUTH_SECRET)
    
        if(!accessToken || !verifyToken){
            return NextResponse.json("You aren't authorized",{status:500})
        }
    
        const {postId} = params
        const { title,description } = await req.json()

        await connectDB()

        let post = await Blog.findById(postId)

        if(!post){
            return NextResponse.json({message : "Post with this id couldn't be found "},{status:200})
        }

        if(post.author._id.toString() !== verifyToken._id.toString()){
            return NextResponse.json({message : "You are not authorized to edit this Blog"},{status:200})
        }

        post = await Blog.findByIdAndUpdate(postId,{title:title || post.title ,description :description || post.description},{ new : true,runValidators : true })
    
        return NextResponse.json(post,{status:200})
    } catch (error) {
        return NextResponse.json({message:'Failed to update this post'},{status:500})
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
        const {postId} = params
        
        await connectDB()

        let post = await Blog.findById(postId)

        if(!post){
            return NextResponse.json({message : "Post with this id couldn't be found "},{status:200})
        }

        if(post.author._id.toString() !== verifyToken._id.toString()){
            return NextResponse.json({message : "You are not authorized to delete this Blog"},{status:200})
        }

        post = await Blog.findByIdAndDelete(postId)
    
        return NextResponse.json({message:"Blog successfully deleted"},{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:'Failed to deleted this post'},{status:500})
    }
 }