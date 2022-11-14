import Link from "next/link"
import Image from "next/image"
import { useContext, useState } from "react"
import { UserContext } from "../lib/context"
import { SignOutButton } from "../pages/LoginForm"

// import usePlacesAutocomplete from "use-places-autocomplete"

import SearchBox from "./SearchBox"
import { useRouter } from "next/router"

// import { Autocomplete } from "@react-google-maps/api"

const Navbar = ({ setCoordinates, drawingMap, setDrawingMap }) => {
  const { user, username } = useContext(UserContext)
  // const [drawingMap, setDrawingMap] = useState(false)
  // const [autocomplete, setAutocomplete] = useState(null)

  // const onLoad = (autoC) => setAutocomplete(autoC)
  // const onPlaceChanged = () => {
  //   const lat = autocomplete.getPlace().geometry.location.lat()
  //   const lng = autocomplete.getPlace().geometry.location.lng()

  //   setCoordinates({ lat, lng })
  // }
  // console.log("drawingMap", drawingMap)

  // const {
  //   ready,
  //   value,
  //   setValue,
  //   suggestions: { status, data },
  //   clearSuggestions,
  // } = usePlacesAutocomplete()

  const CreatePostButton = () => {
    const router = useRouter()
    return (
      <button
        onClick={() => {
          router.push("/admin")
        }}
        className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-solid border-b-4 border-blue-700 hover:border-blue-500 rounded'
      >
        Create Post
      </button>
    )
  }
  const DrawMapButton = () => {
    return (
      <button
        onClick={() => {
          setDrawingMap((prev) => !prev)
        }}
        className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-solid border-b-4 border-blue-700 hover:border-blue-500 rounded'
      >
        {drawingMap ? "view Visualize Map" : "Draw Map"}
      </button>
    )
  }
  return (
    <nav className='max-w-screen h-[8vh] bg-slate-800 px-[4vw] flex justify-btween items-center drops-shadow-lg'>
      <Link href='/'>
        <h1 className='text-[66px] font-bold text-white justify-self-start cursor-pointer '>
          Field
        </h1>
      </Link>

      <div className='ml-auto mr-3 inline-block relative w-64'>
        <SearchBox setCoordinates={setCoordinates} />
        {/* <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <input
            className='appearance-none block w-full my-2 bg-white text-gray-700  border-gray-400  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
            id='search-box'
            type='text'
            placeholder='Search'
          />
        </Autocomplete> */}
      </div>
      <>
        <div className='flex content-center'>
          <Link
            href={`/${username}`}
            className='flex bg-lime-500 hover:bg-lime-400 text-white my-auto mr-3 p-1 max-h-[50px] border-solid border-b-4 border-lime-700 hover:border-lime-500 rounded overflow-hidden'
          >
            <div>
              <img
                src={user?.photoURL || "/img/question-mark-profile.jpg"}
                width={50}
                height={50}
                className='mr-2 w-[56px] h-[56px] self-center cursor-pointer rounded-full'
                referrerPolicy='no-referrer'
              />
              {/* <p className='my-auto text-md self-center'>
                {username || "unknown"}
              </p> */}
            </div>
          </Link>
          <div className='mr-3'>
            <CreatePostButton />
          </div>
          <div className='mr-3'>
            <DrawMapButton />
          </div>
          <div>
            <SignOutButton />
          </div>
        </div>
      </>
    </nav>
  )
}

export default Navbar
