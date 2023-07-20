import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import GamesListComponent from './GamesListComponent'

export default function WingsJourneyApp(){
    return (
        <div className="WingsJourneyApp">
            <BrowserRouter>
                <Routes>
                <Route path='/' element={<GamesListComponent/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}