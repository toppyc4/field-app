import "../styles/globals.css"

import { ContextProvider } from "../lib/context"
import { useState, useEffect } from "react"
import { useLoadScript } from "@react-google-maps/api"
import { Toaster } from "react-hot-toast"

function MyApp({ Component, pageProps }) {
  // const [showChild, setShowChild] = useState(false)
  // useEffect(() => {
  //   setShowChild(true)
  // }, [])
  // Load google map script
  const libraries = ["places", "drawing", "geometry"]
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCI_-E-iNpc2Lp2L9cjonh2p9MX-bcp85g",
    libraries: libraries,
  })

  if (!isLoaded) return <div>Loading . . . </div>

  return (
    <>
      <ContextProvider>
        <Component {...pageProps} />
        <Toaster />
      </ContextProvider>
    </>
  )
}

export default MyApp
