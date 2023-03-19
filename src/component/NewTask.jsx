import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import Accordion from "react-bootstrap/Accordion";
import threedots from "./../images/threedots.png";
import schedule from "./../images/schedule_24px.png";
import edit from "./../images/edit_24px.png";
import HeaderTasks from "../component/headerTask";

const NewTask = (style, key, onClick, selected, onChange) => {
  const [startDate, setStartDate] = useState(new Date());
  const [messagess, setMessagess] = useState([]);
  const [listchatopen, setlistchatopen] = useState(false);
  const openlistchat = (e) => {
    setlistchatopen(!listchatopen);
  };
  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/1/comments`)
      .then((res) => {
        const messages = res.data;
        setMessagess(messages);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <>
      <div className="chat-box" style={style}>
        <>
          <div className="header">
            <HeaderTasks
            // onChange={(e) => setSearch(e.target.value.toLowerCase())}
            />
          </div>
          <div id="listUsers">
            <div className="overflow-auto all-list-chatting accordion">
              {messagess?.length > 1
                ? messagess.map((item) => {
                    return (
                      <>
                        <div
                          className="list-chatting d-flex p-2 m-3 form-check accordion-item d-flex flex-column"
                          style={{ backgroundColor: "#white" }}
                          key={item.id}
                          onClick={openlistchat}
                        >
                          <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                              <Accordion.Header>
                                <div
                                  className="d-flex flex-row justify-content-between"
                                  style={{
                                    width: "100%",
                                    color: "black",
                                  }}
                                >
                                  <div>
                                    <input
                                      className="form-check-input ms-2"
                                      type="checkbox"
                                      value=""
                                      id="flexCheckDefault"
                                    />
                                    <label
                                      className="form-check-label"
                                      for="flexCheckDefault"
                                    >
                                      <h5
                                        onClick={openlistchat}
                                        className="d-flex align-items-start mx-4"
                                      >
                                        {item.name}
                                      </h5>
                                    </label>
                                  </div>

                                  <div className="btn d-flex justify-content-end align-self-center">
                                    <p>
                                      <DatePicker
                                        selected={startDate}
                                        className="btn"
                                      />
                                    </p>
                                    <img
                                      src={threedots}
                                      alt=""
                                      height={6}
                                      className="d-flex align-self-center mx-2"
                                    />
                                  </div>
                                </div>
                              </Accordion.Header>

                              <Accordion.Body>
                                <div className="ms-3 d-flex flex-row">
                                  <img
                                    src={schedule}
                                    alt=""
                                    className=" m-2"
                                    width={20}
                                    height={20}
                                  />

                                  <div>
                                    <DatePicker
                                      selected={startDate}
                                      onChange={(date) => setStartDate(date)}
                                    />
                                  </div>
                                </div>
                                <div className="ms-3 d-flex flex-row">
                                  <img
                                    src={edit}
                                    alt=""
                                    className=" m-2"
                                    width={20}
                                    height={20}
                                  />
                                  <p className="last-message d-flex align-items-start">
                                    {item.body}
                                  </p>
                                </div>
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        </div>
                        <hr className="mx-3" />
                      </>
                    );
                  })
                : "No description"}
            </div>
          </div>
        </>
        <div id="listUsers">
          <div className="overflow-auto all-list-chatting accordion">
            <>
              <div
                className="list-chatting d-flex p-2 m-3 form-check accordion-item d-flex flex-column"
                style={{ backgroundColor: "#white" }}
                key={key}
                onClick={onClick}
              >
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <div
                        className="d-flex flex-row justify-content-between"
                        style={{
                          width: "100%",
                          color: "black",
                        }}
                      >
                        <div>
                          <input
                            className="form-check-input ms-2"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                          <label
                            className="form-check-label"
                            for="flexCheckDefault"
                          >
                            <input placeholder="Type Task Title" />
                          </label>
                        </div>
                      </div>
                    </Accordion.Header>

                    <Accordion.Body>
                      <div className="ms-3 d-flex flex-row">
                        <img
                          src={schedule}
                          alt=""
                          className=" m-2"
                          width={20}
                          height={20}
                        />

                        <div>
                          <DatePicker selected={selected} onChange={onChange} />
                        </div>
                      </div>
                      <div className="ms-3 d-flex flex-row">
                        <img
                          src={edit}
                          alt=""
                          className=" m-2"
                          width={20}
                          height={20}
                        />
                        <p className="last-message d-flex align-items-start">
                          No Description
                        </p>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
              <hr className="mx-3" />
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewTask;
