import axios from 'axios';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import AppelOffreService from '../services/AppelOffreService';

const LoginComponent = () => {



    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const history = useHistory(); // Hook pour naviguer

    const user = {username, password}; 


    const loginf = (e) => {
        e.preventDefault();

        const utilisateuropt = {username, password}

    
            AppelOffreService.login(utilisateuropt).then((response) => {
                console.log(response.data)
                if(response.data=== "admin"){
                    history.push('/appelOffres')
                }
                else if(response.data=== "no"){
                  setMessage("mot de pass ou username incorct")
                }else{
                  let entitee = response.data;
                  setMessage("vert " +entitee)
                  history.push(`/ListAppelOffreParEntite/${entitee}`);
                  
             //     <Link className="btn btn-info" to={`/edit-employee/${employee.id}`} >Update</Link>
                }
               
            }).catch(error => {
                console.log(error)
            })

        
        
    }

  return (

    
    <div className="login-container">
        <br></br>
        
      <h2>Connexion</h2>
      <form>
        <div className="form-group">
          <label>Nom d'utilisateur</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Mot de passe</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          className="btn btn-success"
          onClick={(e) => loginf(e)}
        >
          Submit
        </button>
      </form>
      <br></br>
      {message && <p style={{ color: "red" }}>{message}</p>}
    </div>
  )
}

export default LoginComponent
