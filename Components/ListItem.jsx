import React, { useContext, useState, useEffect } from "react"
import Link from "next/link"

const ListItem = ({ post, selected, refProp }) => {
  if (selected) {
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className='max-w-sm max-h-[70vh] overflow-hidden shadow-lg'>
      <img
        className='max-w-sm max-h-[20vh]'
        src={post.photoUrl ? `${post.photoUrl}` : "/img/location-marker.svg"}
        alt=''
      />
      <div className='px-6 py-4'>
        <header className='flex flex-wrap'>
          <p className='font-bold uppercase text-md max-h-20 overflow-hidden mb-2'>
            {post.title}
          </p>
        </header>
        <div className='flex'>
          <span className=' inline-block bg-lime-50 rounded-full ml-auto px-3 py-1 text-md text-slate-900 mb-1'>
            💸: {post.price}
          </span>
        </div>
        {/* <p className='my-2 p-2 max-h-20 overflow-auto bg-white text-slate-900 text-base'>
          {post.content}
        </p> */}
        <p className='flex my-2 p-2 bg-gray-300 rounded-lg'>
          <img
            src='/img/location-marker.svg'
            className='mt-1 mr-1 w-[25px] h-[25px]'
          />

          {`${post.address.district}, ${post.address.locality},
          ${post.address.province} ${post.address.zipCode}`}
          {/* <b className='text-md'>Address: </b>
          {`${post.address.streetAddress} ${post.address.district} ${post.address.locality} ${post.address.province} ${post.address.country} ${post.address.zipCode}`} */}
        </p>
        <div className='flex'>
          <Link href={`/${post.username}`} className='flex items-center mt-2'>
            <p className=' flex text-sm font-bold text-gray-900 leading-none'>
              <button className='bg-lime-500 hover:bg-lime-400 text-white font-bold py-1 px-2 border-solid border-b-4 border-lime-700 hover:border-lime-500 rounded'>
                @ {post.username}
              </button>
            </p>
          </Link>
          <span className='inline-block bg-gray-200 rounded-full ml-auto p-2 text-sm font-semibold text-gray-700'>
            📞: {post.phone}
          </span>
        </div>
      </div>
      <footer className='mt-auto px-2 pb-2 flex'>
        {/* <Link
            href={`/admin/${post.slug}`}
            className='text-blue-600 underline ml-4 cursor-pointer'
          >
            Edit
          </Link> */}

        <Link
          href={`/${post.username}/${post.slug}`}
          className='text-blue-600 underline ml-auto mr-4 cursor-pointer'
        >
          View detail
        </Link>
      </footer>
    </div>
    // <div className='max-w-sm rounded overflow-hidden shadow-lg'>
    //   <img
    //     className='w-8/12'
    //     src='/img/location-marker.svg'
    //     alt='Sunset in the mountains'
    //   />
    //   <div className='px-6 py-4'>
    //     <div className='w-full flex'>
    //       <h2 className='font-bold text-xl mb-2'>{post.title}</h2>
    //       <p className='text-gray-700 text-base ml-auto'>{post.price} Bath</p>
    //     </div>
    //     <div>
    //       <div className='flex flex-wrap align-center justify-between'>
    //         <img src='/img/location-marker.svg' className='w-[25px] h-[25px]' />
    //         <span className='text-gray-500 text-base'>
    //           {post.address.district}, {post.address.locality},{" "}
    //           {post.address.province} {post.address.zipCode}
    //         </span>
    //       </div>
    //     </div>
    //     <p className='max-h-20 overflow-hidden'>{post.info}</p>
    //   </div>
    //   <div className='flex px-6 pt-4 pb-2'>
    //     <Link href={`/${post.name}`}>
    //       <p className='ml-auto text-blue-700 underline cursor-pointer'>
    //         View details
    //       </p>
    //     </Link>
    //   </div>
    // </div>
  )
}

export default ListItem
