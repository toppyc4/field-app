import { useMemo, useCallback, useRef, useEffect, useState } from "react"

import DrawingMap from "./DrawingMap"
import GoogleMapReact from "google-map-react"
import {
  GoogleMap,
  MarkerF,
  MarkerClustererF,
  DrawingManager,
} from "@react-google-maps/api"

const Map = ({
  posts,
  coordinates,
  setCoordinates,
  zoomLv,
  setZoomLv,
  // setBounds,
  drawingMap,
  setChildClicked,
}) => {
  const [map, setMap] = useState(null)
  // const [zoomLv, setZoomLv] = useState(11)

  const mapRef = useRef()
  // const center = useMemo(() => ({ lat: 43, lng: -80 }), [])
  const options = useMemo(
    () => ({
      mapId: "1dc8eb85a559cb2e",
      // disableDefaultUI: true,
      // clickableIcons: false,
    }),
    []
  )
  const onLoad = useCallback(
    setMap,
    // (map) => (mapRef.current = map),
    []
  )

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(
  //     ({ coords: { latitude, longitude } }) => {
  //       setCoordinates({ lat: latitude, lng: longitude })
  //     }
  //   )
  //   setZoomLv(11)
  // }, [])

  function handleClick(position, i) {
    setCoordinates(position)
    setChildClicked(i)
    // mapRef.current?.panTo(position)
    setZoomLv(14)
  }

  function iconType(type) {
    if (type === "Vacant Land") {
      return "/img/typed-markers/square-3-stack-3d.svg"
    } else if (type === "Real Estate") {
      return "/img/typed-markers/building-storefront.svg"
    } else if (type === "Property") {
      return "/img/typed-markers/home.svg"
    }
  }

  console.log("coordinates", coordinates)
  console.log("map", map)
  console.log("posts", posts)

  return (
    <div className='w-full h-full'>
      {drawingMap ? (
        <DrawingMap coordinates={coordinates} />
      ) : (
        <GoogleMap
          zoom={zoomLv}
          onZoomChanged={(e) => {
            if (map === null) {
              return
            }
            if (map.zoom !== zoomLv) {
              setZoomLv(e)
            }
          }}
          center={coordinates}
          mapContainerClassName='w-full h-[92vh]'
          options={options}
          onLoad={onLoad}
        >
          {/* <MarkerClustererF>
            {(clusterer) => (
              <> */}
          {posts?.map((post, i) => {
            const markerLetter = String.fromCharCode(
              "A".charCodeAt(0) + (i % 26)
            )
            // console.log("post", post)
            return (
              <MarkerF
                position={post.address.coordinate}
                icon={
                  iconType(post.typeOfService)
                  // `/img/alphabet-markers/marker_green${markerLetter}.png`
                }
                key={post.address.coordinate.lat + post.address.coordinate.lng}
                className='abosolute z-1 cursor-pointer'
                onClick={() => handleClick(post.address.coordinate, i)}
                // clusterer={clusterer}
              />
            )
          })}
          {/* </>
            )}
          </MarkerClustererF> */}
        </GoogleMap>
      )}
      {/* <GoogleMapReact
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
      {posts?.map((post, i) => {
        const markerLetter = String.fromCharCode("A".charCodeAt(0) + (i % 26))
        console.log("post", post)
        return (
          <div
            lat={Number(post.address.coordinate.lat)}
            lng={Number(post.address.coordinate.lng)}
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
          // <img src='/img/plus-small.svg' />
        </div>
      )}
    </GoogleMapReact> */}
    </div>
  )
}

export default Map
