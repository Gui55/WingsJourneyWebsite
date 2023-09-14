import { createContext, useContext, useState } from "react";
import { authenticationService } from "../api/AuthenticationApiService";
import { apiClient } from "../api/ApiClient";

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({children}){

    const [isAuthenticated, setAuthenticated] = useState(false)
    const [token, setToken] = useState(null)

    async function login(user, password){
        try{
            const response = await authenticationService(user, password)

            if(response.status === 200){
                const jwtToken = 'Bearer '+response.data.token
                setAuthenticated(true)
                setToken(jwtToken)

                apiClient.interceptors.request.use(
                    (config) => {
                        config.headers.Authorization = jwtToken
                        return config
                    }
                )

                return true
            } else {
                return false
            }
        }catch(error){
            console.log(error)
            logout()
            return false
        }
    }

    function logout(){
        setAuthenticated(false)
    }

    return(
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

