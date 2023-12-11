
import { connectDB } from "../../../utils/connectDb"
import User from "../../../models/userSchema";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"


export const POST = async(req)=>{
  
    const { username,email,password:pass } = await req.json()

    try {

        if(!username || !email || !password ){
            return NextResponse.json({message:"Please enter all credentials"},{status:500})
        }

        await connectDB()

        const userExist = await User.findOne({email})

        if(userExist){
            return NextResponse.json({message:"User already exist with this email"},{status:500})
        }

        const newUser = new User({email,username,password:pass})

        await newUser.save()

        const {password, ...user} = newUser._doc

       // const token = jwt.sign(user,process.env.NEXTAUTH_SECRET,{expiresIn:"3d"})
        console.log(user)
        return NextResponse.json({message:"User successfully created",user},{status:201})

    } catch (error) {
        return NextResponse.json({message:"Failed to register,something went wrong"} ,{status:500})
        console.log(error)
    }

}