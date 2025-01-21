import React, { useState, useEffect } from 'react';
import AppelOffreService from '../services/AppelOffreService';

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
        <div className="container-fluid">
            <h2 className="text-center mt-4 mb-4 fs-2">SUIVI DU PROGRAMME PREVISIONNEL DES OPERATIONS NOUVELLES A LANCER PAR <br></br>L’ORMVAD </h2>

            {loading ? (
                <p className="text-center fs-4">Chargement des données...</p>
            ) : error ? (
                <p className="text-danger text-center fs-4">{error}</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-bordered table-striped fs-5">
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
