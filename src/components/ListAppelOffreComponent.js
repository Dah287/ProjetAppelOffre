import React, {useState, useEffect} from 'react'
import AppelOffreService from '../services/AppelOffreService'
import { Link ,useHistory,useParams} from 'react-router-dom'

const ListAppelOffreComponent = () => {

const [entiteF, setEntiteF] = useState('')
const [typeMarcheF, settypeMarcheF] = useState('')

const [appelOffre, setAppelOffre] = useState([])
const {enttt} = useParams();

const ent = "no"
  useEffect(() => {
    
        getAllAppelOffre(entiteF,typeMarcheF);
        
    }, [entiteF, typeMarcheF])

    const getAllAppelOffre = (entiteF,typeMarcheF) => {
        AppelOffreService.getAllAppelOffre(entiteF,typeMarcheF).then((response) => {
            setAppelOffre(response.data)
            console.log(entiteF);
            console.log(typeMarcheF);
        }).catch(error =>{
            console.log(error);
        })
    } 

const deleteappelOffre = (appelOffreId) => {
    // Afficher une boîte de dialogue de confirmation
    const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer cet appel d'offre ?");

    // Si l'utilisateur confirme la suppression
    if (confirmation) {
        AppelOffreService.deleteappelOffre(appelOffreId)
            .then((response) => {
                // Recharger la liste des appels d'offre après la suppression
                getAllAppelOffre(entiteF, typeMarcheF);
            })
            .catch((error) => {
                console.log(error);
            });
    } else {
        // Si l'utilisateur annule, ne rien faire
        console.log("Suppression annulée.");
    }
};
    const isValidDate = (date) => {
        // Vérifie si la date est valide
        if(date!=null){
            return true;
        }else{
            return false;
        }
      };

      const history = useHistory();

      const entt = "noentite";


    //   const fetchAppelOffres = (e) => {
    //     e.preventDefault();     
    //     getAllAppelOffre(entiteF,typeMarcheF);
    //             console.log(entiteF)
                  
        
    // }

  return (

    
    <div className="container-fluid">
    <h2 className="text-center">List Appel Offre</h2>

    {/* Filtres */}
    <div className="row my-3">
        <div className="col-4">
            <select
                className="form-select"
                value={entiteF}
                onChange={(e) => setEntiteF(e.target.value)}
            >
                <option selected>ENTITE</option>
                <option value="DPF">DPF</option>
                <option value="DGR">DGR</option>
                <option value="DA">DA</option>
                <option value="DDA">DDA</option>
              
                <option value="DRH">DRH</option>
                <option value="SAICG">SAICG</option>
                <option value="SMG">SMG</option>
            </select>
        </div>
        <div className="col-4">
            <select
                className="form-select"
                value={typeMarcheF}
                onChange={(e) => settypeMarcheF(e.target.value)}
            >
                <option selected>TYPE MARCHE</option>
                <option value="F">F</option>
                <option value="S">S</option>
                <option value="T">T</option>
            </select>
        </div>
        <div className="col-2">
        <div className="col text-end">
                    <p><strong>Total des appels d'offre : {appelOffre.length}</strong></p>
                </div>
        </div>
        
        <div className="col text-end">
            <Link  to={`/add-appeloffre/${entt}`} className="btn btn-primary">
                Add Appel Offre
            </Link>
        </div>
        
    </div>

    {/* Table */}
    <div className="table-responsive">
        <table className="table table-bordered table-striped">
            <thead>
                <tr>

                    <th style={{ textAlign: "center" }}>Entité</th>
                    <th style={{ textAlign: "center" }}>Objet</th>
                    <th style={{ textAlign: "center" }}>Type Marché</th>
                    <th style={{ textAlign: "center" }}>Estimation</th>
                    <th style={{ textAlign: "center" }}>PME</th>
                    <th style={{ textAlign: "center" }}>Publication Prv</th>
                    <th style={{ textAlign: "center" }}>Transmis BAM</th>
                    <th style={{ textAlign: "center" }}>TransmisCE</th>
                    <th style={{ textAlign: "center" }}>Observation MC</th>
                    <th style={{ textAlign: "center" }}>N° AO</th>
                    <th style={{ textAlign: "center" }}>Ouverture Reelle</th>
                    <th style={{ textAlign: "center" }}>Jugement</th>
                    <th style={{ textAlign: "center" }}>Observations</th>
                    <th style={{ textAlign: "center" }}>Actions</th>
                </tr>
            </thead>
            <tbody>
    {appelOffre
        .sort((a, b) => {
            const dateA = a.dateOuvertureReelle ? new Date(a.dateOuvertureReelle) : null;
            const dateB = b.dateOuvertureReelle ? new Date(b.dateOuvertureReelle) : null;

            const dateTransA = a.datetransmisCe ? new Date(a.datetransmisCe) : null;
            const dateTransB = b.datetransmisCe ? new Date(b.datetransmisCe) : null;

            // Priorité : dateOuvertureReelle > datetransmisCe > aucune date
            if (dateA && !dateB) return -1; // a avant b
            if (!dateA && dateB) return 1; // b avant a
            if (dateA && dateB) return dateA - dateB; // Tri par dateOuvertureReelle

            if (dateTransA && !dateTransB) return -1; // a avant b
            if (!dateTransA && dateTransB) return 1; // b avant a
            if (dateTransA && dateTransB) return dateTransA - dateTransB; // Tri par datetransmisCe

            return 0; // Pas de changement si aucune date
        })
        .map((appel) => (
            <tr
                key={appel.id}
                style={{
                    backgroundColor: appel.dateOuvertureReelle
                        ? "#50C878" // Vert pour dateOuvertureReelle
                        : appel.datetransmisCe
                        ? "#FFFF00" // Jaune pour datetransmisCe
                        : "white", // Blanc pour aucune date
                }}
            >

                <td>{appel.entite}</td>
                <td>{appel.objet}</td>
                <td>{appel.typeMarche}</td>
                <td>{appel.estimation}</td>
                <td>{appel.pme}</td>
                <td>{appel.moisPublicationPrevisionnelle}</td>
                <td>{appel.dateOuverturePrevisionnelle}</td>
                <td>{appel.datetransmisCe}</td>
                <td>{appel.dateobservationMc}</td>
                <td>{appel.numero}</td>
                <td>{appel.dateOuvertureReelle}</td>
                <td>{appel.dateJugement}</td>
                <td>{appel.observations}</td>
                <td style={{ display: "flex", alignItems: "center" }}>
                    <Link
                        className="btn btn-info"
                        style={{
                            marginLeft: "10px",
                            fontSize: "10px",
                            width: "40px",
                            paddingLeft: "4px",
                            height: "30px",
                        }}
                        to={`/edit-employee/${appel.id}/${ent}`}
                    >
                        Update
                    </Link>

                    <button
                        className="btn btn-danger"
                        onClick={() => deleteappelOffre(appel.id)}
                        style={{
                            marginLeft: "10px",
                            fontSize: "10px",
                            width: "40px",
                            paddingLeft: "4px",
                            height: "30px",
                        }}
                    >
                        Delete
                    </button>
                </td>
            </tr>
        ))}
</tbody>



        </table>
    </div>
</div>

  )
}




export default ListAppelOffreComponent