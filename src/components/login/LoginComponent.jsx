import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './LoginStyle.css'
import { useAuth } from '../security/AuthContext'

export default function LoginComponent(){

    const authContext = useAuth()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showFailMsg, setShowFailMsg] = useState(false)
    const navigate = useNavigate()

    function handleUsernameChange(event){
        setUsername(event.target.value)
    }

    function handlePasswordChange(event){
        setPassword(event.target.value)
    }
    
    async function handleSubmit(){
        if(await authContext.login(username, password)){
            navigate('/home')
        } else {
            setShowFailMsg(true)
        }
    }

    return(
        <div className="loginPage">
            <div className='loginForm'>
                <div className='loginInput'>
                    <label className='text-info'>Nome de usuário:</label>
                    <br/>
                    <input type="text" value={username} onChange={handleUsernameChange}/>
                </div>
                <div className='loginInput'>
                    <label className='text-info'>Senha: </label>
                    <br/>
                    <input type="text" value={password} onChange={handlePasswordChange}/>
                </div>
                <div className='btnDiv'>
                    <strong className='gameBtn' onClick={()=>handleSubmit()}>Login</strong>
                </div>
                <div>
                    <strong className='text-info'>
                        {showFailMsg && "Credenciais erradas!"}
                    </strong>
                </div>
            </div>
        </div>
    )
}