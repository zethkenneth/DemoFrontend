import React from 'react';
import '../../Homepage.css';
import med from "../../assets/med.svg";
function Homepage() {
    return (
        <div className="container">
            <header>
                     <img src={med} alt="" />
                <div> 
                 <h1><strong>WMSU CLINIC</strong> MONITORING AND INVENTORY SYSTEM</h1>
                <p> a web-based clinic system developed by Debug.Go to support the WMSU-Health Service Center's daily operation.  </p>
                </div>
             </header>
        </div>
        
    )
}

export default Homepage
