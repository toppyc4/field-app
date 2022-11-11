import { useMemo, useCallback, useRef, useEffect, useState } from "react"

import GoogleMapReact from "google-map-react"
import DrawingMap from "./DrawingMap"

const Map = ({
  places,
  coordinates,
  setCoordinates,
  setBounds,
  setChildClicked,
}) => {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude })
      }
    )
  }, [])

  console.log(coordinates)
  console.log("places", places)

  return (
    <div className='w-full h-full'>
      {/* <DrawingMap coordinates={coordinates} /> */}
      <GoogleMapReact
        // bootstrapURLKeys={{ key: "AIzaSyCI_-E-iNpc2Lp2L9cjonh2p9MX-bcp85g" }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={11}
        options={""}
        onChange={(e) => {
          // console.log(e)
          setCoordinates({ lat: e.center.lat, lng: e.center.lng })
          setBounds({ ne: e.bounds.ne, sw: e.bounds.sw })
        }}
        onChildClick={(child) => {
          setChildClicked(child)
        }}
      >
        {places?.map((place, i) => {
          const markerLetter = String.fromCharCode("A".charCodeAt(0) + (i % 26))
          console.log("place", place)
          return (
            <div
              lat={Number(place.address.coordinate.lat)}
              lng={Number(place.address.coordinate.lng)}
              key={i}
              className='abosolute z-1 cursor-pointer'
            >
              <img
                src={`/img/alphabet-markers/marker_green${markerLetter}.png`}
              />
            </div>
          )
        })}
        {coordinates && (
          <div
            lat={coordinates.lat}
            lng={coordinates.lng}
            className='absolute z-2'
          >
            <img src='/img/plus-small.svg' />
          </div>
        )}
      </GoogleMapReact>
    </div>
  )
}

export default Map
