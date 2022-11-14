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

  console.log("userProp", user)
  console.log("posts", posts)

  return (
    <div>
      <nav className='sticky top-0 max-w-screen h-[8vh] bg-slate-800 px-[4vw] flex justify-btween items-center drops-shadow-lg'>
        <Link href='/main'>
          <h1 className='text-[66px] font-bold text-white justify-self-start cursor-pointer '>
            Field
          </h1>
        </Link>
      </nav>
      <main className='p-10 h-fit w-full flex justify-center'>
        <div className=' h-full flex flex-col'>
          <UserProfile
            user={user}
            admin={admin}
            editing={editing}
            setEditing={setEditing}
          />
          {editing && <UserForm user={user} setEditing={setEditing} />}
          <PostsFeed posts={posts} admin={admin} />
        </div>
        {/* <aside className=''>
          <button>Edit Profile</button>
        </aside> */}
      </main>
    </div>
  )
}
