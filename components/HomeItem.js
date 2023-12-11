'use client'

import React, { useEffect } from 'react'
import Post from '@/components/Post'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const HomeItem = ({posts}) => {

{/*
      const router = useRouter()
    useEffect(()=>{
      router.refresh()
    },[])
   
*/}


  return (
    <main className="w-full">

    <div className="min-h-screen pt-[10rem] pb-[4rem] px-4 max-w-[1200px] mx-auto flex flex-col items-center justify-between ">
           <div className="flex flex-col ">
               <h1 className="w-full text-4xl font-light text-center text-gray-800 uppercase sm:text-5xl">
                 The Blog Spot
                </h1>
               <h2 className="w-full max-w-2xl py-8 mx-auto text-xl font-light text-center text-gray-500">
                 A Place to come and share your thoughts, ideas, and meet new friends. Have a look around and tell us what you think!
               </h2>
               <div className="flex items-center justify-center mt-4 gap-x-5">
                   <Link href="/" className="border-1 bg-orange-300 border-primary px-2 sm:px-6 py-2 rounded-md text-white font-semibold hover:bg-primary hover:text-white transition-all duration-300">
                       Featured Post
                   </Link>
                   <Link href="/" className="border-1 bg-orange-300 border-primary px-2 sm:px-6 py-2 rounded-md text-white font-semibold hover:bg-primary hover:text-white transition-all duration-300">
                       Our Users
                   </Link>
               </div>
              
           </div>

           {posts?.length > 0 && <h2 className="text-center mt-6 ">The Blog Spot</h2>}
             
             <div className="bg-green-20 max-w-screen-sm mx-auto ">
                 <div className='flex flex-col gap-[1rem] justify-center items-center w-full'>
                   {
                     (posts.reverse()).map(post => 
                       <Post post={post} key={post._id.toString()} />
                     )
                   }
                 </div>
             </div>

    </div>

 </main>
  )
}

export default HomeItem