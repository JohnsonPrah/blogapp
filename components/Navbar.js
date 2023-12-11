"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { signIn, signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import {BiMenu} from "react-icons/bi"
import {AiOutlineClose} from "react-icons/ai"
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

const Navbar = () => {

    const { data: session, status } = useSession()
    const [toggle ,setToggle] = useState(false)
    const router = useRouter() 

    const IN = () => {
       signIn();
       router.push('/post')
    }

    const OUT = () => {
         signOut();
         router.push('/')
         toast.success('Successfully logged out')
    }

  return (
    <div className='bg-gray-50 w-full h-[5rem] shadow-md shadow-gray-400 fixed top-0 z-10'>
        <div className='relative max-w-[1220px] h-full px-4 mx-auto flex justify-between items-center '>
            <Link href="/">
                <Image src="/logo.png" width={100} height={100} alt='logo' className='bg-transparent place-self-center'/>
            </Link>
            
             <div className='flex gap-3'>
             {
                 session?.user ? (
                    <div className='hidden lg:flex items-center justify-center gap-3'>
                        <Link href="/" className='font-semi-bold text-xl text-gray-900'>
                            Home
                        </Link>
                        <Link href="/create-post" className='font-semi-bold text-xl text-gray-900'>
                            Create-Post
                        </Link>
                        <button className='font-semi-bold text-xl text-gray-900' onClick={OUT}>
                            Sign-out
                        </button>
                    </div>
                        
                     ) : (
                        <div className='hidden lg:flex items-center justify-center gap-3'>
                            <button className='font-semi-bold text-xl text-gray-900' onClick={IN}>
                                Sign-in
                            </button>
                            <Link href="/register" className='font-semi-bold text-xl text-gray-900'>
                                Register
                            </Link>
                        </div>
                
                        )
             }
                                     
             </div>
             
             <div className='lg:hidden flex items-center justify-center gap-3'> 
                {
                    toggle ? (<AiOutlineClose size={30} className="text-orange-400" onClick={()=>setToggle(false)} />) :
                    (<BiMenu size={30} className="text-orange-400" onClick={()=>setToggle(true)} />)
                }
             </div>
        </div>  

        {
            toggle && (
                <div className='p-10 flex flex-col justify-center items-center gap-5 bg-orange-400 w-screen h-[calc(100vh-5rem)] top-[5rem] '>
                    <Link href="/" onClick={()=>setToggle(false)} className='font-semi-bold text-xl hover:bg-blue-800 hover:p-2 hover:rounded-full transition-all ease-in duration-300  text-white'>
                        Home 
                    </Link>
                    <button className='font-semi-bold text-xl hover:bg-blue-800 hover:p-2 hover:rounded-full transition-all ease-in duration-300  text-white' onClick={IN} >
                        Sign-in
                    </button>
                    <Link href="/register" className='font-semi-bold text-xl hover:bg-blue-800 hover:p-2 hover:rounded-full transition-all ease-in duration-300  text-white' onClick={()=>setToggle(false)} >
                        Register
                    </Link>
                </div>
            )
        }
    </div>
  )
}

export default Navbar