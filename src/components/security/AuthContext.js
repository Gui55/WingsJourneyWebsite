import { createContext, useContext, useState } from "react";

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({children}){

    const [isAuthenticated, setAuthenticated] = useState(false)

    async function login(user, password){
        const isCorrect = user==='admin' && password==='admin'
        setAuthenticated(isCorrect)
        return isCorrect
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

