import React from "react";
import { Link } from "react-router-dom";

export default function cover() {
  return (
    <div
      className="align-items-center d-flex justify-content-center"
      style={{ backgroundColor: "#0F8A69", height: "100vh", width: "100vw" }}
    >
      <Link to="./quicks">
        <button className="row btn">
          <h1
            className="d-flex justify-content-center "
            style={{ color: "white", fontSize: "190px", fontWeight: "bold" }}
          >
            Simple
          </h1>
          <h1
            className="d-flex justify-content-center "
            style={{ color: "white", fontSize: "190px", fontWeight: "bold" }}
          >
            Quicks
          </h1>
        </button>
      </Link>
    </div>
  );
}
