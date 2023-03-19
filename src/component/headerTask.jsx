import React from "react";
import styles from "./stylecomp.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const HeaderTasks = ({ onChangeSortBy, onClick, value }) => {
  return (
    <div
      className="container"
      style={{
        display: "flex",
        borderRadius: "10px 10px 0  0 ",
        boxShadow: "1px 0  1px 0",
        justifyContent: "space-between",
        padding: "10px",
        background: "white",
      }}
    >
      <select
        className="p-1"
        style={{ borderRadius: "10px", width: "150px", marginLeft: "120px" }}
        defaultValue={"DEFAULT"}
        value={
          value
          // data.sortState
        }
        onChange={
          onChangeSortBy
          // (e) => setSortState(e.target.value)
        }
      >
        <option value="DEFAULT" style={{ color: "black" }}>
          My Tasks
        </option>
        <option value="" style={{ color: "black" }}>
          Personal Errands
        </option>
        <option value="" style={{ color: "black" }}>
          Urgent To-Do
        </option>
      </select>

      <button
        type="submit"
        className={styles["task-button"]}
        onClick={onClick}
        value=""
        title="Search"
      >
        New Task
      </button>
    </div>
  );
};

export default HeaderTasks;
