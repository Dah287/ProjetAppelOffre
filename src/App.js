import './App.css';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import AddEmployeeComponent from './components/AddEmployeeComponent';
import ListAppelOffreComponent from './components/ListAppelOffreComponent';
import AddAppelOffreComponent from './components/AddAppelOffreComponent';
import DashboardAppelOffreComponent from './components/DashboardAppelOffreComponent';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';
import LoginComponent from './components/LoginComponent';
import ListAppelOffreParEntiteComponent from './components/ListAppelOffreParEntiteComponent';

function App() {

  const isAuthenticated = !!localStorage.getItem('user'); // Vérifie si l'utilisateur est connecté

  return (
    <div>
{/* <Router>
<HeaderComponent/>
      <ListAppelOffreComponent/>
<FooterComponent/>    
</Router>   */}
      <Router>
        <HeaderComponent />
        <div className= "container-fluid">
          {/* <Switch>
              <Route exact path = "/" component = {ListAppelOffreComponent}></Route>
              <Route path = "/appelOffres" component = {ListAppelOffreComponent}></Route>
              <Route path = "/add-appeloffre" component = {AddAppelOffreComponent} ></Route>
              <Route path = "/edit-employee/:id" component = {AddAppelOffreComponent}></Route>
              <Route path = "/dashboard" component = {DashboardAppelOffreComponent}></Route>
            </Switch> */}
              <Switch>

              <Route exact path = "/" component = {LoginComponent}></Route>
              <Route path = "/appelOffres" component = {ListAppelOffreComponent}></Route>
              <Route path = "/add-appeloffre/:entt" component = {AddAppelOffreComponent} ></Route>
              <Route path = "/edit-employee/:id/:entitee" component = {AddAppelOffreComponent}></Route>
              <Route path = "/dashboard" component = {DashboardAppelOffreComponent}></Route>
              <Route path = "/login" component = {LoginComponent}></Route>
              <Route path = "/ListAppelOffreParEntite/:entitee" component = {ListAppelOffreParEntiteComponent}></Route>
              <Route path = "/appelOffres/:enttt" component = {ListAppelOffreComponent}></Route>
            </Switch>
            {/* <FooterComponent /> */}
        </div>        
       
        </Router>
    </div>
  );
}

export default App;
