import React from "react";
import styles from "./stylecomp.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import searchImg from "./../images/search_24px.png";

const Search = ({ onChange, onClick }) => {
  return (
    <div
      className="container"
      style={{
        height: "80px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "10px 10px 0 0 ",
        padding: "10px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
        backgroundColor: "white",
      }}
    >
      <input
        type="search"
        className={styles.search}
        placeholder="Search  "
        onChange={onChange}
      />
      <div className={styles.searchImg}>
        <img
          src={searchImg}
          alt="search"
          style={{ width: "20px" }}
          onClick={onClick}
        />
      </div>
    </div>
  );
};

export default Search;
