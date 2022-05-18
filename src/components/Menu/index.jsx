import "./style.scss";
import { NavLink } from "react-router-dom";
import { Box } from "@chakra-ui/react";

export const Menu = ({ flexDir }) => {
  return (
    <Box display="flex" flexDir={flexDir}>
      <NavLink className="main-menu-item" to="/">
        Radio
      </NavLink>
      {/* <NavLink className="main-menu-item" to="/events">
        Events
      </NavLink> */}
      {/* <a className="main-menu-item" target="_blank" href="https://irc.def.am/?channel=#joinrave">
        IRC Chat
      </a> */}
      <NavLink className="main-menu-item" to="/submit-music">
        Submit Music
      </NavLink>
      <NavLink className="main-menu-item" to="/contact-us">
        Contact Us
      </NavLink>
    </Box>
  );
};

export default Menu;
