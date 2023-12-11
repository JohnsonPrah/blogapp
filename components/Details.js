'use client'

import React, { useState,useEffect } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { BsFillPencilFill } from 'react-icons/bs'
import { AiFillDelete } from 'react-icons/ai'
import PostComment from '@/components/PostComment'
import { toast } from 'react-hot-toast'


const Details = ({post}) => {

    const [comment,setComment] = useState('')
    const { data:session } = useSession()
    const router = useRouter()

    const deletePost = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/post/${post._id}`,{
             //   cache: 'no-store',
                headers : {
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${session?.user?.accessToken}`
                },
                method : 'DELETE',
                 
            })

            if(res.ok){
                toast.success('Blog successfully deleted')
                router.push('/')
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    const handleComment = async(e) => {
        e.preventDefault()

        if(!session){
            toast.error('You must be logged in to make a comment ')
            router.push('/login')
        }

        try {
            const res = await fetch(`http://localhost:3000/api/post/${post._id}/review`,{
                headers : {
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${session?.user?.accessToken}`
                },
                method : 'POST',
                body : JSON.stringify({comment})
                
            })

            if(res.ok){
                setComment('')
                router.refresh()  
            }
            
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <section className="w-full">
    <div className="max-w-[1220px] px-4 py-[7rem] mx-auto ">
        <div className=" flex flex-col max-w-screen-sm m-auto">
            <h2 className="sm:text-3xl text-xl title-font font-medium text-gray-900 mt-4 mb-3 text-center">{post?.title}</h2>
            <p className="leading-relaxed mb-8">
                    {post?.description}
            </p>
            <div className='place-self-end'>
                  <h2 className='text-right text-gray-400 mb-2'>Post By: <span className='text-gray-600 capitalize'> {post?.author?.username}</span></h2>
            </div>

            <div className="flex items-center justify-center gap-x-5 pt-4 pb-5">
                    { 
                      post?.author?._id === session?.user?.id
                        && (
                            <div className='flex items-center justify-end gap-3'>
                                <Link href={`/post/${post._id}/edit`} className="text-black flex flex-col items-center justify-center hover:text-green-700 duration-300 ease-in transition-all p-2 hover:border-green-700 rounded-sm">
                                    Edit <BsFillPencilFill />
                                </Link>
                                <button onClick={deletePost} className='text-black flex flex-col items-center justify-center hover:text-red-700 duration-300 ease-in transition-all p-2 hover:border-red-700 rounded-sm'>
                                    Delete < AiFillDelete />
                                </button>
                            </div>
                      )
                    }

            </div>

              <form onSubmit={handleComment} className='flex flex-col gap-2'>
                  
                    <div className='flex flex-col gap-1 '>
                        <label htmlFor="rep" className='text-xl text-gray-800 uppercase'>
                              comment 
                        </label>
                        <input 
                            id='rep' 
                            type="text" 
                            value={comment}
                            onChange={ e => setComment(e.target.value)} 
                            className='outline-none p-2 border-[0.5px] border-gray-200 focus-within:border-yellow-200 bg-transparent'
                        />
                        <button type='submit' className='capitalize place-self-left w-[6rem] border-[1px] border-yellow-800 p-1 rounded-sm font-semibold text-base sm:text-xl hover:bg-white text-yellow-800 hover:text-yellow-600 hover:border-yellow-600 duration-300 ease-in transition-all'>
                            submit
                        </button>
                    </div>

              </form>

              <div className='w-full h-[1px] bg-slate-300 mt-10 mb-10'></div>

             {
                    post?.comments && (
                        <div className='flex justify-center flex-col items-center gap-2 w-full'>
                            {
                                (post?.comments?.reverse()).map(com => 
                                    <PostComment key={com._id.toString()} com={com} tok={session?.user?.id} post={post}/>
                                )
                            }
                        </div>
                    )
            }
        </div>
    </div>
</section>
  )
}

export default Details