import AuthCheck from "../../components/firebase/AuthCheck"
import { auth, db } from "../../lib/firebaseConfig"
import {
  getFirestore,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore"

import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Link from "next/link"

import {
  useDocumentDataOnce,
  useDocumentData,
} from "react-firebase-hooks/firestore"

import PostForm from "../../Components/PostForm"

export default function AdminPostPage() {
  return (
    <AuthCheck>
      <nav className='max-w-screen h-[8vh] bg-slate-800 px-[4vw] flex justify-btween items-center drops-shadow-lg'>
        <Link href='/main'>
          <h1 className='text-[66px] font-bold text-white justify-self-start cursor-pointer '>
            Field
          </h1>
        </Link>
      </nav>

      <PostManager />
    </AuthCheck>
  )
}

function PostManager() {
  const [preview, setPreview] = useState(false)

  const router = useRouter()
  const { slug } = router.query
  const uid = auth?.currentUser?.uid

  const postRef = doc(getFirestore(), "users", uid, "posts", slug)
  const [post] = useDocumentData(postRef)

  console.log("postRef:", postRef)
  console.log("post:", post)

  return (
    <main className='w-full py-10 px-[20vw]'>
      {post && (
        <div className='flex justify-center'>
          <section className='w-[63vh] h-full mr-[1rem]'>
            <div className='mb-4'>
              <h1 className='text-4xl font-bold'>{post.title}</h1>
              <p>Post ID: {post.slug}</p>
            </div>
            <PostForm
              post={post}
              postRef={postRef}
              defaultValues={post}
              preview={preview}
            />
          </section>

          <aside className='flex flex-col w-[20%] min-w-[250px] min-h-[200px] text-center sticky'>
            <h3 className='text-xl font-semibold mb-3 '>Tools</h3>
            <button
              onClick={() => setPreview(!preview)}
              className='min-w-40 max-w-44 mb-3 mx-auto'
            >
              {preview ? "Edit" : "Preview"}
            </button>
            <Link href={`/${post.username}/${post.slug}`}>
              <button className='min-w-40 max-w-44 mx-auto bg-sky-900 text-white'>
                Live view
              </button>
            </Link>
          </aside>
        </div>
      )}
    </main>
  )
}
