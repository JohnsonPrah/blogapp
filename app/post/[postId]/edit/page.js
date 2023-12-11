"use client"

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useState,useEffect} from 'react'
import { toast } from 'react-hot-toast'

const EditPage = ({params:{postId}}) => {

    const {data : session} = useSession()
    const router = useRouter()

    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`http://localhost:3000/api/post/${postId}`,{
                method : 'GET',
            })

            if(!res.ok){
                throw new Error("Error occured")
            }

            const post = await res.json()

            setTitle(post?.title)
            setDescription(post?.description)

        }

        fetchData()
    },[postId])

    const handleEdit = async(e) => {

        e.preventDefault()
        
        try {
            const res = await fetch(`http://localhost:3000/api/post/${postId}`,{
                headers : {
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${session?.user?.accessToken}`
                },
                method :'PUT',
                body :JSON.stringify({title,description}) 
            })
    
            if(res.ok){
                router.push(`/post/${postId}`)
                toast.success('Blog successfully updated')
            }
           
            const post = await res.json()
            
        } catch (error) {
            console.log(error)
        }
        
    }

  return (

    <div className='py-[10rem] w-full'>
        <div className='max-w-[900px] px-4 mx-auto flex flex-col items-center justify-center'>
             <div className='w-full mx-auto'>
                <form onSubmit={handleEdit} className='w-full border rounded-sm flex flex-col items-center justify-center px-4 py-5 gap-3 shadow-lg shadow-gray-500'>
                    <h1 className='text-center font-bold text-xl sm:text-3xl'>EDIT BLOG</h1>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="title" className='capitalize font-semibold'>title</label>
                        <input id='title' type="text" value={title} onChange={ e => setTitle(e.target.value) } placeholder={title} className='border outline-none border-gray-300 rounded-sm px-[.3rem] py-[.3rem] text-gray-700 bg-gray-100'/>
                    </div>

                    <div className='flex flex-col w-full'>
                        <label htmlFor="description" className='capitalize font-semibold'>description </label>
                        <input id='description ' type="description"  value={description }  onChange={ e => setDescription(e.target.value)} placeholder={description} className='border outline-none border-gray-300 rounded-sm px-[.3rem] py-[.3rem] text-gray-700 bg-gray-100'/>
                    </div>

                    <button type='submit'  className='py-[.4rem] rounded-sm font-semibold bg-blue-500 min-w-[80px] mx-auto uppercase'>submit</button>
                </form>
            </div>
        </div>
    </div>

)

}


export default EditPage