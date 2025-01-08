import React from 'react'
import { Link ,useHistory} from 'react-router-dom'
const HeaderComponent = () => {
    return (
        <div>
        <header>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark px-3">
                <div className="container-fluid d-flex justify-content-between align-items-center">
                    {/* Logo ou titre */}
                    <a href="/" className="navbar-brand">
                        Appel d'Offre Application
                    </a>

                    {/* Liens de navigation */}
                    <div className="d-flex align-items-center">
                                    <Link className="nav-link text-white mx-2" to="/dashboard"> Tableau de Bord </Link>
                                    <Link className="nav-link text-white mx-2" to="/appelOffres"> Liste des Appels d'Offres </Link>                        
                    </div>

                    {/* Bouton de connexion */}
                    <div>
                        <a href="/login" className="btn btn-outline-light">
                            Connexion
                        </a>
                    </div>
                </div>
            </nav>
        </header>
            <br></br><br></br>
        </div>
    )
}

export default HeaderComponent
