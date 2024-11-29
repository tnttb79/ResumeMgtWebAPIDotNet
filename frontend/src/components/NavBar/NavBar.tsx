import React from "react";
import { Link, NavLink } from "react-router";
import { useTheme } from "../../context/theme.context";
import "./NavBar.scss";

const NavBar: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <nav className='nav-bar'>
      <Link className='navbar-logo' to='/'>
        MyResume
      </Link>
      <ul className='navbar-btn'>
        <li>
          <NavLink to='/company' className='nav-link'>
            Company
          </NavLink>
        </li>
        <li>
          <NavLink to='/job' className='nav-link'>
            Job
          </NavLink>
        </li>
        <li>
          <NavLink to='/candidate' className='nav-link'>
            Candidate
          </NavLink>
        </li>
      </ul>
      <button onClick={toggleTheme} className='theme-toggle'>
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </nav>
  );
};

export default NavBar;