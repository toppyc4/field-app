import { useMemo, useCallback, useRef, useState } from "react"
import {
  GoogleMap,
  MarkerF,
  MarkerClustererF,
  DrawingManager,
} from "@react-google-maps/api"

const DrawingMap = ({ coordinates }) => {
  const [text, setText] = useState("")

  const [state, setState] = useState({
    drawingMode: "maker",
  })

  const noDraw = () => {
    setState(function set(prevState) {
      return Object.assign({}, prevState, {
        drawingMode: "maker",
      })
    })
  }

  const mapRef = useRef()
  const onLoad = useCallback((map) => (mapRef.current = map), [])
  const options = useMemo(() => ({
    mapId: "",
    // disableDefaultUI: true,
    clickableIcons: false,
  }))

  return (
    <GoogleMap
      zoom={11}
      center={coordinates}
      mapContainerClassName='w-full h-full'
      options={options}
      onLoad={onLoad}
    >
      <DrawingManager
        drawingMode={state.drawingMode}
        // onRightClick={alert("hi")}
        options={{
          drawingControl: true,
          drawingControlOptions: {
            // position: "BOTTOM_CENTER",
            drawingModes: ["polygon", "marker"],
          },
          polygonOptions: {
            fillColor: `#2196F3`,
            strokeColor: `#2196F3`,
            fillOpacity: 0.5,
            strokeWeight: 2,
            clickable: true,
            editable: false,
            draggable: false,
            zIndex: 1,
          },
          markerOptions: {
            animation: ["DROP"],
            label: {
              text: `‘’This‘’`,
              fontSize: "25px",
              fontWeight: "700",
              // title: `‘’This‘’`,
              zIndex: 2,
            },
          },
        }}
        onPolygonComplete={(poly) => {
          const polyArray = poly.getPath()
          console.log(polyArray)
          const polyArray1 = polyArray.getArray()
          console.log(polyArray1)

          let paths = []
          polyArray1.forEach(function (path) {
            paths.push({ latitude: path.lat(), longitude: path.lng() })
          })
          console.log("onPolygonComplete", polyArray)
          console.log("onPolygonComplete", poly)
          noDraw()
        }}
      />
    </GoogleMap>
  )
}

export default DrawingMap
