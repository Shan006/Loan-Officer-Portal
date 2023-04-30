import React, { useState } from "react";
import SearchModal from "../components/ModalSearch";
import Notifications from "../components/DropdownNotifications";
import Help from "../components/DropdownHelp";
import UserMenu from "../components/DropdownProfile";
import { BsTelephone } from "react-icons/bs";
import { AiOutlineCloudUpload, AiOutlineMail } from "react-icons/ai";
import { BiMessageDots } from "react-icons/bi";
import { VscTasklist } from "react-icons/vsc";
import { toast } from "react-hot-toast";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { TailSpin } from "react-loader-spinner";

import { Link, useNavigate } from "react-router-dom";
// import {
//   Modal,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Button,
// } from "@windmill/react-ui";
import axios from "axios";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 20,
  pt: 3,
  px: 21,
  pb: 3,
};
function Header({ sidebarOpen, setSidebarOpen }) {
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSMSModalOpen, setisSMSModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [emailOpen, setEmailOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleEmailOpen = () => {
    setEmailOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleEmailClose = () => {
    setEmailOpen(false);
  };

  const [emailForm, setEmailForm] = useState({
    to: "",
    subject: "",
    message: "",
  });
  const [msgForm, setMsgForm] = useState({
    to: "",
    message: "",
  });
  const EmailFormHandler = (e) => {
    setEmailForm({
      ...emailForm,
      [e.target.name]: e.target.value,
    });
  };
  const MessageFormHandler = (e) => {
    setMsgForm({
      ...msgForm,
      [e.target.name]: e.target.value,
    });
  };
  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }

  const SendMsg = async () => {
    if (msgForm.to == "" && msgForm.message == "") {
      toast.warn("Please fill all the feilds!!!");
    } else {
      try {
        setLoading(true);
        const respo = await axios.post(
          `${import.meta.env.VITE_REACT_APP_SERVER_URL}/conversation/twilioSMS`,
          {
            to: msgForm.to,
            message: msgForm.message,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setLoading(false);
        setMsgForm("");
        setOpen(false);
        console.log("MSG response:", respo);
        toast.success("Message Sent Successfully");
      } catch (error) {
        console.log("Error while sending email ", error);
      }
    }
  };

  const SendMail = async () => {
    if (
      emailForm.to == "" &&
      emailForm.subject == "" &&
      emailForm.message == ""
    ) {
      toast.error("Please fill all the feilds!!!");
    } else {
      try {
        setLoading(true);
        const respo = await axios.post(
          `${import.meta.env.VITE_REACT_APP_SERVER_URL}/conversation/send`,
          {
            email: emailForm.to,
            subject: emailForm.subject,
            message: emailForm.message,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setEmailOpen(false);
        setLoading(false);
        setEmailForm("");
        console.log("Email response:", respo);
        toast.success("Email Sent Successfully");
      } catch (error) {
        console.log("Error while sending email ", error);
      }
    }
  };
  const navigate = useNavigate();

  const HandleRingCentral = async () => {
    console.log("Handle ring central called ");
    (function () {
      var rcs = document.createElement("script");
      rcs.src =
        "https://ringcentral.github.io/ringcentral-web-widget/adapter.js?stylesUri=https://embbnux.github.io/ringcentral-web-widget-styles/GameofThrones/styles.css";
      var rcs0 = document.getElementsByTagName("script")[0];
      rcs0.parentNode.insertBefore(rcs, rcs0);
      if (window.RCAdapter) {
        window.RCAdapter.setMinimized(false);
      }
    })();

    (function () {
      window.addEventListener("message", function (e) {
        const data = e.data;
        if (data) {
          switch (data.type) {
            case "rc-call-ring-notify":
              var id = number2id(data.call.from, number2user);
              if (id) {
                var contact = id2user[id];
                window.title = contact.character.displayName;
                window.history.pushState(
                  "",
                  contact.character.displayName,
                  "?id=" + id
                );
                loadSingleUser(id, id2user);
              }
              break;
            default:
              break;
          }
        }
      });
    })();
  };

  return (
    <>
      {/* <ToastContainer /> */}
      <header className="sticky top-0 bg-white border-b border-slate-200 z-30">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 -mb-px">
            {/* Header: Left side */}
            <div className="flex">
              {/* Hamburger button */}
              <button
                className="text-slate-500 hover:text-slate-600 lg:hidden"
                aria-controls="sidebar"
                aria-expanded={sidebarOpen}
                onClick={(e) => {
                  e.stopPropagation();
                  setSidebarOpen(!sidebarOpen);
                }}
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="4" y="5" width="16" height="2" />
                  <rect x="4" y="11" width="16" height="2" />
                  <rect x="4" y="17" width="16" height="2" />
                </svg>
              </button>

              {/* adding options in navbar  */}
            </div>
            <div className=" sm:block lg:block xl:block md:block hidden  ">
              <div className="flex  justify-between w-96">
                <div
                  className="h-[40px] w-[40px] rounded-md hover:bg-[#058cc1] bg-[#1d4189] items-center flex justify-center cursor-pointer"
                  onClick={HandleRingCentral}
                >
                  <BsTelephone className="h-6 w-6 text-white hover:scale-95 " />
                </div>
                <div
                  className="h-[40px] w-[40px] rounded-md hover:bg-[#058cc1] bg-[#1d4189] items-center flex justify-center cursor-pointer"
                  onClick={handleEmailOpen}
                >
                  <AiOutlineMail className="h-6 w-6 text-white hover:scale-95" />
                </div>
                <Modal
                  open={emailOpen}
                  onClose={handleEmailClose}
                  aria-labelledby="parent-modal-title"
                  aria-describedby="parent-modal-description"
                >
                  <Box sx={{ ...style, width: 600 }}>
                    <h2 id="parent-modal-title" className="text-xl text-center">
                      <b>EMAIL</b>
                    </h2>
                    <div className="flex flex-col ">
                      <div className="flex flex-col w-full ">
                        <p className="">To</p>
                        <input
                          type="email"
                          name="to"
                          value={emailForm.to}
                          onChange={EmailFormHandler}
                          className=""
                        />
                      </div>
                      <div className="flex flex-col w-full ">
                        <p className="">Subject</p>
                        <textarea
                          cols=""
                          rows="1"
                          name="subject"
                          value={emailForm.subject}
                          onChange={EmailFormHandler}
                          className=""
                        />
                      </div>
                      <div className="flex flex-col w-full ">
                        <p className="">Message</p>
                        <textarea
                          cols=""
                          rows="6"
                          name="message"
                          value={emailForm.message}
                          onChange={EmailFormHandler}
                          className=""
                        />
                        <button
                          className="mt-5 bg-slate-900 text-white py-2 px-4 text-lg"
                          onClick={SendMail}
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  </Box>
                </Modal>
                <div
                  className="h-[40px] w-[40px] rounded-md hover:bg-[#058cc1] bg-[#1d4189] items-center flex justify-center cursor-pointer"
                  onClick={handleOpen}
                >
                  <BiMessageDots className="h-6 w-6 text-white hover:scale-95" />
                </div>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="parent-modal-title"
                  aria-describedby="parent-modal-description"
                >
                  <Box sx={{ ...style, width: 600 }}>
                    <h2 id="parent-modal-title" className="text-xl text-center">
                      <b>SMS</b>
                    </h2>
                    <h2 className="text-lg">To</h2>
                    <input
                      type="text"
                      name="to"
                      value={msgForm.to}
                      onChange={MessageFormHandler}
                    />
                    <h2 className="text-lg">Message</h2>

                    <input
                      type="text"
                      name="message"
                      value={msgForm.message}
                      onChange={MessageFormHandler}
                    />

                    <button
                      className="mt-5 bg-slate-900 text-white py-2 px-4 text-lg"
                      onClick={SendMsg}
                    >
                      Send
                    </button>
                  </Box>
                </Modal>
                <div
                  className="h-[40px] w-[40px] rounded-md hover:bg-[#058cc1] bg-[#1d4189] items-center flex justify-center cursor-pointer"
                  onClick={() => navigate("/messages")}
                >
                  <VscTasklist className="h-6 w-6 text-white hover:scale-95" />
                </div>
              </div>
            </div>
            {/* Header: Right side */}
            <div className="flex items-center space-x-3">
              <div>
                <button
                  className={`w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition duration-150 rounded-full ml-3 ${
                    searchModalOpen && "bg-slate-200"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSearchModalOpen(true);
                  }}
                  aria-controls="search-modal"
                >
                  <span className="sr-only">Search</span>
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="fill-current text-slate-500"
                      d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z"
                    />
                    <path
                      className="fill-current text-slate-400"
                      d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z"
                    />
                  </svg>
                </button>
                <SearchModal
                  id="search-modal"
                  searchId="search"
                  modalOpen={searchModalOpen}
                  setModalOpen={setSearchModalOpen}
                />
              </div>
              <Notifications align="right" />
              <Help align="right" />
              {/*  Divider */}
              <hr className="w-px h-6 bg-slate-200 mx-3" />
              <UserMenu align="right" />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
