import React from "react";
import DatePicker from "react-datepicker";

const ListUserss = ({
  username,
  key,
  src,
  onClick,
  openlistchat,
  name,
  selected,
  lastChat,
}) => {
  return (
    <>
      <div
        className="list-chatting d-flex p-2 m-3"
        style={{ backgroundColor: "#white" }}
        key={key}
        onClick={openlistchat}
      >
        <img
          src={src}
          alt="user pict"
          width="70"
          height="45"
          style={{ borderRadius: "10px" }}
        />

        <div className="ms-3">
          <p onClick={onClick} className="d-flex align-items-start">
            <h5 style={{ color: "#2F80ED" }}>{name}</h5>

            <p style={{ color: "gray" }}>
              <DatePicker
                selected={selected}
                className="btn"
                dateFormat=" dd/mm/yyyy h:mm a"
              />
            </p>
          </p>
          <p className="last-message d-flex align-items-start">
            {" "}
            <b>{username}: </b>{" "}
          </p>
          <p className="last-message d-flex text-start">{lastChat} </p>
        </div>
      </div>
      <hr className="mx-3" />
    </>
  );
};

export default ListUserss;
