'use client'
import React from 'react'
import Image from 'next/image'
import blog from '@/public/blog.jpg'
import Link from 'next/link'
import { signIn } from 'next-auth/react'

export default function Home() {

  return (
    <div className='w-full h-[100vh] mt-[5rem] bg-blog bg-cover flex items-center justify-center '>
      <button onClick={()=>signIn()} className=' hover:border-orange-500 duration-300 ease-in transition-all px-4 border-[1px] border-orange-300 rounded-sm text-orange-500 text-2xl py-2'>
         See all blogs...
      </button>
    </div>
  )
}
