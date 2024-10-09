import React from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";  
import { Link } from "react-router-dom";

const NavBarItem = ({ title, href, classprops }) => (
  <li className={`mx-4 cursor-pointer ${classprops}`}>
    <a href={href}>{title}</a>
  </li>
);

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);

  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img src={logo} alt="logo" className="w-32 cursor-pointer" />
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {[
          { title: "About Us", href: "#aboutus" },
          { title: "Services", href: "#services" },
          { title: "Mission", href: "#mission" },
        ].map((item, index) => (
          <NavBarItem
            key={item.title + index}
            title={item.title}
            href={item.href}
          />
        ))}

        <Link
          to={"/login"}
          className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]"
        >
          Login
        </Link>
        <a href="#register">
          <Link
            to={"/register"}
            className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]"
          >
            Registration
          </Link>
        </a>
      </ul>
      <div className="flex relative">
        {!toggleMenu && (
          <HiMenuAlt4
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <AiOutlineClose
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(false)}
          />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2">
              <AiOutlineClose onClick={() => setToggleMenu(false)} />
            </li>
            {[
              { title: "About Us", href: "#aboutus" },
              { title: "Services", href: "#services" },
              { title: "Mission", href: "#mission" },
            ].map((item, index) => (
              <NavBarItem
                key={item.title + index}
                title={item.title}
                href={item.href}
                classprops="my-2 text-lg"
              />
            ))}
            <Link to={"/login"} className="my-2 text-lg">
              Login
            </Link>
            <Link to="/register" className="my-2 text-lg">
              Registration
            </Link>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
