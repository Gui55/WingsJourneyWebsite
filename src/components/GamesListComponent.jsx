import { useEffect, useState } from 'react'
import { gamesApi } from './api/GamesService'
import './GameListStyle.css'
import { useNavigate } from 'react-router-dom'

export default function GamesListComponent(){

    const navigate = useNavigate()

    const [games, setGames] = useState([])

    useEffect(() => getGames(),[])

    function getGames(){
        gamesApi()
        .then((response) => setGames(response.data))
        .catch((error) => console.log(error))
    }

    function goToGameDetails(id){
        navigate(`/game/details/${id}`)
    }

    return (
        <div className="wingsPage">
            <ul className='gamesList'>
                {games.map((game, index) => (
                    <li key={index} className='defaultGameListElement' onClick={() => goToGameDetails(game.id)}>
                        <div className='gameListElementContainer'>
                            <div>
                                <strong className='gameText'>{game.name}</strong> 
                                <br/>
                                <br/>
                                <strong className='gameText'>{game.company}</strong>
                            </div>
                            <div>
                                <img className='gameListImage' src={game.image} />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}