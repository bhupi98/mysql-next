import React from "react";
import Link from "next/link";
import styles from "../styles/Header.module.css";
function Header() {
  return (
    <>
      <div className={styles.header}>
        <h1>
          <Link href={"/"}>EmployeeManagement</Link>
        </h1>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <Link href={"/employees"}>employees</Link>
          </li>
          <li className={styles.li}>
            <Link href={"/addEmployee"}>AddEmployee</Link>
          </li>
          <li className={styles.li}>
            <Link href={"/about"}>about</Link>
          </li>
          <li className={styles.li}>
            <Link href={"/contact"}>contact</Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Header;
