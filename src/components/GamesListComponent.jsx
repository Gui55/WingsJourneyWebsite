import { useEffect, useState } from 'react'
import { gamesApi } from './api/GamesService'
import './GameListStyle.css'

export default function GamesListComponent(){

    const [games, setGames] = useState([])

    useEffect(() => getGames(),[])

    function getGames(){
        gamesApi()
        .then((response) => setGames(response.data))
        .catch((error) => console.log(error))
    }

    return (
        <div className="wingsPage">
            <ul className='gamesList'>
                {games.map((game, index) => (
                    <li key={index} className='defaultGameListElement'>
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