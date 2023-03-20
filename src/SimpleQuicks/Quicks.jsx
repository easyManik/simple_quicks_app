import React, { useEffect, useState } from "react";
import "./Style.css";
import chat from "./../images/chat.png";
import tasks from "./../images/tasks.png";
import Search from "../component/search";
import axios from "axios";
import avatar from "./../images/Group 1603.png";
import { useParams, useHistory } from "react-router-dom";
import HeaderTasks from "../component/headerTask";
import Moment from "react-moment";
import schedule from "./../images/schedule_24px.png";
import edit from "./../images/edit_24px.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Accordion from "react-bootstrap/Accordion";
import threedots from "./../images/threedots.png";
import backimg from "./../images/arrow_back_24px.png";
import { useNavigate } from "react-router-dom";
import ListUserss from "../component/ListUsers";

export const Quicks = () => {
  let hide = {
    display: "none",
  };
  let show = {
    display: "block",
  };

  const [chatopen, setChatopen] = useState(false);
  const toggleChat = (e) => {
    setChatopen(!chatopen);
  };

  const [tasksOpen, setTasks] = useState(false);
  const toggleTask = (e) => {
    setTasks(!tasksOpen);
  };

  const [listchatopen, setlistchatopen] = useState(false);
  const openlistchat = (e) => {
    setlistchatopen(!listchatopen);
  };

  const [newTask, setOpenNewTask] = useState(false);
  const openNewTask = (e) => {
    setOpenNewTask(!newTask);
  };

  const navigate = useNavigate();
  const goBack = () => {
    navigate(0);
  };
  const [search] = useState("");

  const url = `https://jsonplaceholder.typicode.com/users`;
  useEffect(() => {
    if (search !== "") {
      // eslint-disable-next-line react-hooks/exhaustive-deps, no-const-assign
      url = `${url}?search=${search}`;
    }
    fetchListChat(url);
  }, [search]);

  const [message, setMessage] = useState("");
  const [messagess, setMessagess] = useState([]);
  const [listUser, setListUser] = useState([]);
  const [dataUser, setDataUser] = useState({});
  const [submited, setSubmited] = useState(false);
  const { id: idUser } = useParams();

  useEffect(() => {
    //get data photo user
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `https://jsonplaceholder.typicode.com/photos`
        );
        console.log("data user", res.data);
        res.data && setDataUser(res.data.company[0]);
      } catch (e) {
        console.log(e);
      }
    };
    if (idUser) {
      fetchUser();
    }
  }, [idUser]);
  const fetchListChat = async () => {
    try {
      const res = await axios.get(`https://jsonplaceholder.typicode.com/users`);
      console.log("list chat", res.data);
      res.data && setListUser(res.data);
      res.data && setDataUser(res.data[0]);
    } catch (e) {
      console.log(e);
    }
  };
  //list users
  useEffect(() => {
    fetchListChat();
  }, []);

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

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/1`)
      .then((res) => {
        const messages = res.data;
        setMessage(messages);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    if (submited) {
      const postHire = async () => {
        try {
          const res = await axios.post(
            `https://jsonplaceholder.typicode.com/posts`,
            {
              method: "POST",
              // body: JSON.stringify({
              //   title: "foo",
              //   body: "bar",
              //   userId: 1,
              // }),
              headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
            }
          );
          console.log("sukses post data", res.data);
          const message = res.data.body;
          setMessage(message);

          setSubmited(false);
        } catch (e) {
          console.log(e);
          setSubmited(false);
        }
      };
      postHire();
    }
  }, [submited, message]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() === "") {
      alert("enter valid message");
      return;
    }
    setMessage("");
    setSubmited(true);
  };

  //end of chat session

  //start tasks
  const [startDate, setStartDate] = useState(new Date());

  //end of tasks session
  return (
    <>
      <div
        style={{ backgroundColor: "gray", width: "100vw", height: "100vh" }}
      ></div>
      <div id="chatCon">
        {/*chat*/}
        <div style={chatopen ? show : hide}>
          <div className="chat-box">
            {listchatopen === false ? (
              <>
                <div className="header">
                  <Search
                  // onChange={(e) => setSearch(e.target.value.toLowerCase())}
                  />
                </div>
                <div id="listUsers">
                  <div className="overflow-auto all-list-chatting">
                    {listUser?.length > 1
                      ? listUser.map((item) => {
                          return (
                            <>
                              <ListUserss
                                key={item.id}
                                onClick={openlistchat}
                                src={avatar}
                                selected={startDate}
                                openlistchat={openlistchat}
                                name={item.company.name}
                                username={item.name}
                                lastChat={message.title}
                              />
                            </>
                          );
                        })
                      : "kosong"}
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* open chat */}
                <div>
                  {/*kepala chat*/}
                  <div
                    className="d-flex justify-content-between align-items-center p-2"
                    style={{
                      backgroundColor: "white",
                      marginBottom: "1px",
                      borderRadius: "10px 10px 0px 0px",
                      borderColor: "black",
                    }}
                  >
                    <div className="d-flex mx-3">
                      <button
                        style={{
                          backgroundColor: "white",
                          marginRight: "10px",
                        }}
                        onClick={goBack}
                      >
                        <img src={backimg} alt="" width={20} height={20} />
                      </button>

                      <div className="ms-3 d-flex align-self-center flex-column">
                        <h5
                          className=" text-start"
                          style={{ color: "#2F80ED" }}
                        >
                          {dataUser.company.name}
                        </h5>
                        <p className="text-start">
                          {messagess.length} Participants
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      class="btn-close"
                      aria-label="Close"
                      style={{
                        marginRight: "10px",
                        width: "6px",
                        height: "6px",
                      }}
                      onClick={toggleChat}
                    ></button>
                  </div>
                  {/*message*/}
                  <div id="listUsersChat">
                    <div>
                      <div id="scroll">
                        {messagess
                          ?.slice(0)
                          .reverse()
                          .map((item, index) =>
                            item.id === dataUser.id ? (
                              <>
                                <div
                                  className="sender d-flex justify-content-end align-items-start"
                                  key={index}
                                >
                                  <div
                                    className="chat-message-from p-2 mx-3   "
                                    style={{
                                      backgroundColor: "#EEDCFF ",
                                      borderRadius: "10px",
                                      width: "60vh",
                                    }}
                                  >
                                    <div className="text-start">
                                      {item.body}{" "}
                                    </div>

                                    <Moment
                                      format="LT"
                                      className="d-flex justify-content-start"
                                      style={{ color: "#4F4F4F" }}
                                    >
                                      {item.created_at}
                                    </Moment>
                                  </div>
                                </div>
                                <p
                                  className="mx-4 d-flex justify-content-end"
                                  style={{ color: "black" }}
                                >
                                  you
                                </p>
                              </>
                            ) : item.id !== dataUser.id ? (
                              <>
                                <div
                                  className="receive d-flex justify-content-start align-items-end mb-3"
                                  key={item.id}
                                >
                                  <div
                                    className="chat-message-to p-2 mx-3"
                                    style={{
                                      backgroundColor: "#FCEED3",
                                      borderRadius: "10px",
                                      width: "60vh",
                                    }}
                                  >
                                    <div className="text-start">
                                      {item.body}
                                    </div>
                                    <Moment
                                      format="LT"
                                      className="d-flex justify-content-end"
                                      style={{ color: "#4F4F4F" }}
                                    >
                                      {item.created_at}
                                    </Moment>
                                  </div>
                                </div>
                                <p
                                  className="mx-4 text-start"
                                  style={{ color: "#E5A443" }}
                                >
                                  {item.email}
                                </p>
                              </>
                            ) : (
                              ""
                            )
                          )}
                      </div>

                      {/*post chat*/}

                      <div className="foot" style={{ marginTop: "1px" }}>
                        <form
                          className="send-message footer-chat-message d-flex justify-content-center p-3"
                          style={{
                            backgroundColor: "white",
                            borderRadius: "0px 0px 10px 10px",
                          }}
                        >
                          <input
                            type="text"
                            placeholder="Type your message..."
                            required
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                          />

                          <button
                            className="btn mx-2 "
                            type="submit"
                            onClick={(e) => handleSendMessage(e)}
                            style={{
                              borderRadius: "10px",
                              backgroundColor: "#5E50A1",
                              color: "white",
                            }}
                          >
                            send
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/*tasks*/}
        <div className="chat-box" style={tasksOpen ? show : hide}>
          <>
            <div className="header">
              <HeaderTasks
                onClick={openNewTask}
                // onChange={(e) => setSearch(e.target.value.toLowerCase())}
              />
            </div>
            <div id="listUsers">
              {newTask === false ? (
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
                                          onChange={(date) =>
                                            setStartDate(date)
                                          }
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
              ) : (
                <div className="chat-box" style={tasksOpen ? show : hide}>
                  <div id="newtask">
                    <div className="overflow-auto all-list-chatting accordion">
                      <>
                        <div
                          className="list-chatting d-flex p-2 m-3 form-check accordion-item d-flex flex-column"
                          style={{ backgroundColor: "#white" }}
                          // key={key}
                          // onClick={onClick}
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
                                      <input
                                        placeholder="Type Task Title"
                                        style={{
                                          borderRadius: "5px",
                                          marginLeft: "20px",
                                        }}
                                      />
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
                                  <textarea
                                    placeholder="No Description"
                                    style={{ width: "100%" }}
                                  />
                                </div>
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        </div>
                        <hr className="mx-3" />
                      </>
                    </div>
                  </div>
                  <>
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
                                                onChange={(date) =>
                                                  setStartDate(date)
                                                }
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
                </div>
              )}
            </div>
          </>
        </div>
        <div className="pop row mt-3">
          <p className="col">
            <img onClick={toggleTask} src={tasks} alt="" />
          </p>

          <p className="col">
            <img onClick={toggleChat} src={chat} alt="" />
          </p>
        </div>
      </div>
    </>
  );
};
export default Quicks;
