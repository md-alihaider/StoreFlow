import { createContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [accessToken, setAccessToken] = useState(null)
  const value = {
    user,
    setUser,
    accessToken,
    setAccessToken
  }
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const response = await api.post("/auth/refresh-token")
        const newAccessToken = response.data.data.accessToken
        setAccessToken(newAccessToken)

        const newResponse = await api.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${newAccessToken}`
          }
        })
        setUser(newResponse.data.data.user)
      } catch (error) {
        console.log("No active session",error)
      }
    }
    restoreSession()
  },[])
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext