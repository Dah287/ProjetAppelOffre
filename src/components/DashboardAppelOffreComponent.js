import React, {useState, useEffect} from 'react'
import AppelOffreService from '../services/AppelOffreService'
import { Link ,useHistory} from 'react-router-dom'


const DashboardAppelOffreComponent = () => {

    const [data, setData] = useState([]);
    
      useEffect(() => {
        
            getdashboard();
            
        }, [])

        const getdashboard = () => {
            AppelOffreService.getdashboard().then((response) => {
                setData(response.data)
            }).catch(error =>{
                console.log(error);
            })
        } 


      return (
    
        
        <div className="container-fluid">
        <h2 className="text-center">Tableau de Bord - Appels d'Offres</h2>

    <br></br>
        {/* Table */}
        <div className="table-responsive">
            <table className="table table-bordered table-striped ff">
               <thead>
                <tr >
                    <th >ENTITE</th>
                    <th>Appel d’offres à lancer</th>
                    <th>Appel d’offres transmis au CE</th>
                    <th>Appel d’offres lancé</th>
                    {/* <th>Appel d’offres en cours D'examen</th> */}
                    <th>Appel d’offres jugé</th>
                </tr>
                </thead>
                <tbody>
          {data.map((row, index) => (
            <tr  key={index}>
              <td className="header-entite">{row.entite}</td>
              <td>{row.appelOffresALancer}</td>
              <td>{row.appelOffresTransmisCe}</td>
              <td>{row.appelOffresLance}</td>
              {/* <td>{row.appelOffresEnCoursExamen}</td> */}
              <td>{row.appelOffresJuge}</td>
            </tr>
          ))}
                </tbody>
                <tfoot>
                <tr className="footer-row">
                    <td>Total</td>
                    <td>{data.reduce((sum, row) => sum + row.appelOffresALancer, 0)}</td>
                    <td>{data.reduce((sum, row) => sum + row.appelOffresTransmisCe, 0)}</td>
                    <td>{data.reduce((sum, row) => sum + row.appelOffresLance, 0)}</td>
                    {/* <td>{data.reduce((sum, row) => sum + row.appelOffresEnCoursExamen, 0)}</td> */}
                    <td>{data.reduce((sum, row) => sum + row.appelOffresJuge, 0)}</td>
                </tr>
                </tfoot>
            </table>
        </div>
    </div>
    
      )
}

export default DashboardAppelOffreComponent