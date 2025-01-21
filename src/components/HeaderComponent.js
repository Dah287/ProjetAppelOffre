import React from 'react'
import { Link ,useHistory,useLocation} from 'react-router-dom'
const HeaderComponent = () => {

    const user = JSON.parse(localStorage.getItem('user'));
    const history = useHistory();
    const location = useLocation(); 
    
    // Obtenir l'URL actuelle
    const handleLogout = () => {
        localStorage.removeItem('user'); // Supprimer l'utilisateur de localStorage
        history.push('/login'); // Rediriger vers la page de connexion
    };

    return (
        <div>
        <header>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark px-3">
                <div className="container-fluid d-flex justify-content-between align-items-center">
                    {/* Logo ou titre */}
                    <a href="#" className="navbar-brand">
                        Appel d'Offre Application
                    </a>

                    {/* Liens de navigation */}
                    <div className="d-flex align-items-center">
                            {/* Afficher les liens si :
                                1. L'utilisateur est connecté
                                2. L'URL actuelle n'est pas "/login"
                                3. Le rôle de l'utilisateur est "admin"
                            */}
                            {user && location.pathname !== '/login' && user.role === 'admin' && (
                                <>
                                    <Link className="nav-link text-white mx-2" to="/dashboard">Recap</Link>
                                    <Link className="nav-link text-white mx-2" to="/appelOffres">Liste des Appels d'Offres</Link>
                                </>
                            )}                 
                    </div>

                    {/* Bouton de connexion */}
                    <div>
                    {user ? (
                                <button
                                    className="btn btn-outline-light"
                                    onClick={handleLogout}
                                >
                                    Déconnexion
                                </button>
                            ) : (
                                <a href="/login" className="btn btn-outline-light">
                                    Connexion
                                </a>
                            )}
                    </div>
                </div>
            </nav>
        </header>
            <br></br><br></br>
        </div>
    )
}

export default HeaderComponent
