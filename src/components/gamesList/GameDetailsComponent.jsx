import { useNavigate, useParams } from 'react-router-dom'
import './GameDetailsStyle.css'
import { useEffect, useState } from 'react'
import { deleteGameApi, findGameByIdApi, gameImageApi } from '../api/GamesService'

export default function GameDetailsComponent(){

    const {id} = useParams()
    const [game, setGame] = useState('')
    const [img, setImg] = useState('')

    const navigate = useNavigate()

    useEffect(() => getGame(id))

    function getGame(id){
        findGameByIdApi(id)
        .then((response) => {
            setGame(response.data)
            getImage(response.data.image)
        })
        .catch((error) => console.log(error))
    }

    function getImage(image){
        gameImageApi(image)
            .then((response) => {
                const base64String = btoa(
                    new Uint8Array(response.data).reduce(
                      (data, byte) => data + String.fromCharCode(byte),
                      ''
                    )
                );
                setImg(`data:image/png;base64,${base64String}`);
            })
    }

    function editGame(){
        navigate(`../game/submit/${id}`)
    }

    function deleteGame(){
        deleteGameApi(id)
            .then(navigate("../home"))
            .catch(error => console.log(error))
    }

    return(
        <div className='detailsPage'>
            <h1 className='text-info'>{game.name}</h1>
            <div className='gameBasicInfo'>
                <img className='gameDetailsImage' src={img} alt="Imagem do jogo"/>
                <div className='basicInfos'>
                    <strong className='basicInfoTitle'>Gênero: </strong>
                    <label className='basicInfoDesc'>{game.genre}</label>
                    <br/>
                    <br/>
                    <strong className='basicInfoTitle'>Empresa: </strong>
                    <label className='basicInfoDesc'>{game.company}</label>
                </div>
            </div>
            <div className='btnDiv'>
                <strong className='gameBtn' onClick={()=>editGame()}>Editar</strong>
                <strong className='gameBtn' onClick={()=>deleteGame()}>Excluir</strong>
            </div>
            <label className='gameDesc'>{game.description}</label>
        </div>
    )
}