"use client"

import React from 'react'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'

const Provider = ({children,session}) => {
  return (
    <SessionProvider session={session}>
      <Toaster position='top-center'/>
      {children}
    </SessionProvider>
  )
}

export default Provider