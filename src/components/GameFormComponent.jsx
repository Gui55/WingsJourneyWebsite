import { useFormik } from 'formik'
import './GameFormStyle.css'
import { uploadGamesApi, uploadGameImageApi } from './api/GamesService'
import { useNavigate } from 'react-router-dom'

export default function GameFormComponent(){

    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            name: '',
            company: '',
            genre: '',
            description: '',
            image: null
        },
        onSubmit: async (values) => {

            const game = {
                id: -1,
                name: values.name,
                company: values.company,
                image: '',
                genre: values.genre,
                description: values.description,
                likes: 0,
                dislikes: 0
            }

            uploadGamesApi(game)
            .then((response) => uploadGameImage(response.data, values.image))
            .catch((error) => {
                console.log(game)
                console.log(error)
            })
        }
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
                        <input type="text" className="gameField" name="description"
                        value={formik.values.description} onChange={formik.handleChange}/>
                    </div>
                    <div className='fieldDiv'>
                        <label className='text-info'>Imagem:</label>
                        <input type="file" className='aMargin' accept='image/*' name="image"
                        onChange={(e) =>
                            formik.setFieldValue('image', e.currentTarget.files[0])
                        }/>
                    </div>
                    <div>
                        <button className="btn btn-success m-5" type="submit">Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}