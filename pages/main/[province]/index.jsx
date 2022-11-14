import { useState, useEffect } from "react"
import { useRouter } from "next/router"

// import { PlacesContext } from "../lib/context"
import Map from "../../../Components/Map"
import List from "../../../Components/List"
import Navbar from "../../../Components/Navbar"

import {
  getPostsWithProvince,
  postToJSON,
  db,
} from "../../../lib/firebaseConfig"
import {
  query,
  collection,
  where,
  getDocs,
  limit,
  orderBy,
  getFirestore,
} from "firebase/firestore"

import { useLoadScript } from "@react-google-maps/api"

export default function PostsListByProvince({ posts, province }) {
  const router = useRouter()
  // console.log("province", province)
  const [coordinates, setCoordinates] = useState({
    lat: 13.7563,
    lng: 100.5018,
  })
  const [zoomLv, setZoomLv] = useState(11)
  // const [bounds, setBounds] = useState(null)
  const [drawingMap, setDrawingMap] = useState(false)
  const [childClicked, setChildClicked] = useState(null)

  useEffect(() => {
    setCoordinates({
      lat: province.coordinate.lat,
      lng: province.coordinate.lng,
    })
    setZoomLv(11)
  }, [])

  // Load google map script
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCI_-E-iNpc2Lp2L9cjonh2p9MX-bcp85g",
    libraries: ["places", "drawing", "geometry"],
  })

  if (!isLoaded) return <div>Loading . . . </div>
  console.log("posts", posts)
  console.log("router", router)
  return (
    <>
      <Navbar
        drawingMap={drawingMap}
        setDrawingMap={setDrawingMap}
        setCoordinates={setCoordinates}
      />
      <main className='h-[90vh] flex'>
        <div className='w-[40%]'>
          <List
            posts={posts}
            province={province}
            childClicked={childClicked}
            setCoordinates={setCoordinates}
            drawingMap={drawingMap}
            setDrawingMap={setDrawingMap}
          />
        </div>
        <div className='w-[60%]'>
          <Map
            posts={posts}
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

export async function getServerSideProps(context) {
  const { params } = context
  let { province } = params
  const provinceDocs = await getPostsWithProvince(province)

  // console.log("paramsSSP", params)
  // console.log("provinceSSP", province)
  // If no user, short circuit to 404 page
  if (!provinceDocs) {
    return { notFound: true }
  }

  // JSON serializable data
  // let user = null
  let posts = null

  if (provinceDocs) {
    province = provinceDocs.data()

    const postQuery = query(
      collection(getFirestore(), provinceDocs.ref.path, "posts"),
      where("published", "==", true),
      orderBy("createdAt", "desc"),
      limit(30)
    )
    posts = (await getDocs(postQuery)).docs.map(postToJSON)
  }
  return {
    props: { posts, province }, // will be passed to the page component as props
  }
}
