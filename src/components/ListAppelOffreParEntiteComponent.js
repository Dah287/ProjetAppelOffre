
import React, {useState, useEffect} from 'react'
import AppelOffreService from '../services/AppelOffreService'
import { Link ,useHistory,useParams} from 'react-router-dom'
const ListAppelOffreParEntiteComponent = () => {



const [typeMarcheF, settypeMarcheF] = useState('')

const [appelOffre, setAppelOffre] = useState([])

const {entitee} = useParams();

  useEffect(() => {
    
        getAllAppelOffre(entitee,typeMarcheF);
        
    }, [entitee,typeMarcheF])

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
       AppelOffreService.deleteappelOffre(appelOffreId).then((response) =>{
        getAllAppelOffre(entitee,typeMarcheF);
        history.push(`/ListAppelOffreParEntite/${entitee}`);

       }).catch(error =>{
           console.log(error);
       })
        
    }
    const isValidDate = (date) => {
        // Vérifie si la date est valide
        if(date!=null){
            return true;
        }else{
            return false;
        }
      };

      const history = useHistory();


  return (
    
    <div className="container-fluid">
    <h2 className="text-center">List Appel Offre : {entitee}</h2>

    {/* Filtres */}
    <div className="row my-3">

        <div className="col-5">
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
        <div className="col text-end">
            <Link  to={`/add-appeloffre/${entitee}`} className="btn btn-primary">
                Add Appel Offre
            </Link>
        </div>
    </div>

    {/* Table */}
    <div className="table-responsive">
        <table className="table table-bordered table-striped">
            <thead>
                <tr>
                    <th style={{ textAlign: "center" }}>N°</th>
                    <th style={{ textAlign: "center" }}>Entité</th>
                    <th style={{ textAlign: "center" }}>Objet</th>
                    <th style={{ textAlign: "center" }}>Type Marché</th>
                    <th style={{ textAlign: "center" }}>Estimation</th>
                    <th style={{ textAlign: "center" }}>PME</th>
                    <th style={{ textAlign: "center" }}>Date de publication Pr</th>
                    <th style={{ textAlign: "center" }}>Date d’ouverture Pr</th>
                    <th style={{ textAlign: "center" }}>Transmis CE</th>
                    <th style={{ textAlign: "center" }}>Observation MC</th>
                    <th style={{ textAlign: "center" }}>Date ouverture R</th>
                    <th style={{ textAlign: "center" }}>Date jugement</th>
                    <th style={{ textAlign: "center" }}>Observations</th>
                    <th style={{ textAlign: "center" }}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {appelOffre.map((appel) => (
                    <tr
                        key={appel.id}
                        style={{
                            backgroundColor: isValidDate(appel.dateOuvertureReelle)
                                ? "green"
                                : "white",
                        }}
                    >
                        <td>{appel.numero}</td>
                        <td>{appel.entite}</td>
                        <td>{appel.objet}</td>
                        <td>{appel.typeMarche}</td>
                        <td>{appel.estimation}</td>
                        <td>{appel.pme}</td>
                        <td>{appel.moisPublicationPrevisionnelle}</td>
                        <td>{appel.dateOuverturePrevisionnelle}</td>
                        <td>{appel.datetransmisCe}</td>
                        <td>{appel.dateobservationMc}</td>
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
                                    to={`/edit-employee/${appel.id}/${entitee}`}
                                    
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

export default ListAppelOffreParEntiteComponent