import React from 'react'
import med from '../../assets/med.svg'
function Home() {
    
    return (
      <section className="relevant bg-blue-300">
  
        <div className="grid bg-red-300 max-w-6xl px-4 sm:px-6">
            {/* Section header */}
                <div className=" pb-20 m-10">
                    <h1 className="text-3xl md:text-2x1 font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">WMSU CLINIC MONITORING <span className="bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">AND INVENTORY SYSTEM</span></h1>
                        <div className="max-w-3xl ">
                            <p className="text-base md:text-sm  pb-text-gray-600 " data-aos="zoom-y-out" data-aos-delay="150">a web-based clinic system is developed to support the Health Service Center daily operation which is done manually before. This system will involve some of the clinic operation that starts from patient’s registration until giving of medicines. The important thing is it will become easier for the data record and retrieval because of its database on the cloud. This system also has notifiable inventory system for the medicines  </p>

                        </div>
                </div>
        </div>
        <div className="">
          
        </div>
        <img className="bg-green-300 mx-1 object-contain h-48 w-full" src={med}/>
      </section>
    );
  }

export default Home
