import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import User from '@/models/userSchema'
import { connectDB } from "@/utils/connectDb"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server"



export const authOptions = {
  // Configure one or more authentication providers
  session:{
    strategy:"jwt"
  },
  providers: [
    CredentialsProvider(
        {
            name:"Credentials",
            credentials:{
                email:{label:"email",type:"email"},
                password:{label:"password",type:"password"},
                username: { label: "Username", type: "text", placeholder: "John Smith" }
           
            },
            async authorize(credentials){
                const {email,password} = credentials

                if(!email || !password ){
                  throw new Error('Please enter all credentials')
                }
                  await connectDB()

                  let user = await User.findOne({email})

                  if(!user){
                    throw new Error('User with this password or email does not exist')
                 }

                  const verifyPassword = await bcrypt.compare(password,user.password)

                  if(!verifyPassword){
                    throw new Error('Invalid email or password')
                 }
                 else {
                  const {password, ...newUser} = user._doc
                  const accessToken = jwt.sign(newUser,process.env.NEXTAUTH_SECRET,{expiresIn:"3d"})
                  return NextResponse.json({ message:'Successfully logged in',
                    ...newUser,accessToken
                  })
                 }

            } 

        }
    )
    
  ],

  secret:process.env.NEXTAUTH_SECRET,

  pages: { signIn: '/login' },

  callbacks: {

    jwt({ token, user }) {
      if(user){
        token.id = user._id
        token.accessToken = user.accessToken
        token.name = user.username
      }
      
      return token
    },

     session({ session, token,user }) {
      if(token){
        session.user.id = token.id
        session.user.name = token.name
        session.user.accessToken = token.accessToken
      }
      return session
    },
     

  }

}

const handler = NextAuth(authOptions)

export {handler as GET,handler as POST}

