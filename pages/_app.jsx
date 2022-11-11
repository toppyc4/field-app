import "../styles/globals.css"

import { ContextProvider } from "../lib/context"
import { useState, useEffect } from "react"
import { Toaster } from "react-hot-toast"

function MyApp({ Component, pageProps }) {
  const [showChild, setShowChild] = useState(false)
  const provinces = {
    Bangkok: {
      center: { lat: 13.736717, lng: 100.523186 },
      zoom: 4,
    },
    Phuket: {
      center: { lat: 7.878978, lng: 98.398392 },
      zoom: 4,
    },
    Nonthaburi: {
      center: { lat: 13.859108, lng: 100.521652 },
      zoom: 4,
    },
    Nong_Khai: {
      center: { lat: 17.878281, lng: 102.741264 },
      zoom: 4,
    },
    Yasothon: {
      center: { lat: 15.792641, lng: 104.145287 },
      zoom: 4,
    },
    Nakhon_Pathom: {
      center: { lat: 13.814029, lng: 100.037292 },
      zoom: 4,
    },
    Chiang_Mai: {
      center: { lat: 18.793867, lng: 98.997116 },
      zoom: 4,
    },
    Nakhon_Ratchasima: {
      center: { lat: 14.9799, lng: 102.097771 },
      zoom: 4,
    },
    Hai_Ya: {
      center: { lat: 18.772558, lng: 98.982361 },
      zoom: 4,
    },
    Khon_Kaen: {
      center: { lat: 16.439625, lng: 102.828728 },
      zoom: 4,
    },
    Chon_Buri: {
      center: { lat: 13.361143, lng: 100.984673 },
      zoom: 4,
    },
    Chachoengsao: {
      center: { lat: 13.690419, lng: 101.077957 },
      zoom: 4,
    },
    Bang_Na: {
      center: { lat: 13.668217, lng: 100.614021 },
      zoom: 4,
    },
    Phetchaburi: {
      center: { lat: 13.11116, lng: 99.939133 },
      zoom: 4,
    },
    Pattaya: {
      center: { lat: 12.927608, lng: 100.877083 },
      zoom: 4,
    },
    Chiang_Mai: {
      center: { lat: 18.796143, lng: 98.979263 },
      zoom: 4,
    },
  }
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
