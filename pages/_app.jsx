import "../styles/globals.css"

import { ContextProvider } from "../lib/context"
import { useState, useEffect } from "react"
import { useLoadScript } from "@react-google-maps/api"
import { Toaster } from "react-hot-toast"

function MyApp({ Component, pageProps }) {
  const [showChild, setShowChild] = useState(false)
  useEffect(() => {
    setShowChild(true)
  }, [])
  // Load google map script
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places", "drawing", "geometry"],
  })

  if (!isLoaded) return <div>Loading . . . </div>

  return (
    <>
      {showChild && (
        <ContextProvider>
          <Component {...pageProps} />
          <Toaster />
        </ContextProvider>
      )}
    </>
  )
}

export default MyApp
