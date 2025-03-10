import React, {useState, useEffect} from 'react'
import AppelOffreService from '../services/AppelOffreService'
import { Link ,useHistory,useParams} from 'react-router-dom'
import './FilterComponent.css';


const RECAPP = () => {

  const user = JSON.parse(localStorage.getItem('user'));
  
const [entiteF, setEntiteF] = useState('')
const [typeMarcheF, settypeMarcheF] = useState('')
const [visa, setvisa] = useState('')
const [fitre, setfitre] = useState('')
const [appelOffre, setAppelOffre] = useState([])
const {enttt} = useParams();
const [montantTTC, setMontantTTC] = useState("");
const [marcheVise, setMarcheVise] = useState("");

let isBloque = "non";

const getMarcheVise = (appel) => {


  if (
    (appel.typeMarche === 'S' || appel.typeMarche === 'F') && appel.montantTTC >= 1_000_000 ||
    (appel.typeMarche === 'T' && appel.montantTTC >= 2_000_000)
  ) {
    isBloque = "non"; 
    return appel.marcheVise ? appel.marcheVise : "Visé"; // Affiche la date si elle existe
  } else {
    isBloque = "oui";
    return "Non Visé"; // Champ bloqué si les conditions ne sont pas remplies
  }
};




const [totals, setTotals] = useState({
  totalAppelOffres: 0,
  estimationTotalAppelOffres: 0,
  totalLance: 0,
  estimationTotalLance: 0,
  totalTransmisCe: 0,
  estimationTotalTransmisCe: 0,
  totalJuge: 0,
  totalPme: 0,
  totalVisa: 0,
  estimationTotalJuge: 0,
  estimationTotalPme: 0,
  estimationTotalVisa: 0,
  totalEnCoursExamen: 0
});

const bloque = "oui"
  useEffect(() => {
    console.log( getAllAppelOffre(entiteF,typeMarcheF,fitre,visa))
        getAllAppelOffre(entiteF,typeMarcheF,fitre,visa);
        getDashboardData(entiteF); // Appel avec l'entité sélectionnée
    }, [entiteF, typeMarcheF,fitre,visa])

    const getAllAppelOffre = (entiteF,typeMarcheF,fitre,visa) => {
        AppelOffreService.getAllAppelOffre(entiteF,typeMarcheF,fitre,visa).then((response) => {
          console.log("Données pr:", response);
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
    
        console.log("Données reçues:", data);
        console.log("Entité sélectionnée:", entite);
    
        if (data.length > 0) {
          if (entite) {
            const entityData = data.find(row => row.entite === entite);
            if (entityData) {
              console.log("Données de l'entité trouvées:", entityData);
              setTotals({
                totalAppelOffres: entityData["Total des Appels d'Offres"],
                estimationTotalAppelOffres: entityData["totalsEstimationTotalAppelOffres"],
    
                totalLance: entityData["Total Lancés"],
                estimationTotalLance: entityData["totalsEstimationTotalLance"],
    
                totalTransmisCe: entityData["Total Transmis à la Commission"],
                estimationTotalTransmisCe: entityData["totalsEstimationTotalTransmisCe"],
    
                totalJuge: entityData["Total Jugés"],
                estimationTotalJuge: entityData["totalsEstimationTotalJuge"],

                totalPme: entityData["Total Pme"],
                estimationTotalPme: entityData["totalsEstimationTotalPme"],

                totalVisa: entityData["Total Visa"],
                estimationTotalVisa: entityData["totalsEstimationTotalVisa"],
    
                totalEnCoursExamen: entityData["appelOffresEnCoursExamen"]
              });
            } else {
              console.log("Aucune donnée trouvée pour l'entité:", entite);
            }
          } else {
            const globalData = data.find(row => row.entite === "Total");
            if (globalData) {
              console.log("Données globales trouvées:", globalData);
              setTotals({
                totalAppelOffres: globalData["appelOffresTotal"],
                estimationTotalAppelOffres: globalData["totalsEstimationTotalAppelOffres"],
    
                totalLance: globalData["appelOffresLance"],
                estimationTotalLance: globalData["totalsEstimationTotalLance"],
    
                totalTransmisCe: globalData["appelOffresTransmisCe"],
                estimationTotalTransmisCe: globalData["totalsEstimationTotalTransmisCe"],
    
                totalJuge: globalData["appelOffresJuge"],
                estimationTotalJuge: globalData["totalsEstimationTotalJuge"],

                totalPme: globalData["appelOffresPme"],
                estimationTotalPme: globalData["totalsEstimationTotalPme"],

                totalVisa: globalData["appelOffresVisa"],
                estimationTotalVisa: globalData["totalsEstimationTotalVisa"],
    
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
    const formatToMDH = (value) => {
      return value ? (value / 1_000_000).toFixed(2) + " MDH" : "0 MDH";
    };
    

  return (

    
    <div className="container-fluid">
    

    {/* Filtres */}
    <div className="container-fluid">
    <h2 className="filter-section-title text-center nnn" >Liste des Appels d'Offres</h2>

  <div className="row my-2">
  <div className="col-12 col-md-2 mb-3">
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
  <div className="col-12 col-md-2 mb-3">
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
  <div className="col-12 col-md-2 mb-3">
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
    {/* Filter: Type Visa */}
    <div className="col-12 col-md-2 mb-3">
    <div className="filter-card">
      <label className="filter-label">Suivi de Visa </label>
      <select className="form-select filter-select" value={visa} onChange={(e) => setvisa(e.target.value)}>
        <option value="">Sélectionner un type de visa</option>
        <option value="vise">marché Visé</option>
        <option value="nonvise">Non Visé </option>
      </select>
    </div>
  </div>


    <div className="col-12 col-md-4 mb-2">
    <div className="stats-card">
  <p><strong>Total des Appels d'Offres : <span className="stat-value" style={{paddingRight: "15px"}}>{totals.totalAppelOffres}</span> (Estimation : <span className="stat-value">{formatToMDH(totals.estimationTotalAppelOffres)}</span>)</strong></p>
  <p><strong>AO. Transmis Commission : <span className="stat-value"style={{paddingRight: "15px"}}>{totals.totalTransmisCe}</span> (Estimation : <span className="stat-value">{formatToMDH(totals.estimationTotalTransmisCe)}</span>)</strong></p>
  <p><strong>AO. Lancés : <span className="stat-value"style={{paddingRight: "15px"}}>{totals.totalLance}</span> (Estimation : <span className="stat-value">{formatToMDH(totals.estimationTotalLance)}</span>)</strong></p>
  <p><strong>AO. Jugés : <span className="stat-value"style={{paddingRight: "15px"}}>{totals.totalJuge}</span> (Estimation : <span className="stat-value">{formatToMDH(totals.estimationTotalJuge)}</span>)</strong></p>
  <p><strong>AO. PME : <span className="stat-value"style={{paddingRight: "15px"}}>{totals.totalPme}</span> (Estimation : <span className="stat-value">{formatToMDH(totals.estimationTotalPme)}</span>)</strong></p>
  <p><strong>AO. Visé : <span className="stat-value"style={{paddingRight: "15px"}}>{totals.totalVisa}</span> (Estimation : <span className="stat-value">{formatToMDH(totals.estimationTotalVisa)}</span>)</strong></p>
</div>

    </div>


  </div>
</div>


<br></br>
    {/* Table */}
    <div className="table-responsive">
    <table className="table table-bordered table-striped" style={{ tableLayout: "fixed" }}>
  <thead>
    <tr>
      <th style={{ textAlign: "center",width: "40px" }}>Entité</th>
      <th  style={{ textAlign: "center", width: "300px" }}>Objet</th>
      <th style={{ textAlign: "center",width: "50px" }}>Type Marché</th>
      <th style={{ width: "70px" }}>Estimation</th>
      <th style={{ textAlign: "center",width: "50px" }}>PME</th>
      <th style={{ textAlign: "center",width: "80px" }}>Attributaire</th>
     
      <th style={{ textAlign: "center" ,width: "80px" }}>Montant de Marché TTC</th>
      <th style={{ textAlign: "center",width: "80px"  }}>Marché Visé</th>
      <th  className="cccc" style={{ textAlign: "center" ,width: "85px"}}>Actions</th>
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
          <td >{appel.entite}</td>
          <td style={{ width: "550px" }}>
            {appel.objet}
          </td>
          <td style={{ textAlign: "center"}}>{appel.typeMarche}</td>
          <td>{appel.estimation?.toLocaleString('fr-MA')}</td>
          <td>{appel.pme}</td>
          <td>{appel.attributaire}</td>
          {/* <td>{appel.dateOuverturePrevisionnelle}</td> */}
          <td>{appel.montantTTC?.toLocaleString('fr-MA')}</td>
          <td>{getMarcheVise(appel)}</td>

     
          <td style={{  alignItems: "center" ,width: "160px"}}>
            <Link
              className="btn btn-info small-buttonn"
              style={{
                
                fontSize: "12px",
                width: "50px",
                paddingLeft : "1px",
                paddingRight:"1px"
              
              }}
              to={`/updateRecapp/${appel.id}/${isBloque}`}
            >
              Modifier
            </Link>

          </td>
        </tr>
      ))}
  </tbody>
</table>

    </div>
</div>

  )
}




export default RECAPP