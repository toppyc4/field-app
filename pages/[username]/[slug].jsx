import { useContext } from "react"
import Link from "next/link"

import { getUserWithUsername, postToJSON } from "../../lib/firebaseConfig"
import { UserContext } from "../../lib/context"

import {
  collectionGroup,
  doc,
  getDocs,
  getDoc,
  getFirestore,
  limit,
  query,
} from "firebase/firestore"

import { useDocumentData } from "react-firebase-hooks/firestore"

export async function getStaticProps({ params }) {
  const { username, slug } = params
  const userDoc = await getUserWithUsername(username)

  let post
  let path

  if (userDoc) {
    console.log("userDoc.ref", userDoc.ref)
    const postRef = doc(getFirestore(), userDoc.ref.path, "posts", slug)

    post = postToJSON(await getDoc(postRef))

    path = postRef.path
  }

  return {
    props: { post, path },
    revalidate: 420,
  }
}

export async function getStaticPaths() {
  // Improve by using Admin SDK to select empty docs
  const q = query(collectionGroup(getFirestore(), "posts"), limit(20))
  const snapshot = await getDocs(q)

  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data()
    return {
      params: { username, slug },
    }
  })

  return {
    // must be in this format:
    // paths: [
    //   { params: { username, slug }}
    // ],
    paths,
    fallback: "blocking",
  }
}

export default function Post(props) {
  const postRef = doc(getFirestore(), props.path)
  const [realtimePost] = useDocumentData(postRef)

  const post = realtimePost || props.post

  const { user: currentUser } = useContext(UserContext)

  console.log("post", props.post)
  console.log("path", props.path)
  // const createdAt =
  //   typeof post?.createdAt === "number"
  //     ? new Date(post.createdAt)
  //     : post.createdAt.toDate()

  return (
    <div>
      <nav className='max-w-screen h-[8vh] bg-slate-800 px-[4vw] flex justify-btween items-center drops-shadow-lg'>
        <Link href='/main'>
          <h1 className='text-[66px] font-bold text-white justify-self-start cursor-pointer '>
            Field
          </h1>
        </Link>
        {/* (
        <button
          className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-solid border-b-4 border-blue-700 hover:border-blue-500 rounded ml-auto'
          // onClick={handleSetEdit}
        >
          Update Profile
        </button>
        ) */}
      </nav>
      <main className=''>
        <div className='flex justify-center content-center bg-slate-200 w-full'>
          <div className='max-w-[69vh] bg-white mt-20 border-black border-2'>
            <img
              src={
                post.photoUrl ? `${post.photoUrl}` : "/img/location-marker.svg"
              }
            />
          </div>
        </div>
        <div className='mx-[40vh] my-16 flex flex-col content-center'>
          <h1 className='text-4xl font-bold'>{post.title} </h1>
          <div className='flex mt-6'>
            <span className=''>
              <b>creator: </b>
              <Link
                href={`/${post.username}`}
                className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-2 border-solid border-b-4 border-blue-700 hover:border-blue-500 rounded'
              >
                @{post.username}
              </Link>
            </span>
            <span className='inline-block bg-gray-200 rounded-full ml-auto px-3 py-1 text-md font-semibold text-slate-900 mb-1'>
              phone: {post.phone}
            </span>
            <span className='inline-block bg-lime-50 rounded-full ml-4 px-3 py-1 text-md font-semibold text-slate-900 mb-1'>
              price: {post.price}
            </span>
          </div>

          <div className='mt-2 '>
            <b>content:</b>
            <p className='bg-white ml-1 p-4'>{post.content}</p>
          </div>

          <div className='mt-2 '>
            <b>address: </b>
            <p className=' bg-white ml-1 p-2'>
              {`${
                post.address.streetAddress1
                  ? post.address.streetAddress1 + ", "
                  : ""
              } ${
                post.address.streetAddress2
                  ? post.address.streetAddress2 + ", "
                  : ""
              }
              ${
                post.address.locality
                  ? post.address.locality + ", "
                  : "-no locality [should not happend]-"
              } ${
                post.address.district
                  ? post.address.district + ", "
                  : "-no district [should not happend]-"
              }
              ${
                post.address.province
                  ? post.address.province + ", "
                  : "-no province [should not happend]-"
              } ${
                post.address.zipCode
                  ? post.address.zipCode + ", "
                  : "-no zipCode [should not happend]-"
              }`}
            </p>
          </div>

          <div className='mt-2 mb-40'>
            <b>map:</b>
            <p className='bg-white ml-1 p-4'>{post.content}</p>
          </div>
        </div>
      </main>
    </div>
  )
}
