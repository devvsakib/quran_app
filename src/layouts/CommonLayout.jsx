import React from 'react'

const CommonLayout = ({children}) => {
  return (
    <main className='max-w-[1280px] mx-auto px-5 md:px-10'>{children}</main>
  )
}

export default CommonLayout