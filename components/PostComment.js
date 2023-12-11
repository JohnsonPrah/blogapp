import React,{useEffect,useState} from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { AiFillDelete } from 'react-icons/ai'

const PostComment = ({com,tok,post}) => {

  const [comm,setComm] = useState({})
  const router = useRouter()
  const { data:session } = useSession()

  useEffect(()=>{

    const getData = async (pId,rId) => {
        const res = await fetch(`http://localhost:3000/api/post/${pId}/review/${rId}`,{cache: 'no-store'})
            let data = await res.json()

            if(!res.ok){
                throw new Error("Error occured")
            }
            setComm(data)
    }

    getData(post._id.toString(),com._id.toString())

},[post._id,com._id])


  const delComment = async() => {
    try {
      const res = await fetch(`http://localhost:3000/api/post/${post._id}/review/${com._id}`,{
          headers : {
              "Content-Type":"application/json",
              "Authorization": `Bearer ${session?.user?.accessToken}`
          },
          method : 'DELETE'
      })

      if(!res.ok){
          throw new Error("Error occured")
      }
  
      router.refresh()
      
  } catch (error) {
     console.log(error)
  }
  }

  return (
    <div className='bg-gray-50 p-2 rounded-sm w-full'>  
        <p className='text-blue-700'>
           {comm?.comment}
        </p>

        <div className='flex items-center gap-3 justify-end'>
            <h1 className='text-gray-300'>
                Comment By : <span className='text-yellow-700 capitalize'>{comm?.author?.username}</span>
            </h1>
            {
              tok === comm?.author?._id && (<button type='button' onClick={delComment} className='p-2 rounded-full bg-gray-200 hover:bg-gray-300 duration-300 transition-all ease-in'>
                < AiFillDelete className='text-red-700 text-lg' /> 
              </button>)
            }
        </div>
  
    </div>
  )
}

export default PostComment