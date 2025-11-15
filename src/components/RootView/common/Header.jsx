import { MapPin } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
const Header = () => {
  return (
    <div className="bg-[#010f1c] text-white">
      <div className="grid grid-cols-12 mx-auto">
        <div className="logo col-span-2 flex items-center justify-center">
          <Link>
          <img src="https://wordpress.themehour.net/pizzan/wp-content/uploads/2023/06/logo-white.svg" alt="E_Restaurant" />
          </Link> 
        </div>
        <div className="headerFull col-span-10">
          <div className="headerTop bg-[#ea0d29] flex justify-between items-center lg:pr-24">
            <p className="pl-1 text-sm font-semibold">Free Delivery on all orders Over $50</p>
            <div className="flex p-2 items-center gap-4">
              <MapPin size={17} />
              <p className="text-sm font-semibold">Rd. Allentown, New Mexico 31134</p> 
              <div className="reach-us flex gap-4">
                <Link><FaFacebook /></Link>
                <Link><FaTwitter  /></Link>
                <Link><FaLinkedin /></Link>
                <Link><FaInstagram /></Link>
              </div>
            </div>
          </div>
          <div className="navBar">
            <Navbar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;