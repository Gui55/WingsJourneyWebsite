import { useAuth } from '../security/AuthContext'
import './HeaderStyle.css'
import { Link } from 'react-router-dom'

export default function HeaderComponent(){

    const authContext = useAuth()
    const isAuthenticated = authContext.isAuthenticated

    return(
        <header>
            <div className='container'>
                <div className='row'>
                    <nav className="navbar navbar-expand-lg">
                        <label className="navbar-brand text-info ms-2 fs-2 fw-bold">Wings Journey</label>
                        <div className="collapse navbar-collapse"/>
                        <ul className="navbar-nav">
                            <li className="nav-item fs-5">
                                {isAuthenticated && <Link className="nav-link text-info" to="/game/submit/-1">+ Games</Link>}
                            </li>
                            <li className='nav-item fs-5'>
                                {isAuthenticated && <Link className='nav-link text-info' to='/logout'>Logout</Link>}
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}