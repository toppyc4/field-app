import "../styles/globals.css"

import { ContextProvider } from "../lib/context"
import { useState, useEffect } from "react"
import { Toaster } from "react-hot-toast"

function MyApp({ Component, pageProps }) {
  const [showChild, setShowChild] = useState(false)

  useEffect(() => {
    setShowChild(true)
  }, [])
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
