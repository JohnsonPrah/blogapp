import HomeItem from '@/components/HomeItem'
import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'



export default async function Home() {

  const session = await getServerSession(authOptions)

  const res = await fetch('http://localhost:3000/api/post',{cache:'no-store'})

  const posts = await res.json()


  return (
    <HomeItem posts={posts}/>
  )
}
