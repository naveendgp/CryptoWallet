import React from "react";
import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";

const ServiceCard = ({ color, title, icon, subtitle }) => (
  <div id="services" className="flex flex-row justify-start items-start blue-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
    <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
      {icon}
    </div>
    <div className="ml-5 flex flex-col flex-1">
      <h3 className="mt-2 text-white text-lg">{title}</h3>
      <p className="mt-1 text-white text-sm md:w-9/12">
        {subtitle}
      </p>
    </div>
  </div>
);

const Services = () => (
  <div className="flex w-full justify-center items-center gradient-bg-services">
    <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
      <div className="flex-1 flex flex-col justify-start items-start">
        <h1 className="text-black text-3xl sm:text-5xl py-2  ">
          TECHNOLOGY IN
          <br />
          CLIMATE CREW
        </h1>
        <p className="text-left my-2 text-black font-light md:w-9/12 w-11/12 text-base">
          Blockchain ensures transparency, security, and trust in managing
          transactions within our green energy project. By decentralizing
          control, users benefit from real-time verification and immutability of
          their investments. This empowers participants while supporting a
          sustainable future.
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-start items-center">
        <ServiceCard
          color="bg-[#2952E3]"
          title="Security gurantee"
          icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
          subtitle="Your data security is our top priority. With decentralized architecture, your information remains under your control. No more central points of vulnerability."
        />
        <ServiceCard
          color="bg-[#8945F8]"
          title="Best exchange rates"
          icon={<BiSearchAlt fontSize={21} className="text-white" />}
          subtitle="Unlock a borderless experience. With decentralization, you're not limited by geographic boundaries. Engage with users, content, and services from around the world.

"
        />
        <ServiceCard
          color="bg-[#F84550]"
          title="Fastest transactions"
          icon={<RiHeart2Fill fontSize={21} className="text-white" />}
          subtitle="Regain control over your digital presence. On the rich crowd, you're the master of your data. Choose who accesses your information and how it's used."
        />
      </div>
    </div>
  </div>
);

export default Services;
