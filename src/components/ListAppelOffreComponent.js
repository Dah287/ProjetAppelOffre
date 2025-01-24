import React, {useState, useEffect} from 'react'
import AppelOffreService from '../services/AppelOffreService'
import { Link ,useHistory,useParams} from 'react-router-dom'

const ListAppelOffreComponent = () => {

const [entiteF, setEntiteF] = useState('')
const [typeMarcheF, settypeMarcheF] = useState('')
const [fitre, setfitre] = useState('')
const [appelOffre, setAppelOffre] = useState([])
const {enttt} = useParams();

const ent = "no"
  useEffect(() => {
    
        getAllAppelOffre(entiteF,typeMarcheF,fitre);
        
    }, [entiteF, typeMarcheF,fitre])

    const getAllAppelOffre = (entiteF,typeMarcheF,fitre) => {
        AppelOffreService.getAllAppelOffre(entiteF,typeMarcheF,fitre).then((response) => {
            setAppelOffre(response.data)
            console.log(entiteF);
            console.log(typeMarcheF);
            console.log(fitre);
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
    <h2 className="text-center">Liste des Appels d'Offres</h2>
<br></br>
    {/* Filtres */}
    <div className="row my-2">
        <div className="col-3">
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
        <div className="col-3">
            <select
                className="form-select"
                value={typeMarcheF}
                onChange={(e) => settypeMarcheF(e.target.value)}
            >
                <option selected>TYPE MARCHE</option>
                <option value="F">Fourniture</option>
                <option value="S">Service</option>
                <option value="T">Travaux</option>
            </select>
        </div>
        <div className="col-3">
            <select
                className="form-select"
                value={fitre}
                onChange={(e) => setfitre(e.target.value)}
            >
                <option selected>Filtre</option>
                <option value="ouv">Appel Offre Lancer</option>
                <option value="ce">Appel Offre Transmis commission </option>
               
            </select>
        </div>
        <div className="col-2">
        <div className="col text-end">
                <p>
                <strong>
                    Total des appels d'offre : <span style={{ color: 'red' }}>{appelOffre.length}</span>
                </strong>
                </p>
                </div>
        </div>
        
        <div className="col-1 text-end">
            <Link  to={`/add-appeloffre/${entt}`} className="btn btn-primary">
            Ajouter AO
            </Link>
        </div>
        
    </div>
<br></br>
    {/* Table */}
    <div className="table-responsive">
    <table className="table table-bordered table-striped" style={{ tableLayout: "fixed" }}>
  <thead>
    <tr>
      <th style={{ textAlign: "center" }}>Entité</th>
      <th style={{ textAlign: "center", width: "550px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Objet</th>
      <th style={{ textAlign: "center",width: "80px" }}>Type Marché</th>
      <th style={{ textAlign: "center" }}>Estimation</th>
      <th style={{ textAlign: "center",width: "80px" }}>PME</th>
      <th style={{ textAlign: "center" }}>Publication PREV</th>
      <th style={{ textAlign: "center" }}>Transmis BAM</th>
      <th style={{ textAlign: "center" }}>Transmis commission</th>
      <th style={{ textAlign: "center" }}>Observation MC</th>
      <th style={{ textAlign: "center" ,width: "60px"}}>N° AO</th>
      <th style={{ textAlign: "center" }}>Ouverture Reelle</th>
      <th style={{ textAlign: "center" }}>Jugement</th>
      <th style={{ textAlign: "center" }}>Observations</th>
      <th style={{ textAlign: "center" ,width: "140px"}}>Actions</th>
    </tr>
  </thead>
  <tbody>
    {appelOffre
      .sort((a, b) => {
        const dateA = a.dateOuvertureReelle ? new Date(a.dateOuvertureReelle) : null;
        const dateB = b.dateOuvertureReelle ? new Date(b.dateOuvertureReelle) : null;
        const dateTransA = a.datetransmisCe ? new Date(a.datetransmisCe) : null;
        const dateTransB = b.datetransmisCe ? new Date(b.datetransmisCe) : null;

        if (dateA && !dateB) return -1;
        if (!dateA && dateB) return 1;
        if (dateA && dateB) return dateA - dateB;

        if (dateTransA && !dateTransB) return -1;
        if (!dateTransA && dateTransB) return 1;
        if (dateTransA && dateTransB) return dateTransA - dateTransB;

        return 0;
      })
      .map((appel) => (
        <tr
          key={appel.id}
          style={{
            backgroundColor: appel.dateOuvertureReelle
              ? "#50C878"
              : appel.datetransmisCe
              ? "#FFFF00"
              : "white",
          }}
        >
          <td>{appel.entite}</td>
          <td style={{ width: "550px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {appel.objet}
          </td>
          <td>{appel.typeMarche}</td>
          <td>{appel.estimation?.toLocaleString('fr-MA')}</td>
          <td>{appel.pme}</td>
          <td>{appel.moisPublicationPrevisionnelle}</td>
          <td>{appel.dateOuverturePrevisionnelle}</td>
          <td>{appel.datetransmisCe}</td>
          <td>{appel.dateobservationMc}</td>
          <td style={{ textAlign: "center" ,width: "60px"}}>{appel.numero}</td>
          <td>{appel.dateOuvertureReelle}</td>
          <td>{appel.dateJugement}</td>
          <td>{appel.observations}</td>
          <td style={{  alignItems: "center" ,width: "160px"}}>
            <Link
              className="btn btn-info"
              style={{
                
                fontSize: "12px",
                width: "50px",
                paddingLeft : "1px",
                paddingRight:"1px"
              
              }}
              to={`/edit-employee/${appel.id}/${ent}`}
            >
              Modifier
            </Link>
            <button
              className="btn btn-danger"
              onClick={() => deleteappelOffre(appel.id)}
              style={{
                
                fontSize: "12px",
                width: "60px",
                paddingLeft : "1px",
                paddingRight:"1px",
                marginLeft: "10px"
             
              }}
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

  )
}




export default ListAppelOffreComponent