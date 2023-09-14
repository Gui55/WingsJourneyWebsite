import { useEffect, useState } from 'react'
import { gamesApi, gameImageApi } from '../api/GamesService'
import './GameListStyle.css'
import { useNavigate } from 'react-router-dom'

export default function GamesListComponent(){

    const navigate = useNavigate()

    const [games, setGames] = useState([])
    const [imgs, setImgs] = useState([])

    useEffect(() => getGames(),[])

    function getGames(){
        gamesApi()
        .then((response) => handleGames(response.data))
        .catch((error) => console.log(error))
    }

    function handleGames(games){
        Promise.all(games.map((game) => {
            return gameImageApi(game.image)
                .then((response) => {
                    const base64String = btoa(
                        new Uint8Array(response.data).reduce(
                          (data, byte) => data + String.fromCharCode(byte),
                          ''
                        )
                      );
                    return `data:image/png;base64,${base64String}`;
                })
                .catch((error) => console.log(error))
        }))
        .then((images) => {
            console.log(images)
            setImgs(images)
            setGames(games)
        })
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
                                <img className='gameListImage' key={index} src={imgs[index]} alt={`Game ${index}`} />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}