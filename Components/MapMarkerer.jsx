import { useEffect, useState } from "react"
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete"
import { useLoadScript } from "@react-google-maps/api"
import GoogleMapReact from "google-map-react"

export default function MapMarkerer({ address, miniMapCoor, setMiniMapCoor }) {
  // Load google map script
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places", "drawing", "geometry"],
  })

  // const [showMap, setShowMap] = useState(false)

  function handleClick() {
    getGeocode({ address: address.address })
      .then((results) => {
        console.log("Geocode results: ", results[0])
        const { lat, lng } = getLatLng(results[0])
        console.log("📍 MiniMapCoor: ", { lat, lng })
        setMiniMapCoor({ lat, lng })
        // setShowMap(true)
      })
      .catch((error) => {
        console.log("Error: ", error)
        alert("Error: ", error)
      })
  }

  if (!isLoaded) return <div>Loading . . . </div>

  return (
    <div className='my-4'>
      <div>
        <div className='flex'>
          <h3 className=' text-lg font-medium underline'>
            Adjust locantion on the map
            <i className='text-base no-underline'> (Required/จำเป็นต้องใส่)</i>
          </h3>
        </div>
        <div className='my-2 flex'>
          <p className='max-w-md'>
            <b>address: </b> {address.address}
          </p>
          <button
            onClick={handleClick}
            className='bg-white text-sm rounded-full ml-auto'
            type='button'
          >
            Search Location
          </button>
        </div>
      </div>

      <div className='w-[650px] h-[650px] mt-[1rem] mb-[3rem]'>
        <b className='bg-lime-200 px-4 py-2'>
          lat: {miniMapCoor?.lat}, lng: {miniMapCoor?.lng}
        </b>
        <GoogleMapReact
          // bootstrapURLKeys={{
          //   key: "AIzaSyCI_-E-iNpc2Lp2L9cjonh2p9MX-bcp85g",
          // }}
          defaultCenter={miniMapCoor}
          center={miniMapCoor}
          defaultZoom={15}
          options={""}
          onChange={(e) => {
            setMiniMapCoor({ lat: e.center.lat, lng: e.center.lng })
          }}
        >
          {miniMapCoor && (
            <div
              lat={miniMapCoor.lat}
              lng={miniMapCoor.lng}
              className='absolute z-2'
            >
              <img src='/img/map-pin-black.svg' />
            </div>
          )}
        </GoogleMapReact>
      </div>
    </div>
  )
}
