import { createContext, useContext, useState } from "react";
import { authenticationService } from "../api/AuthenticationApiService";
import { apiClient } from "../api/ApiClient";

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)
let interceptor

export default function AuthProvider({children}){

    const [isAuthenticated, setAuthenticated] = useState(false)

    async function login(user, password){
        try{
            const response = await authenticationService(user, password)

            if(response.status === 200){
                const jwtToken = 'Bearer '+response.data.token
                setAuthenticated(true)

                if (interceptor !== undefined) {
                    apiClient.interceptors.request.eject(interceptor);
                }

                interceptor = apiClient.interceptors.request.use(
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
        if (interceptor !== undefined) {
            apiClient.interceptors.request.eject(interceptor);
        }
    }

    return(
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

