import React, { useState }  from 'react';
import '../../Homepage.css';
import med from "../../assets/med.svg";
import Home from "./Home.js";
import Footer from "./Footer.js";
function Homepage() {
    return (
        <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
     

      {/*  Page content */}
      <main className="flex-grow">
        <Home/>
        {/*  Page sections */}

      </main>

      {/*  Site footer */}
      <Footer />

    </div>
    )
}

export default Homepage
