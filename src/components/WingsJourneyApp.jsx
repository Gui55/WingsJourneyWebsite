import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import GamesListComponent from './GamesListComponent'
import HeaderComponent from './HeaderComponent'
import GameFormComponent from './GameFormComponent'
import GameDetailsComponent from './GameDetailsComponent'

export default function WingsJourneyApp(){
    return (
        <div className="WingsJourneyApp">
            <BrowserRouter>
                <HeaderComponent/>
                <Routes>
                    <Route path='/' element={<GamesListComponent/>}/>
                    <Route path='/home' element={<GamesListComponent/>}/>
                    <Route path='/game/submit' element={<GameFormComponent/>}/>
                    <Route path='/game/details/:id' element={<GameDetailsComponent/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}