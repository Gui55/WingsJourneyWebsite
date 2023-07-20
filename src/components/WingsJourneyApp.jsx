import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import GamesListComponent from './GamesListComponent'
import HeaderComponent from './HeaderComponent'

export default function WingsJourneyApp(){
    return (
        <div className="WingsJourneyApp">
            <BrowserRouter>
                <HeaderComponent/>
                <Routes>
                    <Route path='/' element={<GamesListComponent/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}