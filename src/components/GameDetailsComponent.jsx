import { useParams } from 'react-router-dom'
import './GameDetailsStyle.css'
import { useEffect, useState } from 'react'
import { findGameByIdApi } from './api/GamesService'

export default function GameDetailsComponent(){

    const {id} = useParams()
    const [game, setGame] = useState('')

    useEffect(() => getGame(id),[id])

    function getGame(id){
        findGameByIdApi(id)
        .then((response) => setGame(response.data))
        .catch((error) => console.log(error))
    }

    return(
        <div className='detailsPage'>
            <h1 className='text-info'>{game.name}</h1>
            <div className='gameBasicInfo'>
                <img className='gameDetailsImage' src={game.image} />
                <div className='basicInfos'>
                    <strong className='basicInfoTitle'>Gênero: </strong>
                    <label className='basicInfoDesc'>{game.genre}</label>
                    <br/>
                    <br/>
                    <strong className='basicInfoTitle'>Empresa: </strong>
                    <label className='basicInfoDesc'>{game.company}</label>
                </div>
            </div>
            <label className='gameDesc'>{game.description}</label>
        </div>
    )
}