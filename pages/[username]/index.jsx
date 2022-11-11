import { useState, useContext, useEffect } from "react"
import Link from "next/link"
import UserProfile from "../../Components/UserProfile"
import UserForm from "../../Components/UserForm"
import PostsFeed from "../../Components/PostsFeed"

import { getUserWithUsername, postToJSON, db } from "../../lib/firebaseConfig"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { UserContext } from "../../lib/context"
import {
  query,
  collection,
  where,
  getDocs,
  limit,
  orderBy,
  getFirestore,
} from "firebase/firestore"

export async function getServerSideProps({ query: urlQuery }) {
  const { username } = urlQuery

  const userDoc = await getUserWithUsername(username)

  // If no user, short circuit to 404 page
  if (!userDoc) {
    return { notFound: true }
  }

  // JSON serializable data
  let user = null
  let posts = null

  if (userDoc) {
    user = postToJSON(userDoc)
    // usre = userDoc.data()

    const postQuery = query(
      collection(getFirestore(), userDoc.ref.path, "posts"),
      where("published", "==", true),
      orderBy("createdAt", "desc"),
      limit(20)
    )
    posts = (await getDocs(postQuery)).docs.map((doc) => postToJSON(doc))
  }
  return {
    props: { user, posts }, // will be passed to the page component as props
  }
}

export default function UserProfilePage({ user, posts }) {
  const [admin, setAdmin] = useState(false)
  const [editing, setEditing] = useState(false)
  // const auth = getAuth()
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     console.log("user", user)
  //     const uid = user.uid
  //     console.log("uid", uid)
  //   }
  // })
  const { username } = useContext(UserContext)
  useEffect(() => {
    {
      username === user.username && setAdmin(true)
    }
  }, [])

  function handleSetEdit() {
    setEditing((prevState) => !prevState)
  }

  console.log("userProp", user)
  console.log("posts", posts)

  return (
    <>
      <nav className='max-w-screen h-[8vh] bg-slate-800 px-[4vw] flex justify-btween items-center drops-shadow-lg'>
        <Link href='/main'>
          <h1 className='text-[66px] font-bold text-white justify-self-start cursor-pointer '>
            Field
          </h1>
        </Link>
        {admin && (
          <button
            className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-solid border-b-4 border-blue-700 hover:border-blue-500 rounded ml-auto'
            onClick={handleSetEdit}
          >
            Update Profile
          </button>
        )}
      </nav>
      <main className='p-10 h-fit flex justify-center'>
        <section className=' h-full flex flex-col'>
          <UserProfile user={user} />
          {editing && <UserForm user={user} setEditing={setEditing} />}
          <PostsFeed posts={posts} admin={admin} />
        </section>
        {/* <aside className=''>
          <button>Edit Profile</button>
        </aside> */}
      </main>
    </>
  )
}
