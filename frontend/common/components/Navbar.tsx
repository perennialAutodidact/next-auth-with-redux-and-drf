import React from "react";
import navbarStyles from "../../styles/navbar.module.css";
import Link from "next/link";
const Navbar = () => {
  return (
    <div className={navbarStyles.navbar}>
      <div className={navbarStyles.navItem}>
        <Link href="/login" passHref>
          <a>Log In</a>
        </Link>
        </div>
        <div className={navbarStyles.navItem}>
        <Link href="/register" passHref>
          <a>Register</a>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
