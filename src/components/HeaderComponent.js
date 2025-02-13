import React from 'react'
import { Link ,useHistory,useLocation} from 'react-router-dom'
import './HeaderComponent.css';
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
        <div style={{ height: "90px"}}>
        <header>
            <nav className="navbar navbar-expand-md navbar-dark  px-3 navheigh"style={{ backgroundColor: '#4CAF50' }} >
                <div className="container-fluid d-flex justify-content-between align-items-center">
                    {/* Logo ou titre */}
                    <a href="#" className="navbar-brand d-flex align-items-center">
                                <img
                                    src="/ormvad_1.jpg"  // Chemin relatif à la racine du projet
                                    alt="Logo"
                                    className="me-2"
                                    style={{ 
                                        width: '40px', 
                                        height: '40px', 
                                        border: '3px solid #fff',  // Bordure blanche
                                        borderRadius: '12px'  // Coins arrondis
                                    }} // Ajuste la taille selon tes besoins
                                />
    <span className="fw-bold text-white">Application d'Appels d'Offres</span>
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
    <Link
        className="nav-link text-white mx-2"
        to="/dashboard"
        style={{
            border: '2px solid #fff',      // Ajout de la bordure
            borderRadius: '12px',          // Arrondir les bords
            padding: '6px 12px',           // Ajouter un peu de padding pour rendre le lien plus large
            transition: 'all 0.3s ease',   // Animation pour un effet au survol
        }}
    >
        <strong>RECAP</strong>
    </Link>
    <Link
        className="nav-link text-white mx-2"
        to="/appelOffres"
        style={{
            border: '2px solid #fff',      // Ajout de la bordure
            borderRadius: '12px',          // Arrondir les bords
            padding: '6px 12px',           // Ajouter un peu de padding pour rendre le lien plus large
            transition: 'all 0.3s ease',   // Animation pour un effet au survol
        }}
    >
        <strong>Liste des Appels d'Offres</strong>
    </Link>
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
                            <span className="text-white mx-2">{user.nom}</span>
                            {/* Bouton déconnexion */}
                            <button
                                className="btn btn-outline-light mx-4"
                                style={{
                                    border: '2px solid #fff',      // Ajout de la bordure
                                    borderRadius: '12px',          // Arrondir les bords
                                    padding: '6px 12px',           // Ajouter un peu de padding pour rendre le lien plus large
                                    transition: 'all 0.3s ease',   // Animation pour un effet au survol
                                }}
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
