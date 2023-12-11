import Details from '@/components/Details'
import React from 'react'

const PostPage = async ({params:{postId}}) => {
  
        const res = await fetch(`http://localhost:3000/api/post/${postId}`,{cache: 'no-store'})
        let post = await res.json()

    return (
            <Details post={post}/>
        )
}

export default PostPage