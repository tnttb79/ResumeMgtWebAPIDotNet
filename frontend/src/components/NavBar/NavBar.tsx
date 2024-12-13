import React from "react";
import { Link, NavLink } from "react-router";
import { useTheme } from "../../context/theme.context";
import Sun from "../../assets/sun";
import Moon from "../../assets/moon";
import styles from "./NavBar.module.scss";

const NavBar: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <nav className={styles["nav-bar"]}>
      <Link className={styles["navbar-logo"]} to='/'>
        MyResume
      </Link>
      <ul className={styles["navbar-btn"]}>
        <li>
          <NavLink to='/company' className={styles["nav-link"]}>
            Company
          </NavLink>
        </li>
        <li>
          <NavLink to='/job' className={styles["nav-link"]}>
            Job
          </NavLink>
        </li>
        <li>
          <NavLink to='/candidate' className={styles["nav-link"]}>
            Candidate
          </NavLink>
        </li>
      </ul>
      <button onClick={toggleTheme} className={styles["theme-toggle"]}>
        {isDarkMode ? <Sun /> : <Moon />}
      </button>
    </nav>
  );
};

export default NavBar;
