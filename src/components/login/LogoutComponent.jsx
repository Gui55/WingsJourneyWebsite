import { useAuth } from '../security/AuthContext'
import './LoginStyle.css'

export default function LogoutComponent(){
    const authContext = useAuth()
    if(authContext.isAuthenticated){
        authContext.logout()
    }

    return(
        <div>
            <strong className='text-info'>Você fez logout</strong>
        </div>
    )
}