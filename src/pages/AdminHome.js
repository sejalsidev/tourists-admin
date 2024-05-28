import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar"; // Corrected import
import SupervisedUserCircleOutlinedIcon from "@mui/icons-material/SupervisedUserCircleOutlined";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import ContactPhoneOutlinedIcon from "@mui/icons-material/ContactPhoneOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import { Navbar } from "react-bootstrap";
import "./sidebar.css";

const AdminHome = () => {
  return (
    <>
      <Navbar
        className="navbar"
        style={{ position: "sticky", top: 0, zIndex: 1000 }}
      >
        <img
          src={require("../images/travel-logo.png")}
          style={{ width: "auto", height: "40px", marginLeft: "10px" }}
        />
      </Navbar>
      <div className="row">
        <div className="col-2 admin-sidebar">
          <ProSidebar>
            {" "}
            <Menu
              style={{ color: "white" }}
              menuItemStyles={{
                button: {
                  color: "wh8f8888fb",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "#8f8888fb",
                    border: "1px solid #16aaac",
                  },
                  [`&.active`]: {
                    backgroundColor: "#8f8888fb",
                    color: "#b6c8d9",
                  },
                },
              }}
            >
              <MenuItem
                sx={{ display: "flex", alignItems: "center" }}
                className=""
              >
                <NavLink to={"UserDetail"}>
                  {" "}
                  <SupervisedUserCircleOutlinedIcon
                    sx={{ marginRight: "8px" }}
                  />{" "}
                  User Detail
                </NavLink>
              </MenuItem>
              <MenuItem sx={{ display: "flex", alignItems: "center" }}>
                <NavLink to={"Packages"}>
                  {" "}
                  <Inventory2Icon sx={{ marginRight: "15px" }} /> Packages
                </NavLink>
              </MenuItem>
              <MenuItem sx={{ display: "flex", alignItems: "center" }}>
                <NavLink to={"Destination"}>
                  {" "}
                  <FmdGoodOutlinedIcon sx={{ marginRight: "8px" }} />{" "}
                  Destination
                </NavLink>
              </MenuItem>
              <MenuItem sx={{ display: "flex", alignItems: "center" }}>
                <NavLink to={"Contact"}>
                  {" "}
                  <ContactPhoneOutlinedIcon sx={{ marginRight: "25px" }} />{" "}
                  Contact
                </NavLink>
              </MenuItem>
              <MenuItem sx={{ display: "flex", alignItems: "center" }}>
                <NavLink to={"Booking"}>
                  {" "}
                  <LibraryBooksOutlinedIcon sx={{ marginRight: "25px" }} />
                  Booking
                </NavLink>
              </MenuItem>
            </Menu>
          </ProSidebar>{" "}
        </div>
        <div className="col-10">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminHome;
