import React from "react";
import { FaRegUser, FaBars } from "react-icons/fa";
import { TbBrandBooking } from "react-icons/tb";
import { GoPackage } from "react-icons/go";
import { NavLink } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { MdContactPhone } from "react-icons/md";
const Sidebar = ({ childran }) => {
  const menuItem = [
    {
      path: "/AdminHome",
      name: "User Detail",
      icon: <FaRegUser />,
    },
    {
      path: "/Packages",
      name: "Packages",
      icon: <GoPackage />,
    },
    {
      path: "/Destination",
      name: "Destination",
      icon: <FaLocationDot />,
    },
    {
      path: "/Contactpage",
      name: "Contact",
      icon: <MdContactPhone />,
    },
    {
      path: "/Booking",
      name: "Booking",
      icon: <TbBrandBooking />,
    },
  ];
  return (
    <div className="container">
      <div className="sidebar">
        <div className="top-section">
          <h1 className="logo">Logo</h1>
          <div className="bars">
            <FaBars />
          </div>
          {menuItem.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className="link"
              activeClassName="active"
            >
              {" "}
              <div className="icon">{item.icon}</div>
              <div className="link_text">{item.name}</div>
            </NavLink>
          ))}
        </div>
        <main>{childran}</main>
      </div>
    </div>
  );
};

export default Sidebar;
