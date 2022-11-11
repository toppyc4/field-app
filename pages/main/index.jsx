import { useLoadScript } from "@react-google-maps/api"

import { useState, useEffect } from "react"

// import { PlacesContext } from "../lib/context"
import Map from "../../Components/Map"
import List from "../../Components/List"
import Navbar from "../../Components/Navbar"

import { getPostsWithProvince, postToJSON, db } from "../../lib/firebaseConfig"
import {
  query,
  collection,
  where,
  getDocs,
  limit,
  orderBy,
  getFirestore,
} from "firebase/firestore"

// export async function getServerSideProps({}) {
//   const provinceDocs = await getPostsWithProvince(province)

//   // If no user, short circuit to 404 page
//   if (!provinceDocs) {
//     return { notFound: true }
//   }

//   // JSON serializable data
//   // let user = null
//   let posts = null

//   if (provinceDocs) {
//     province = provinceDocs.data()

//     const postQuery = query(
//       collection(getFirestore(), province.ref.path, "posts"),
//       where("published", "==", true),
//       orderBy("createdAt", "desc"),
//       limit(10)
//     )
//     posts = (await getDocs(postQuery)).docs.map(postToJSON)
//   }
//   return {
//     props: { posts }, // will be passed to the page component as props
//   }
// }

const Home = ({ posts }) => {
  // TODO: fetch places instead of actual hard code
  // const places = [
  //   {
  //     name: "area1",
  //     price: 100000,
  //     location_TH: "กรุงเทพฯ",
  //     location_Eng: "Bangkok",
  //     info: "อากาศดี asdjfhalsdasfjhashf hksjahkfjhasashfkjhkjfh ahsfh asfhashflkj ajhasfkh kafsalhfaslkjf",
  //     lat: 13.67426627760967,
  //     lng: 100.50954249536734,
  //   },
  //   {
  //     name: "area2",
  //     price: 310000,
  //     location_TH: "กรุงเทพฯ",
  //     location_Eng: "Bangkok",
  //     info: "อากาศดี",
  //     lat: 13.598828993189825,
  //     lng: 100.0550790993279,
  //   },
  //   {
  //     name: "area3",
  //     price: 220000,
  //     location_TH: "กรุงเทพฯ",
  //     location_Eng: "Bangkok",
  //     info: "อากาศดี",
  //     lat: 13.756297135492883,
  //     lng: 100.73612136835014,
  //   },
  //   {
  //     name: "area4",
  //     price: 400000,
  //     location_TH: "กรุงเทพฯ",
  //     location_Eng: "Bangkok",
  //     info: "อากาศดี",
  //     lat: 13.420764429016774,
  //     lng: 100.3226398217631,
  //   },
  //   {
  //     name: "area5",
  //     price: 1000,
  //     location_TH: "กรุงเทพฯ",
  //     location_Eng: "Bangkok",
  //     info: "อากาศดี",
  //     lat: 13.955781390677192,
  //     lng: 101.01879170780956,
  //   },
  //   {
  //     name: "area6",
  //     price: 50000,
  //     location_TH: "กรุงเทพฯ",
  //     location_Eng: "Bangkok",
  //     info: "อากาศดี",
  //     lat: 13.728901186128887,
  //     lng: 100.19081221349037,
  //   },
  //   {
  //     name: "area7",
  //     price: 1000000,
  //     location_TH: "กรุงเทพฯ",
  //     location_Eng: "Bangkok",
  //     info: "อากาศดี",
  //     lat: 14.072338053653503,
  //     lng: 100.68183302418784,
  //   },
  //   {
  //     name: "area8",
  //     price: 300,
  //     location_TH: "กรุงเทพฯ",
  //     location_Eng: "Bangkok",
  //     info: "อากาศดี",
  //     lat: 13.437487390963264,
  //     lng: 100.428935579494,
  //   },
  //   {
  //     name: "area9",
  //     price: 200,
  //     location_TH: "กรุงเทพฯ",
  //     location_Eng: "Bangkok",
  //     info: "อากาศดี",
  //     lat: 13.849591551574838,
  //     lng: 100.78807756771164,
  //   },
  //   {
  //     name: "area10",
  //     price: 150000,
  //     location_TH: "กรุงเทพฯ",
  //     location_Eng: "Bangkok",
  //     info: "อากาศดี",
  //     lat: 13.590287644051974,
  //     lng: 100.06454974506426,
  //   },
  // ]
  const [coordinates, setCoordinates] = useState({})
  const [bounds, setBounds] = useState(null)
  const [childClicked, setChildClicked] = useState(null)

  // Load google map script
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places", "drawing", "geometry"],
  })

  if (!isLoaded) return <div>Loading . . . </div>
  console.log("posts", posts)
  return (
    <>
      <Navbar setCoordinates={setCoordinates} />
      <main className='h-[90vh] flex'>
        <div className='w-[40%]'>
          <List
            // places={places} childClicked={childClicked}
            setCoordinates={setCoordinates}
          />
        </div>
        <div className='w-[60%]'>
          <Map
            // places={places}
            coordinates={coordinates}
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            // setChildClicked={setChildClicked}
          />
        </div>
      </main>
    </>
  )
}

export default Home
