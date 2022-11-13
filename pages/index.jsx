import { useContext } from "react"
import { UserContext } from "../lib/context"
import { useRouter } from "next/router"

import {
  auth,
  googleAuthProvider,
  facebookAuthProvider,
} from "../lib/firebaseConfig"
import { signInWithPopup } from "firebase/auth"

import toast from "react-hot-toast"

export default function Intro() {
  return (
    <div className='bg-intro-field h-[100vh] bg-fixed overflow-hidden flex'>
      <div className='mt-48 mb-auto ml-32'>
        <div className='m-5'>
          <h1 className='text-8xl font-bold'>Field</h1>
          <span className='text-4xl font-semibold'>
            Visualize Map & Marketplace.
          </span>
        </div>
        <SignInButton />
        {/* <button className='mb-5'>h1</button>
        <button className=''>h2</button> */}
      </div>
    </div>
  )
}

const SignInButton = () => {
  const router = useRouter()
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleAuthProvider)
      .then(() => {
        router.push("/LoginForm")
        toast.success("Successfully Sign In! (w/ Google acc)")
      })
      .catch((err) => {
        alert(`signInWithGoogle Error: ${err.message}`)
      })
  }
  const signInWithFacebook = async () => {
    await signInWithPopup(auth, facebookAuthProvider)
      .then(() => {
        router.push("/LoginForm")
        toast.success("Successfully Sign In! (w/ Facebook acc)")
      })
      .catch((err) => {
        alert(`signInWithFacebook Error: ${err.message}`)
      })
  }
  return (
    <>
      <button className='m-5 bg-white text-black' onClick={signInWithGoogle}>
        <img src={"/img/google.png"} className='w-[30px] mr-[10px]' />
        Sign in with Google
      </button>
      {/* <button
            className='m-5 bg-[#4267B2] text-white'
            onClick={signInWithFacebook}
          >
            <img src={"/facebook-logo.svg"} className='w-[30px] mr-[10px]' />
            Sign in with Facebook
          </button> */}
    </>
  )
}
