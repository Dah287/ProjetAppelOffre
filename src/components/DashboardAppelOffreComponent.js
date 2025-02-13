import React, { useState, useEffect } from 'react';
import AppelOffreService from '../services/AppelOffreService';
import './DashboardAppelOffreComponent.css'; // Chemin vers votre fichier CSS

const DashboardAppelOffreComponent = () => {
    const [appelOffresData, setAppelOffresData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const response = await AppelOffreService.getdashboard();
            setAppelOffresData(response.data);
        } catch (err) {
            console.error("Erreur lors de la récupération des données :", err);
            setError("Une erreur est survenue lors de la récupération des données.");
        } finally {
            setLoading(false);
        }
    };

    const calculateTotal = (key) => {
        return appelOffresData.reduce((sum, row) => sum + (row[key] || 0), 0);
    };

    return (
        <div className="vvvv">
            <h4 className="dashboard-title text-center">
  SUIVI DU PROGRAMME PREVISIONNEL DES OPERATIONS NOUVELLES A LANCER PAR <br /> L’ORMVAD
</h4>

            {loading ? (
                <p className="text-center fs-4">Chargement des données...</p>
            ) : error ? (
                <div className="text-center">
                    <p className="text-danger fs-4">{error}</p>
                    <button className="btn btn-primary" onClick={fetchDashboardData}>Réessayer</button>
                </div>
            ) : (
                <div className="table-responsive">
                 <table className="table table-bordered table-striped" >
                        <thead className="table-dark">
                            <tr>
                                <th className="fs-6">Entité</th>
                                <th className="text-center fs-6">Appels d'offres à lancer</th>
                                <th className="text-center fs-6">Appels d'offres transmis au CE</th>
                                <th className="text-center fs-6">Appels d'offres lancés</th>
                                <th className="text-center fs-6">Appels d'offres jugés</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appelOffresData.map((row, index) => (
                                <tr key={index}>
                                    <td className="fs-5">{row.entite}</td>
                                    <td className="text-center fs-5">{row.appelOffresALancer}</td>
                                    <td className="text-center fs-5">{row.appelOffresTransmisCe}</td>
                                    <td className="text-center fs-5">{row.appelOffresLance}</td>
                                    <td className="text-center fs-5">{row.appelOffresJuge}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="table-secondary">
                            <tr>
                                <td className="fs-5"><strong>Total</strong></td>
                                <td className="text-center fs-5"><strong>{calculateTotal('appelOffresALancer')}</strong></td>
                                <td className="text-center fs-5"><strong>{calculateTotal('appelOffresTransmisCe')}</strong></td>
                                <td className="text-center fs-5"><strong>{calculateTotal('appelOffresLance')}</strong></td>
                                <td className="text-center fs-5"><strong>{calculateTotal('appelOffresJuge')}</strong></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            )}
        </div>
    );
};

export default DashboardAppelOffreComponent;
