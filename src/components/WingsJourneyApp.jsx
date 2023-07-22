import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import GamesListComponent from './GamesListComponent'
import HeaderComponent from './HeaderComponent'
import GameFormComponent from './GameFormComponent'

export default function WingsJourneyApp(){
    return (
        <div className="WingsJourneyApp">
            <BrowserRouter>
                <HeaderComponent/>
                <Routes>
                    <Route path='/' element={<GamesListComponent/>}/>
                    <Route path='/home' element={<GamesListComponent/>}/>
                    <Route path='/game/submit' element={<GameFormComponent/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}