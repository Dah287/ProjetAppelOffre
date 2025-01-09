import React, {useState, useEffect} from 'react'
import {Link, useHistory, useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService'
import AppelOffreService from '../services/AppelOffreService';

const AddAppelOffreComponent = () => {

    const [numero, setNumero] = useState('')
    const [entite, setEntite] = useState('')
    const [objet, setObjet] = useState('')
    const [typeMarche, settypeMarche] = useState('')
    const [estimation, setEstimation] = useState('')
    const [pme, setPme] = useState('')
    // 
    const [moisPublicationPrevisionnelle	, setMoisPublicationPrevisionnelle] = useState('')
    const [dateOuverturePrevisionnelle	, setDateOuverturePrevisionnelle] = useState('')
    //   
    const [datetransmisCe, setDatetransmisCe] = useState('')
    const [dateobservationMc	, setDateobservationMc] = useState('')
    const [dateOuvertureReelle	, setDateOuvertureReelle] = useState('')
    const [observations	, set0bservations] = useState('')
    const [dateJugement	, setDateJugement] = useState('')

    const history = useHistory();
    const {id} = useParams();

    const saveOrUpdatedAppelOffre = (e) => {
        e.preventDefault();

        const appelOffre = {numero, entite, objet,typeMarche,estimation,pme,moisPublicationPrevisionnelle,dateOuverturePrevisionnelle,datetransmisCe,dateobservationMc,dateOuvertureReelle,dateJugement,observations}

        if(id){
            AppelOffreService.updateappelOffre(id, appelOffre).then((response) => {
                console.log(response.data.numero)
                history.push('/appelOffres')
            }).catch(error => {
                console.log(error)
            })

        }else{
            AppelOffreService.createAppelOffre(appelOffre).then((response) =>{

                console.log(response.data.numero)
    
                history.push('/appelOffres');
    
            }).catch(error => {
                console.log(error)
            })
        }
        
    }

    useEffect(() => {

        AppelOffreService.getappelOffreById(id).then((response) =>{
            setNumero(response.data.numero)
            setEntite(response.data.entite)
            setObjet(response.data.objet)
            settypeMarche(response.data.typeMarche)
            setEstimation(response.data.estimation)
            setPme(response.data.pme)
            //
            setMoisPublicationPrevisionnelle(response.data.moisPublicationPrevisionnelle)
            setDateOuverturePrevisionnelle(response.data.dateOuverturePrevisionnelle)
            // 
            setDatetransmisCe(response.data.datetransmisCe)
            setDateobservationMc(response.data.dateobservationMc)
            setDateOuvertureReelle(response.data.dateOuvertureReelle)
            setDateJugement(response.data.dateJugement)
            set0bservations(response.data.observations)

        }).catch(error => {
            console.log(error)
        })
    }, [])

    const title = () => {

        if(id){
            return <h2 className = "text-center">Update Appel Offre</h2>
        }else{
            return <h2 className = "text-center">Add Appel Offre</h2>
        }
    }

    return (
        <div>
           <br /><br />
           <div className = "container">
                <div className = "row">
                    <div className = "card col-md-6 offset-md-3 offset-md-3">
                       {
                           title()
                       }
                        <div className = "card-body">
                            <form>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Numero d'appel d'offre :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter Numero d'appel d'offre"
                                        name = "numero"
                                        className = "form-control"
                                        value = {numero}
                                        onChange = {(e) => setNumero(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Entité :</label>
                                        <select
                                        className="form-select"
                                        value = {entite}
                                        onChange = {(e) => setEntite(e.target.value)}                                    >
                                        <option selected>ENTITE</option>
                                        <option value="DPF">DPF</option>
                                        <option value="DGR">DGR</option>
                                        <option value="DA">DA</option>
                                        <option value="DDA">DDA</option>
                                        <option value="DDDA">DDDA</option>
                                        <option value="DRH">DRH</option>
                                        <option value="SAICG">SAICG</option>
                                        <option value="SAICG">SMG</option>
                                    </select>                                   
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Objet :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter Objet"
                                        name = "Objet"
                                        className = "form-control"
                                        value = {objet}
                                        onChange = {(e) => setObjet(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Type Marché :</label>                                  

                                        <select
                                        className="form-select"
                                        value = {typeMarche}
                                        onChange = {(e) => settypeMarche(e.target.value)}
                                    >
                                        <option selected>TYPE MARCHE</option>
                                        <option value="F">F</option>
                                        <option value="S">S</option>
                                        <option value="T">T</option>
                                    </select>
                                  
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Estimation :</label>
                                    <input
                                        type = "number"
                                        placeholder = "Enter Estimation"
                                        name = "Estimation"
                                        className = "form-control"
                                        value = {estimation}
                                        onChange = {(e) => setEstimation(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> PME :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter PME"
                                        name = "PME"
                                        className = "form-control"
                                        value = {pme}
                                        onChange = {(e) => setPme(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Date de publication Prévisionnelle	 :</label>
                                    <input
                                        type = "date"
                                        placeholder = "Date de publication Prévisionnelle"
                                        name = "moisPublicationPrevisionnelle"
                                        className = "form-control"
                                        value = {moisPublicationPrevisionnelle}
                                        onChange = {(e) => setMoisPublicationPrevisionnelle(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> DATE D’OUVERTURE Prévisionnelle :</label>
                                    <input
                                        type = "date"
                                        placeholder = "DATE D’OUVERTURE Prévisionnelle"
                                        name = "DateJugement"
                                        className = "form-control"
                                        value = {dateOuverturePrevisionnelle}
                                        onChange = {(e) => setDateOuverturePrevisionnelle(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Transmis CE :</label>
                                    <input
                                        type = "date"
                                        placeholder = "Date Transmis CE"
                                        name = "Observations"
                                        className = "form-control"
                                        value = {datetransmisCe}
                                        onChange = {(e) => setDatetransmisCe(e.target.value)}
                                    >
                                    </input>
                                </div>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Observation MC :</label>
                                    <input
                                        type = "date"
                                        placeholder = "Date Observation MC"
                                        name = "dateobservationMc"
                                        className = "form-control"
                                        value = {dateobservationMc}
                                        onChange = {(e) => setDateobservationMc(e.target.value)}
                                    >
                                    </input>
                                </div>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Date ouverture Reelle:</label>
                                    <input
                                        type = "date"
                                        placeholder = "Date ouverture Reelle"
                                        name = "dateOuvertureReelle"
                                        className = "form-control"
                                        value = {dateOuvertureReelle}
                                        onChange = {(e) => setDateOuvertureReelle(e.target.value)}
                                    >
                                    </input>
                                </div>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Date jugement	:</label>
                                    <input
                                        type = "date"
                                        placeholder = "Date jugement"
                                        name = "dateJugement"
                                        className = "form-control"
                                        value = {dateJugement}
                                        onChange = {(e) => setDateJugement(e.target.value)}
                                    >
                                    </input>
                                </div>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> OSERVATIONS:</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter OSERVATIONS"
                                        name = "observations"
                                        className = "form-control"
                                        value = {observations}
                                        onChange = {(e) => set0bservations(e.target.value)}
                                    >
                                    </input>
                                </div>
                                        <div>
                                
                                <Link to="/appelOffres"   className="btn btn-danger"> Cancel </Link>
                                <button className = "btn btn-success" style={{ marginLeft: "30px" }} onClick = {(e) => saveOrUpdatedAppelOffre(e)} >Submit </button>
                                       </div>
                            </form>

                        </div>
                    </div>
                </div>

           </div>

        </div>
    )
}

export default AddAppelOffreComponent