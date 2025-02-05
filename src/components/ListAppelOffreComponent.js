import React, {useState, useEffect} from 'react'
import AppelOffreService from '../services/AppelOffreService'
import { Link ,useHistory,useParams} from 'react-router-dom'

const ListAppelOffreComponent = () => {

const [entiteF, setEntiteF] = useState('')
const [typeMarcheF, settypeMarcheF] = useState('')
const [fitre, setfitre] = useState('')
const [appelOffre, setAppelOffre] = useState([])
const {enttt} = useParams();

const [totals, setTotals] = useState({
  totalLance: 0,
  totalTransmisCe: 0,
  totalEnCoursExamen: 0,
  totalJuge: 0,
});

const ent = "no"
  useEffect(() => {
    
        getAllAppelOffre(entiteF,typeMarcheF,fitre);
        getDashboardData(entiteF); // Appel avec l'entité sélectionnée
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

    const getDashboardData = (entite) => {
      AppelOffreService.getDashboard(entite).then((response) => {
        const data = response.data;
    
        // Débogage : Afficher les données reçues
        console.log("Données reçues:", data);
        console.log("Entité sélectionnée:", entite);
    
        if (data.length > 0) {
          if (entite) {
            // Recherche des données pour l'entité spécifique
            const entityData = data.find(row => row.entite === entite);
            if (entityData) {
              console.log("Données de l'entité trouvées:", entityData);
              setTotals({
                totalAppelOffres: entityData["Total des Appels d'Offres"],
                totalLance: entityData["Total Lancés"],
                totalTransmisCe: entityData["Total Transmis à la Commission"],
                totalJuge: entityData["Total Jugés"],
                totalEnCoursExamen: entityData["appelOffresEnCoursExamen"]
              });
            } else {
              console.log("Aucune donnée trouvée pour l'entité:", entite);
            }
          } else {
            // Recherche des totaux globaux
            const globalData = data.find(row => row.entite === "Total");
            if (globalData) {
              console.log("Données globales trouvées:", globalData);
              setTotals({
                totalAppelOffres: globalData["appelOffresTotal"],
                totalLance: globalData["appelOffresLance"],
                totalTransmisCe: globalData["appelOffresTransmisCe"],
                totalJuge: globalData["appelOffresJuge"],
                totalEnCoursExamen: globalData["appelOffresEnCoursExamen"]
              });
            } else {
              console.log("Aucune donnée globale trouvée.");
            }
          }
        } else {
          console.log("Aucune donnée reçue.");
        }
      }).catch((error) => {
        console.error("Erreur lors de la récupération des données:", error);
      });
    };
  

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
    
<br></br>
    {/* Filtres */}
    <div className="container-fluid">
    <h2 className="filter-section-title text-center">Liste des Appels d'Offres</h2>
  <br />
  <div className="row my-2">
  <div className="col-12 col-md-3 mb-3">
    <div className="filter-card">
      <label className="filter-label">Entité</label>
      <select className="form-select filter-select" value={entiteF} onChange={(e) => setEntiteF(e.target.value)}>
        <option value="">Sélectionner une entité</option>
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

  {/* Filter: Situation */}
  <div className="col-12 col-md-3 mb-3">
    <div className="filter-card">
      <label className="filter-label">Situation</label>
      <select className="form-select filter-select" value={fitre} onChange={(e) => setfitre(e.target.value)}>
        <option value="">Sélectionner une situation</option>
        <option value="pre">Appel d'Offre en cours de Préparation</option>
        <option value="ce">Appel d'Offre en Cours de Vérification</option>
        <option value="ouv">Appel d'Offre Lancé</option>
        <option value="jug">Appel d'Offre Jugé</option>
      </select>
    </div>
  </div>

  {/* Filter: Type Marché */}
  <div className="col-12 col-md-3 mb-3">
    <div className="filter-card">
      <label className="filter-label">Type Marché</label>
      <select className="form-select filter-select" value={typeMarcheF} onChange={(e) => settypeMarcheF(e.target.value)}>
        <option value="">Sélectionner un type de marché</option>
        <option value="F">Fourniture</option>
        <option value="S">Service</option>
        <option value="T">Travaux</option>
      </select>
    </div>
  </div>


    <div className="col-12 col-md-2 mb-2">
      <div className="stats-card">
        <p><strong>Total des Appels d'Offres : <span className="stat-value">{totals.totalAppelOffres}</span></strong></p>
        <p><strong>Total En Cours de Vérification : <span className="stat-value">{totals.totalTransmisCe}</span></strong></p>
        <p><strong>Total Lancés : <span className="stat-value">{totals.totalLance}</span></strong></p>
        <p><strong>Total Jugés : <span className="stat-value">{totals.totalJuge}</span></strong></p>
      </div>
    </div>

    <div className="col-12 col-md-1 text-end mb-2">
      <Link to={`/add-appeloffre/${entt}`} className="btn-ajouter-ao">
              Ajouter AO
      </Link>
</div>
  </div>
</div>


<br></br>
    {/* Table */}
    <div className="table-responsive">
    <table className="table table-bordered table-striped" style={{ tableLayout: "fixed" }}>
  <thead>
    <tr>
      <th style={{ textAlign: "center" }}>Entité</th>
      <th  style={{ textAlign: "center", width: "550px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Objet</th>
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
    const dateJugementA = a.dateJugement ? new Date(a.dateJugement) : null;
    const dateJugementB = b.dateJugement ? new Date(b.dateJugement) : null;
    const dateA = a.dateOuvertureReelle ? new Date(a.dateOuvertureReelle) : null;
    const dateB = b.dateOuvertureReelle ? new Date(b.dateOuvertureReelle) : null;
    const dateTransA = a.datetransmisCe ? new Date(a.datetransmisCe) : null;
    const dateTransB = b.datetransmisCe ? new Date(b.datetransmisCe) : null;

    // Priorité au tri par dateJugement
    if (dateJugementA && !dateJugementB) return -1;
    if (!dateJugementA && dateJugementB) return 1;
    if (dateJugementA && dateJugementB) return dateJugementA - dateJugementB;

    // Ensuite tri par dateOuvertureReelle
    if (dateA && !dateB) return -1;
    if (!dateA && dateB) return 1;
    if (dateA && dateB) return dateA - dateB;

    // Ensuite tri par datetransmisCe
    if (dateTransA && !dateTransB) return -1;
    if (!dateTransA && dateTransB) return 1;
    if (dateTransA && dateTransB) return dateTransA - dateTransB;

    return 0;
      })
      .map((appel) => (
        <tr
        style={{
          backgroundColor: appel.dateJugement
            ? "#CD853F" // Couleur si dateJugement est non nul
            : appel.dateOuvertureReelle
            ? "#50C878" // Couleur si dateOuvertureReelle est non nul
            : appel.datetransmisCe
            ? "#FFFF00" // Couleur si datetransmisCe est non nul
            : "white",  // Couleur par défaut
        }}
        >
          <td>{appel.entite}</td>
          <td style={{ width: "550px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {appel.objet}
          </td>
          <td style={{ textAlign: "center"}}>{appel.typeMarche}</td>
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
              className="btn btn-info small-buttonn"
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
              className="btn btn-danger small-buttonn"
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