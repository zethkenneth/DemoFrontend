import React  from 'react';
import '../../Homepage.css';

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
