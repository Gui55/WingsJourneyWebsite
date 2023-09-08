import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import GamesListComponent from './gamesList/GamesListComponent'
import HeaderComponent from './gamesList//HeaderComponent'
import GameFormComponent from './gamesList/GameFormComponent'
import GameDetailsComponent from './gamesList/GameDetailsComponent'
import LoginComponent from './login/LoginComponent'
import AuthProvider, { useAuth } from './security/AuthContext'
import LogoutComponent from './login/LogoutComponent'

function AuthenticatedRoute({children}){
    const authContext = useAuth()
    if(authContext.isAuthenticated){
        return children
    } 
    return <Navigate to="/"/>
}

export default function WingsJourneyApp(){
    return (
        <div className="WingsJourneyApp">
            <AuthProvider>
                <BrowserRouter>
                    <HeaderComponent/>
                    <Routes>
                        <Route path='/' element={<LoginComponent/>}/>
                        <Route path='/login' element={<LoginComponent/>}/>
                        <Route path='/home' element={
                            <AuthenticatedRoute>
                                <GamesListComponent/>
                            </AuthenticatedRoute>
                        }/>
                        <Route path='/game/submit/:id' element={
                            <AuthenticatedRoute>
                                <GameFormComponent/>
                            </AuthenticatedRoute>
                        }/>
                        <Route path='/game/details/:id' element={
                            <AuthenticatedRoute>
                                <GameDetailsComponent/>
                            </AuthenticatedRoute>
                        }/>
                        <Route path='/logout' element={
                            <AuthenticatedRoute>
                                <LogoutComponent/>
                            </AuthenticatedRoute>
                        }/>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}