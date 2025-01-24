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
            <nav className="navbar navbar-expand-md navbar-dark bg-primary px-3">
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
                                    <Link className="nav-link text-white mx-2" to="/dashboard"> <strong>RECAP</strong></Link>
                                    <Link className="nav-link text-white mx-2" to="/appelOffres"><strong>Liste des Appels d'Offres</strong></Link>
                                </>
                            )}                 
                    </div>

                    {/* Bouton de connexion */}
                    <div>
                    {user ? (
                            <div className="d-flex align-items-center">
                            {/* Logo utilisateur */}
                            <i className="bi bi-person-circle text-white mx-2" style={{ fontSize: '1.5rem' , marginLeft: '8px'}}></i>
                            {/* Nom de l'utilisateur */}
                            <span className="text-white mx-2">{user.role}</span>
                            {/* Bouton déconnexion */}
                            <button
                                className="btn btn-outline-light mx-4"
                                onClick={handleLogout}
                            >
                                Déconnexion
                            </button>
                        </div>
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