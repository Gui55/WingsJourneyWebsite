import { useFormik } from 'formik'
import './GameFormStyle.css'
import { uploadGamesApi, uploadGameImageApi, findGameByIdApi, updateGameApi } from './api/GamesService'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function GameFormComponent(){

    const navigate = useNavigate()

    const {id} = useParams()

    const [initName, setInitName] = useState('')
    const [initCompany, setInitCompany] = useState('')
    const [initGenre, setInitGenre] = useState('')
    const [initDescription, setInitDescription] = useState('')
    const [initImage, setInitImage] = useState('')
    const [changeIm, setChangeIm] = useState(true)

    useEffect(
        () => retrieveGame(),
        [id]
    )

    function retrieveGame(){
        if(id!=-1){
            findGameByIdApi(id)
                .then(response => {
                    setInitName(response.data.name)
                    setInitCompany(response.data.company)
                    setInitGenre(response.data.genre)
                    setInitDescription(response.data.description)
                    setInitImage(response.data.image)
                    setChangeIm(response.data.image.length==0)
                    //initialImage = response.data.name
                })
                .catch(error => console.log(error))
        }
    }

    const formik = useFormik({
        initialValues: {
            name: initName,
            company: initCompany,
            genre: initGenre,
            description: initDescription,
            image: null
        },
        onSubmit: async (values) => {
            const game = {
                id: id,
                name: values.name,
                company: values.company,
                image: initImage,
                genre: values.genre,
                description: values.description,
                likes: 0,
                dislikes: 0
            }

            if(id==-1){
                uploadGamesApi(game)
                    .then((response) => uploadGameImage(response.data, values.image))
                    .catch((error) => {
                        console.log(game)
                        console.log(error)
                    })
            } else {
                updateGameApi(game)
                    .then(response => {
                        if(changeIm && values.image!=null){
                            uploadGameImage(id, values.image)
                        } else {
                            navigate('/home')
                        }
                    })
                    .catch((error) => console.log(error))
            }
        },
        enableReinitialize: true
    })

    function uploadGameImage(id, image){
        let formData = new FormData()
        formData.append("image", image)
        uploadGameImageApi(id, formData)
            .then((response) => navigate('/home'))
            .catch((error) => {
                console.log(error)
            })
    }

    return(
        <div className="formComponent">
            <h1 className='text-info'>Forneça os detalhes do game</h1>
            <div>
                <form onSubmit={formik.handleSubmit}>
                    <div className='fieldDiv'>
                        <label className='text-info'>Nome:</label>
                        <br/>
                        <input type="text" className="gameField" name="name"
                        value={formik.values.name} onChange={formik.handleChange}/>
                    </div>
                    <div className='fieldDiv'>
                        <label className='text-info'>Empresa:</label>
                        <br/>
                        <input type="text" className="gameField" name="company"
                        value={formik.values.company} onChange={formik.handleChange}/>
                    </div>
                    <div className='fieldDiv'>
                        <label className='text-info'>Gênero:</label>
                        <br/>
                        <input type="text" className="gameField" name="genre"
                        value={formik.values.genre} onChange={formik.handleChange}/>
                    </div>
                    <div className='fieldDiv'>
                        <label className='text-info'>Descrição:</label>
                        <br/>
                        <textarea rows="6" cols="50" className="gameField" name="description"
                        value={formik.values.description} onChange={formik.handleChange}/>
                    </div>
                    <div className='fieldDiv'>
                        <label className='text-info'>Imagem:</label>
                        {changeIm && (<input type="file" className='aMargin' accept='image/*' name="image"
                        onChange={(e) =>
                            formik.setFieldValue('image', e.currentTarget.files[0])
                        }/>)}
                        {!changeIm && (
                            <div>
                                <img className='gameFormImage' src={initImage} />
                                <strong className='gameBtn' onClick={()=>setChangeIm(true)}>Alterar imagem</strong>
                            </div>
                        )}
                    </div>
                    <div>
                        <button className='gameBtnB' type="submit">Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}