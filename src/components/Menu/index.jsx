import './style.scss';
import { NavLink } from 'react-router-dom';

export const Menu = () => {
  return (
    <ul className="main-menu">
      <NavLink className="main-menu-item" to="/">
        Radio
      </NavLink>
      <NavLink className="main-menu-item" to="/events">
        Events
      </NavLink>
      {/* <a className="main-menu-item" target="_blank" href="https://irc.def.am/?channel=#joinrave">
        IRC Chat
      </a> */}
      {/* <NavLink className="main-menu-item" to="/submit-music">
        Submit Music
      </NavLink>
     */}
      <a className="main-menu-item" href="mailto:joinrave@def.am">
        Contact Us
      </a>
    </ul>
  );
};

export default Menu;
