"use client"
import React,{ useState,useEffect } from 'react'
import { signIn } from "next-auth/react"
import { useSession } from 'next-auth/react'
import { useRouter } from "next/navigation"
import { useSearchParams } from 'next/navigation'
import { toast } from 'react-hot-toast'


const LoginPage = () => {

    const params = useSearchParams()
    const callBackUrl = params.get("callbackUrl");

    const [data,setData] = useState(
        {
            email: "",
            password: ""
        }
    )

    const parseCallbackUrl = (url) => {
        const res = url.replace(/%3A/g, ":").replace(/%2F/g, "/");
        return res;
      };

    const { data: session, status } = useSession()
    const router = useRouter()

    const loginUser = async(e) => {
        e.preventDefault()
        
try {
    const res = await signIn("credentials",{...data,
      //  redirect:false,
      //  callbackUrl: callBackUrl ? parseCallbackUrl(callBackUrl) : "/post",
    })
    if(res.ok){
        router.push('/post')
        toast.success('Successfully logged in')
    }
    else{
        toast.error('Email or Password incorrect')
    }

    } catch (error) {
        console.log(error)
    }

    }




  return (
    <div className='py-[10rem] w-full'>
        <div className='max-w-[500px] px-4 mx-auto flex flex-col items-center justify-center'>
            <div className='w-full mx-auto'>
                <form onSubmit={loginUser} className='w-full border rounded-sm flex flex-col items-center justify-center px-2 py-3 gap-3 shadow-lg shadow-gray-500'>
                
                    <h1 className='text-center font-bold text-xl sm:text-3xl uppercase'>
                        Sign-In
                    </h1>

                    <div className='flex flex-col w-full'>
                        <label htmlFor="email" className='capitalize font-semibold'>email</label>
                        <input id='email' type="email" name='email' value={data.email}  onChange={ e => setData({...data, email:e.target.value})}  className='border outline-none border-gray-300 rounded-sm px-[.3rem] py-[.3rem] text-gray-700 bg-gray-100'/>
                    </div>

                    <div className='flex flex-col w-full'>
                        <label htmlFor="password " className='capitalize font-semibold'>Password </label>
                        <input id='password ' type="password" name='password' value={data.password} onChange={ e => setData({...data, password:e.target.value})}  className='border outline-none border-gray-300 rounded-sm px-[.3rem] py-[.3rem] text-gray-700 bg-gray-100'/>
                    </div>

                    <button type='submit' className='py-[.4rem] rounded-sm font-semibold bg-blue-500 w-full uppercase '>login</button>
            
                </form>
            </div>
        </div>
    </div>
)

}

export default LoginPage