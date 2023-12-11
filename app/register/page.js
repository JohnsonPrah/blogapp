"use client"

import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const RegisterPage = () => {
  const [data,setData] = useState(
    {
        username : "",
        email: "",
        password: ""
    }
)

const router = useRouter()

const registerUser = async(e) => {
    e.preventDefault()
   let res = await axios.post('/api/register',
   {
    body :JSON.stringify({...data})
   }
   )

   if(res.ok){
    router.push('/login')
   }
    
console.log(data)
}

return (
<div className='py-[10rem] w-full'>
   
    <div className='max-w-[500px] px-4 mx-auto flex flex-col items-center justify-center'>
        <div className='w-full mx-auto'>
            <form onSubmit={registerUser} className='w-full border rounded-sm flex flex-col items-center justify-center px-2 py-3 gap-3 shadow-lg shadow-gray-500'>
                <h1 className='text-center font-bold text-xl sm:text-3xl uppercase'>
                    register 
                </h1>
                <div className='flex flex-col w-full'>
                    <label htmlFor="username" className='capitalize font-semibold'>username</label>
                    <input id='username' type="text" name='username' value={data.username} onChange={ e => setData({...data, username :e.target.value})}  className='border outline-none border-gray-300 rounded-sm px-[.3rem] py-[.3rem] text-gray-700 bg-gray-100'/>
                </div>

                <div className='flex flex-col w-full'>
                    <label htmlFor="email" className='capitalize font-semibold'>email</label>
                    <input id='email' type="email" name='email' value={data.email}  onChange={ e => setData({...data, email:e.target.value})}  className='border outline-none border-gray-300 rounded-sm px-[.3rem] py-[.3rem] text-gray-700 bg-gray-100'/>
                </div>

                <div className='flex flex-col w-full'>
                    <label htmlFor="password " className='capitalize font-semibold'>Password </label>
                    <input id='password ' type="password" name='password' value={data.password} onChange={ e => setData({...data, password:e.target.value})}  className='border outline-none border-gray-300 rounded-sm px-[.3rem] py-[.3rem] text-gray-700 bg-gray-100'/>
                </div>

                <button type='submit' className='py-[.4rem] rounded-sm font-semibold bg-blue-500 w-full uppercase '>submit</button>

            </form>
        </div> 
    </div>

</div>
)
}

export default RegisterPage