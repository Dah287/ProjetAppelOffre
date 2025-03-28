import React, { useState, useEffect } from 'react';
import BandeCommandeService from '../services/BandeCommandeService';
import { Link, useHistory } from 'react-router-dom';
import './FilterComponent.css';

const ListBandeCommandeComponent = () => {
    const [entiteF, setEntiteF] = useState('');
    const [typeMarcheF, setTypeMarcheF] = useState('');
    const [filter, setFilter] = useState('');
    const [bandeCommandes, setBandeCommandes] = useState([]);
    const [totals, setTotals] = useState({
        totalBandeCommandes: 0,
        estimationTotal: 0,
        totalTransmisCommission: 0,
        totalJuges: 0,
        totalLances:0,
        totalEnCours: 0
    });

    const history = useHistory();
const ent = "no"
    useEffect(() => {
        getAllBandeCommandes(entiteF, typeMarcheF, filter);
        console.log("donne:",getAllBandeCommandes(entiteF, typeMarcheF, filter))
        getDashboardData(entiteF);
    }, [entiteF, typeMarcheF, filter]);

    const getAllBandeCommandes = (entiteF, typeMarcheF, filter) => {
        BandeCommandeService.getAllBandeCommandes(entiteF, typeMarcheF, filter)
            .then((response) => {
                setBandeCommandes(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const getDashboardData = (entite) => {
        BandeCommandeService.getDashboard(entite)
            .then((response) => {
                const data = response.data;
                if (data.length > 0) {
                    const entityData = entite 
                        ? data.find(row => row.entite === entite) 
                        : data.find(row => row.entite === "Total");
                    
                    if (entityData) {
                        setTotals({
                            totalBandeCommandes: entityData.totalBandeCommandes || 0,
                            estimationTotal: entityData.estimationTotal || 0,
                            totalTransmisCommission: entityData.totalTransmisCommission || 0,
                            totalJuges: entityData.totalJuges || 0,
                            totalLances: entityData.totalLances || 0,
                            totalEnCours: entityData.totalEnCours || 0
                        });
                    }
                }
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des données:", error);
            });
    };

    const deleteBandeCommande = (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette bande de commande ?")) {
            BandeCommandeService.deleteBandeCommande(id)
                .then(() => {
                    getAllBandeCommandes(entiteF, typeMarcheF, filter);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };

    const formatToMDH = (value) => {
        return value ? (value / 1_000_000).toFixed(2) + " MDH" : "0 MDH";
    };

    return (
        <div className="container-fluid">
            <h2 className="filter-section-title text-center">Liste des bons de commande</h2>

            {/* Filtres */}
            <div className="row my-2">
                <div className="col-12 col-md-2 mb-3">
                    <div className="filter-card">
                        <label className="filter-label">Entité</label>
                        <select 
                            className="form-select filter-select" 
                            value={entiteF} 
                            onChange={(e) => setEntiteF(e.target.value)}
                        >
                            <option value="">Toutes les entités</option>
                            <option value="DPF">DPF</option>
                            <option value="DGR">DGR</option>
                            <option value="DA">DA</option>
                            <option value="DDA">DDA</option>
                            <option value="DRH">DRH</option>
                            <option value="SAICG">SAICG</option>
                            <option value="SMG">SMG</option>
                        </select>
                    </div>
                </div>

                <div className="col-12 col-md-2 mb-3">
                    <div className="filter-card">
                        <label className="filter-label">Type Marché</label>
                        <select 
                            className="form-select filter-select" 
                            value={typeMarcheF} 
                            onChange={(e) => setTypeMarcheF(e.target.value)}
                        >
                            <option value="">Tous les types</option>
                            <option value="F">Fourniture</option>
                            <option value="S">Service</option>
                            <option value="T">Travaux</option>
                        </select>
                    </div>
                </div>

                <div className="col-12 col-md-2 mb-3">
                    <div className="filter-card">
                        <label className="filter-label">Statut</label>
                        <select 
                            className="form-select filter-select" 
                            value={filter} 
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value="">Tous les statuts</option>
                        
                            <option value="juge">Jugé</option>
                            <option value="ouv">Lancé</option>
                            <option value="transmis">Transmis à la Commission</option>
                            <option value="encours">En cours</option>
                        </select>
                    </div>
                </div>

                <div className="col-12 col-md-4 mb-3">
                    <div className="stats-card">
                        <p>
                            <strong>Total des BC : </strong>
                            <span className="stat-value">{totals.totalBandeCommandes}</span>
                            <strong> (Estimation : </strong>
                            <span className="stat-value">{formatToMDH(totals.estimationTotal)}</span>)
                        </p>
                        <p>
                            <strong>Transmis Commission : </strong>
                            <span className="stat-value">{totals.totalTransmisCommission}</span>
                        </p>
                        <p>
                            <strong>Lances : </strong>
                            <span className="stat-value">{totals.totalLances}</span>
                        </p>
                        <p>
                            <strong>Jugés : </strong>
                            <span className="stat-value">{totals.totalJuges}</span>
                        </p>
                    </div>
                </div>

                <div className="col-12 col-md-2 text-end mb-3">
                    <Link to="/add-bandecommande" className="btn btn-primary">
                        Ajouter BC
                    </Link>
                </div>
            </div>

            {/* Tableau */}
            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Entité</th>
                            <th>Objet</th>
                            <th style={{ textAlign: "center" }}>Type Marché</th>
                            <th style={{ textAlign: "center" }}>Estimation</th>
                            <th style={{ textAlign: "center" }}>N° BC</th>
                            <th style={{ textAlign: "center" }}>Transmis Commission</th>
                                {/* heure */}
                                <th style={{ textAlign: "center",width: "180px"  }}>
                            <div>Ouverture Reelle</div>
                            <div style={{ borderTop: "1px solid black", paddingTop: "2px", marginTop: "2px" }}>Heure</div>

                            </th>
                                {/* heure */}
                            <th style={{ textAlign: "center" }}>Date Jugement</th>
                            <th style={{ textAlign: "center" }}>Montant BC</th>
                            <th style={{ textAlign: "center" }}>Observations</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bandeCommandes.map((bc) => (
                            <tr key={bc.id} style={{ 
                                backgroundColor: bc.dateJugement 
                                    ? "#CD853F" 
                                    : bc.dateOuvertureReelle 
                                    ? "#50C878" 
                                    : bc.transmisCommission
                                    ? "#FFFF00" // Couleur si datetransmisCe est non nul
                                 
                                    : "white" 
                            }}>
                                <td>{bc.entite}</td>
                                <td>{bc.objet}</td>
                                <td style={{ textAlign: "center" }}>{bc.typeMarche}</td>
                                <td style={{ textAlign: "center" }}>{bc.estimation?.toLocaleString('fr-MA')}</td>
                                <td style={{ textAlign: "center" }}>{bc.numeroBC}</td>
                                <td style={{ textAlign: "center" }}>{bc.transmisCommission}</td>
                                    {/* heure */}
                                    <td style={{ textAlign: "center" }}>
                                    <div >
                                    {bc.dateOuvertureReelle}
                                    </div>
                                    {bc.dateOuvertureReelle && bc.heureOuverture && (
                                    <div style={{ borderTop: "1px solid white", paddingTop: "2px", marginTop: "2px", fontWeight: "normal" }}>{bc.heureOuverture}</div>
                                    )}
                                    </td>
                                    {/* heure */}


                                <td style={{ textAlign: "center" }}>{bc.dateJugement}</td>
                                <td style={{ textAlign: "center" }}>{bc.montantBC?.toLocaleString('fr-MA')}</td>
                                <td style={{ textAlign: "center" }}>{bc.observations}</td>
                                <td>
                                    <Link 
                                        to={`/edit-bandecommande/${bc.id}`} 
                                        className="btn btn-info btn-sm"
                                    >
                                        Modifier
                                    </Link>
                                    <button
                                        onClick={() => deleteBandeCommande(bc.id)}
                                        className="btn btn-danger btn-sm ms-2"
                                    >
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListBandeCommandeComponent;