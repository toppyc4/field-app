import { useState, createContext } from "react"
import { useUserData } from "../lib/hooks"

export const UserContext = createContext({ user: null, username: null })
export const CoordinateContext = createContext({
  coordinates: {},
  setCoordinates: () => {},
})

export function ContextProvider({ children }) {
  const userData = useUserData()
  const [coordinates, setCoordinates] = useState({})

  return (
    <UserContext.Provider value={userData}>
      <CoordinateContext.Provider value={{ coordinates, setCoordinates }}>
        {children}
      </CoordinateContext.Provider>
    </UserContext.Provider>
  )
}
