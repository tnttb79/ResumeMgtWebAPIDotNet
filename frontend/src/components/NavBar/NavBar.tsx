import React from "react";
import { Link, NavLink } from "react-router";
import { useTheme } from "../../context/ThemeContext";
import styles from "./NavBar.module.scss";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const NavBar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className={styles.navBar}>
      <Link className={styles.navbarLogo} to='/'>
        MyResume
      </Link>
      <ul className={styles.navbarBtn}>
        <li>
          <NavLink to='/company' className={styles.navLink}>
            Company
          </NavLink>
        </li>
        <li>
          <NavLink to='/job' className={styles.navLink}>
            Job
          </NavLink>
        </li>
        <li>
          <NavLink to='/candidate' className={styles.navLink}>
            Candidate
          </NavLink>
        </li>
        <button
          onClick={toggleTheme}
          className={styles.themeToggle}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </button>
      </ul>
    </nav>
  );
};

export default NavBar;
