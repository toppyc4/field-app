import { useLoadScript } from "@react-google-maps/api"

import { useState, useEffect } from "react"

// import { PlacesContext } from "../lib/context"
import Map from "../../Components/Map"
import List from "../../Components/List"
import Navbar from "../../Components/Navbar"

const Home = ({ posts }) => {
  const [coordinates, setCoordinates] = useState({
    lat: 13.7563,
    lng: 100.5018,
  })
  const [zoomLv, setZoomLv] = useState(11)
  // const [bounds, setBounds] = useState(null)
  const [drawingMap, setDrawingMap] = useState(false)
  const [childClicked, setChildClicked] = useState(null)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude })
      }
    )
    setZoomLv(11)
  }, [])

  // Load google map script
  const libraries = ["places", "drawing", "geometry"]
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCI_-E-iNpc2Lp2L9cjonh2p9MX-bcp85g",
    libraries: libraries,
  })

  if (!isLoaded) return <div>Loading . . . </div>
  console.log("Mainposts", posts)
  return (
    <>
      <Navbar
        setCoordinates={setCoordinates}
        drawingMap={drawingMap}
        setDrawingMap={setDrawingMap}
      />
      <main className='h-[90vh] flex'>
        <div className='w-[40%]'>
          <List
            // posts={posts}
            childClicked={childClicked}
            setCoordinates={setCoordinates}
            drawingMap={drawingMap}
          />
        </div>
        <div className='w-[60%]'>
          <Map
            // posts={posts}
            coordinates={coordinates}
            setCoordinates={setCoordinates}
            zoomLv={zoomLv}
            setZoomLv={setZoomLv}
            // setBounds={setBounds}
            drawingMap={drawingMap}
            setChildClicked={setChildClicked}
          />
        </div>
      </main>
    </>
  )
}

export default Home
