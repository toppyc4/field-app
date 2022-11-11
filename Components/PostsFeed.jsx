import Link from "next/link"

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
  return (
    <div className='max-w-sm rounded overflow-hidden shadow-lg'>
      <img
        className='max-w-sm'
        src={post.photoUrl ? `${post.photoUrl}` : "/img/location-marker.svg"}
        alt=''
      />
      <div className='px-6 py-4'>
        <header className='flex flex-wrap'>
          <p className='font-bold uppercase text-lg max-h-20 overflow-hidden mb-2'>
            {post.title}
          </p>
        </header>
        <div className='flex'>
          <span className='inline-block bg-lime-50 rounded-full ml-auto px-3 py-1 text-md text-slate-900  mb-2'>
            <b className='text-md font-semiblod'>Price:</b> {post.price}
          </span>
        </div>
        <p className='my-2 p-2 max-h-20 overflow-auto bg-white text-slate-900 text-base'>
          {post.content}
        </p>
        <p className='my-2 p-2 bg-gray-300 rounded-lg'>
          <b className='text-md'>Address: </b>
          {`${post.address.streetAddress1 || ""} ${
            post.address.streetAddress2 || ""
          } ${post.address.district} ${post.address.locality} ${
            post.address.province
          } ${post.address.country} ${post.address.zipCode}`}
        </p>
        <Link href={`/${post.username}`} class='flex items-center mt-2'>
          <p className='text-sm font-bold text-gray-900 leading-none'>
            By @ {post.username}
          </p>
        </Link>
      </div>
      <footer className='mt-auto px-6 pt-3 pb-2 flex'>
        <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
          phone: {post.phone}
        </span>
        <Link
          href={`/${post.username}/${post.slug}`}
          className='text-blue-600 underline ml-auto cursor-pointer'
        >
          View detail
        </Link>
        {admin && (
          <Link
            href={`/admin/${post.slug}`}
            className='text-blue-600 underline ml-auto cursor-pointer'
          >
            Edit
          </Link>
        )}
      </footer>
    </div>
  )
}
