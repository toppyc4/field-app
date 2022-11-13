import Link from "next/link"
import ReactMarkdown from "react-markdown"

export default function PostsFeed({ posts, admin }) {
  return (
    <div className='my-8'>
      <h1 className='text-2xl font-bold my-2 underline'>Posts Feed</h1>
      <div className='grid grid-cols-3 gap-4'>
        {posts
          ? posts.map((post) => (
              <PostItem post={post} key={post.slug} admin={admin} />
            ))
          : null}
        {posts.length === 0 && (
          <p className=''>This user haven't post anything . . .</p>
        )}
      </div>
    </div>
  )
}

function PostItem({ post, admin }) {
  console.log("post", post)
  return (
    <div className='max-w-sm rounded overflow-hidden shadow-lg'>
      <img
        className='max-w-sm max-h-lg'
        src={post.photoUrl ? `${post.photoUrl}` : "/img/Field 2.png"}
        alt=''
      />
      <div className='flex flex-col'>
        <div className='px-6 py-4'>
          <header className='flex flex-wrap'>
            <p className='font-bold text-xl max-h-20 overflow-auto mb-2'>
              {post.title}
            </p>
          </header>
          <div className='flex'>
            <span className='inline-block bg-lime-50 rounded-full ml-auto px-3 py-1 text-md text-slate-900  mb-2'>
              <b className='text-md font-semiblod'>Price:</b> {post.price}
            </span>
          </div>
          <ReactMarkdown className='my-2 p-2 max-h-36 overflow-auto bg-white text-slate-900 text-base'>
            {post.content}
          </ReactMarkdown>
          <div className='flex my-2 p-2 bg-gray-300 rounded-lg'>
            <img
              src='/img/location-marker.svg'
              className='m-1 w-[25px] h-[25px]'
            />
            <p>
              <b className='text-md'>Address: </b>
              {`${post.address.streetAddress1 || ""} ${
                post.address.streetAddress2 || ""
              } ${post.address.district} ${post.address.locality} ${
                post.address.province
              } ${post.address.country} ${post.address.zipCode}`}
            </p>
          </div>
          <div className='flex content-center items-center justify-center'>
            <Link href={`/${post.username}`} class='flex items-center mt-2'>
              <p className='bg-lime-500 hover:bg-lime-400 text-white font-bold py-1 px-2 border-solid border-b-4 border-lime-700 hover:border-lime-500 rounded'>
                @ {post.username}
              </p>
            </Link>
            <span className='inline-block bg-gray-200 rounded-full ml-auto p-2 text-sm font-semibold text-gray-700 mr-2 mb-2'>
              phone: {post.phone}
            </span>
          </div>
        </div>
        <footer className='mt-auto mb-1 px-6 pt-3 pb-2 flex'>
          {admin && (
            <Link
              href={`/admin/${post.slug}`}
              className='text-blue-600 underline  cursor-pointer'
            >
              Edit
            </Link>
          )}
          <Link
            href={`/${post.username}/${post.slug}`}
            className='text-blue-600 underline ml-auto cursor-pointer'
          >
            View detail
          </Link>
        </footer>
      </div>
    </div>
  )
}
