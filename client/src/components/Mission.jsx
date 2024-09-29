import React from "react";
import blockchain1 from '../../images/blockchain1.png'

const MissionVision = () => (
  <div id='mission' className="flex w-full justify-center items-center gradient-bg-services">
    <div className="flex flex-col md:flex-row items-center justify-between md:p-20 py-12 px-4">
      {/* Text Section */}
      <div className="flex-1 flex flex-col justify-start items-start ml-10 mb-10 md:mr-10">
        {/* Mission Section */}
        <div className="mb-10">
          <h1 className="text-black text-3xl sm:text-5xl py-2">Our Mission</h1>
          <p className="text-left my-2 text-black font-light md:w-9/12 w-11/12 text-base">
            Our mission at ClimateCrew is to provide innovative solutions and
            services that empower our clients to harness the full potential of
            sustainable technology and practices for a healthier planet.
          </p>
        </div>

        {/* Vision Section */}
        <div>
          <h1 className="text-black text-3xl sm:text-5xl py-2">Our Vision</h1>
          <p className="text-left my-2 text-black font-light md:w-9/12 w-11/12 text-base">
            At ClimateCrew, our vision is to lead the global transformation
            towards a more accessible, secure, and decentralized environmental
            future. We envision a world where sustainable technology empowers
            individuals and organizations, transcending traditional
            environmental boundaries and fostering ecological inclusion for all.
          </p>
        </div>
      </div>

      {/* Image Section */}
      <div className="flex-1">
        <img
          src={blockchain1  }
          alt="ClimateCrew"
          className="w-full h-auto object-cover rounded-lg"
        />
      </div>
    </div>
  </div>
);

export default MissionVision;
