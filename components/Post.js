import Link from 'next/link'
import React from 'react'

const Post = ({post}) => {
  return (

    <Link href={`/post/${post._id}`}>
        <section className="bg-gray-50 hover:border-gray-100 text-gray-600 body-font overflow-hidden w-full px-2 " >
            <div className="w-full">
                  <h2 className="sm:text-3xl text-2xl title-font font-medium text-gray-900 mt-4 mb-4 text-center uppercase">
                     {post?.title}
                  </h2>
                  <p className="leading-relaxed mb-8 capitalize">
                      {post?.description.substring(0,150)} ...
                  </p>
                  <div className="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-gray-100 mt-auto w-full">
                    <Link href={`/post/${post._id}`} className="text-indigo-500 inline-flex items-center">
                        See More
                    </Link>
                   </div>
                  <a className="inline-flex items-center">
                    <span className="flex-grow flex flex-col pl-4">
                      <span className="title-font font-medium text-gray-900 capitalize">
                        Author: {post?.author?.username}
                      </span>
                    </span>
                  </a>
            </div>
        </section>
    </Link>
    
  )
}

export default Post