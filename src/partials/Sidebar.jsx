import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { MdOutlineLeaderboard } from "react-icons/md";
import SidebarLinkGroup from "./SidebarLinkGroup";
import { SiGoogletagmanager, SiMarketo } from "react-icons/si";
import { SlCalender } from "react-icons/sl";
import SophyLogoremovebgpreview from "../images/SophyLogoremovebgpreview.png";

import { GiSatelliteCommunication } from "react-icons/gi";
import { BsListTask } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";
import { TbReport } from "react-icons/tb";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { toast } from "react-hot-toast";
import axios from "axios";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  // Email model
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

  const location = useLocation();
  const [emailOpen, setEmailOpen] = useState(false);
  const [smsOpen, setSmsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { pathname } = location;
  const handleEmailOpen = () => {
    setEmailOpen(true);
  };
  const handleEmailClose = () => {
    setEmailOpen(false);
  };
  // SMS messages
  const handleSMSOpen = () => {
    setSmsOpen(true);
  };
  const handleSMSClose = () => {
    setSmsOpen(false);
  };
  const [emailForm, setEmailForm] = useState({
    to: "",
    subject: "",
    message: "",
  });
  // SMS
  const [smsForm, setSMSForm] = useState({
    to: "",
    message: "",
  });
  // SMS form handler
  const SMSFormHandler = (e) => {
    setSMSForm({
      ...smsForm,
      [e.target.name]: e.target.value,
    });
  };
  // email form handler
  const EmailFormHandler = (e) => {
    setEmailForm({
      ...emailForm,
      [e.target.name]: e.target.value,
    });
  };

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);
  // Sending Email function
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
          `${import.meta.env.VITE_BACKEND_URL}/conversation/send`,
          {
            email: emailForm.to,
            subject: emailForm.subject,
            message: emailForm.message,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
            },
          }
        );
        setLoading(false);
        setEmailForm("");
        console.log("Email response:", respo);
        toast.success(respo.data.message);
      } catch (error) {
        console.log("Error while sending email ", error);
      }
    }
  };

  // Sending Email function
  const SendSMS = async () => {
    if (smsForm.to == "" && smsForm.message == "") {
      toast.error("Please fill all the feilds!!!");
    } else {
      try {
        setLoading(true);
        const respo = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/conversation/twilioSMS`,
          {
            to: smsForm.to,
            message: smsForm.message,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
            },
          }
        );
        setLoading(false);
        setSMSForm("");
        console.log("SMS response:", respo);
        toast.success(respo.data.message);
      } catch (error) {
        console.log("Error while sending SMS ", error);
      }
    }
  };

  return (
    <>
      {loading ? (
        <div className=" flex items-center justify-center h-screen w-screen">
          <TailSpin height={60} />
        </div>
      ) : (
        <div>
          {/* Sidebar backdrop (mobile only) */}
          {/* Email Model */}
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
          {/* SMS Model*/}
          <Modal
            open={smsOpen}
            onClose={handleSMSClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box sx={{ ...style, width: 600 }}>
              <h2 id="parent-modal-title" className="text-xl text-center">
                <b>SMS</b>
              </h2>
              <div className="flex flex-col ">
                <div className="flex flex-col w-full ">
                  <p className="">To</p>
                  <input
                    type="text"
                    name="to"
                    value={smsForm.to}
                    onChange={SMSFormHandler}
                    className=""
                  />
                </div>

                <div className="flex flex-col w-full ">
                  <p className="">Message</p>
                  <textarea
                    cols=""
                    rows="6"
                    name="message"
                    value={smsForm.message}
                    onChange={SMSFormHandler}
                    className=""
                  />
                  <button
                    className="mt-5 bg-slate-900 text-white py-2 px-4 text-lg"
                    onClick={SendSMS}
                  >
                    Send
                  </button>
                </div>
              </div>
            </Box>
          </Modal>
          <div
            className={`fixed inset-0 bg-[#168EC3]  z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
              sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            aria-hidden="true"
          ></div>

          {/* Sidebar */}
          <div
            id="sidebar"
            ref={sidebar}
            className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-gradient-to-r from-[#4f0792] to-[#18617e] p-4 transition-all duration-200 ease-in-out ${
              sidebarOpen ? "translate-x-0" : "-translate-x-64"
            }`}
          >
            {/* Sidebar header */}
            <div className="flex justify-between mb-10 pr-3 sm:px-2">
              {/* Close button */}
              <button
                ref={trigger}
                className="lg:hidden text-slate-500 hover:text-slate-400"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-controls="sidebar"
                aria-expanded={sidebarOpen}
              >
                <span className="sr-only">Close sidebar</span>
                <svg
                  className="w-6 h-6 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
                </svg>
              </button>
              {/* Logo */}
              <NavLink end to="/" className="block">
                {/* <svg width="32" height="32" viewBox="0 0 32 32">
              <defs>
                <linearGradient
                  x1="28.538%"
                  y1="20.229%"
                  x2="100%"
                  y2="108.156%"
                  id="logo-a"
                >
                  <stop stopColor="#A5B4FC" stopOpacity="0" offset="0%" />
                  <stop stopColor="#A5B4FC" offset="100%" />
                </linearGradient>
                <linearGradient
                  x1="88.638%"
                  y1="29.267%"
                  x2="22.42%"
                  y2="100%"
                  id="logo-b"
                >
                  <stop stopColor="#38BDF8" stopOpacity="0" offset="0%" />
                  <stop stopColor="#38BDF8" offset="100%" />
                </linearGradient>
              </defs>
              <rect fill="#6366F1" width="32" height="32" rx="16" />
              <path
                d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z"
                fill="#4F46E5"
              />
              <path
                d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
                fill="url(#logo-a)"
              />
              <path
                d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z"
                fill="url(#logo-b)"
              />
            </svg> */}
                <img
                  src={SophyLogoremovebgpreview}
                  alt="Sophy"
                  className="w-24 h-16"
                />
              </NavLink>
            </div>

            {/* Links */}
            <div className="space-y-8">
              {/* Pages group */}
              <div>
                <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
                  <span
                    className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                    aria-hidden="true"
                  >
                    •••
                  </span>
                  <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                    Pages
                  </span>
                </h3>
                <ul className="mt-3">
                  {/* Dashboard */}
                  <SidebarLinkGroup
                    activecondition={
                      pathname === "/" || pathname.includes("dashboard")
                    }
                  >
                    {(handleClick, open) => {
                      return (
                        <React.Fragment>
                          <a
                            href="#0"
                            className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                              (pathname === "/" ||
                                pathname.includes("dashboard")) &&
                              "hover:text-slate-200"
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              sidebarExpanded
                                ? handleClick()
                                : setSidebarExpanded(true);
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <svg
                                  className="shrink-0 h-6 w-6"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    className={`fill-current text-slate-400 ${
                                      (pathname === "/" ||
                                        pathname.includes("dashboard")) &&
                                      "!text-indigo-500"
                                    }`}
                                    d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z"
                                  />
                                  <path
                                    className={`fill-current text-slate-600 ${
                                      (pathname === "/" ||
                                        pathname.includes("dashboard")) &&
                                      "text-indigo-600"
                                    }`}
                                    d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z"
                                  />
                                  <path
                                    className={`fill-current text-slate- ${
                                      (pathname === "/" ||
                                        pathname.includes("dashboard")) &&
                                      "text-indigo-200"
                                    }`}
                                    d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z"
                                  />
                                </svg>
                                <span className="text-sm font-medium ml-3  lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Dashboard
                                </span>
                              </div>

                              {/* Icon */}
                              <div className="flex shrink-0 ml-2">
                                <svg
                                  className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                    open && "rotate-180"
                                  }`}
                                  viewBox="0 0 12 12"
                                >
                                  <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                                </svg>
                              </div>
                            </div>
                          </a>
                          <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                            <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                              <li className="mb-1 last:mb-0">
                                <NavLink
                                  end
                                  to="/"
                                  className={({ isActive }) =>
                                    "block text-slate-400 hover:text-slate-200 transition duration-150 truncate " +
                                    (isActive ? "!text-indigo-500" : "")
                                  }
                                >
                                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    Main
                                  </span>
                                </NavLink>
                              </li>
                              {/* <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/dashboard/analytics"
                              className={({ isActive }) =>
                                "block text-slate-400 hover:text-slate-200 transition duration-150 truncate " +
                                (isActive ? "!text-indigo-500" : "")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Analytics
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/dashboard/fintech"
                              className={({ isActive }) =>
                                "block text-slate-400 hover:text-slate-200 transition duration-150 truncate " +
                                (isActive ? "!text-indigo-500" : "")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Fintech
                              </span>
                            </NavLink>
                          </li> */}
                            </ul>
                          </div>
                        </React.Fragment>
                      );
                    }}
                  </SidebarLinkGroup>

                  {/* User Managment */}
                  {/* <SidebarLinkGroup
                    activecondition={pathname.includes("leads")}
                  >
                    {(handleClick, open) => {
                      return (
                        <React.Fragment>
                          <a
                            href="#0"
                            className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                              pathname.includes("leads") &&
                              "hover:text-slate-200"
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              sidebarExpanded
                                ? handleClick()
                                : setSidebarExpanded(true);
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <SiGoogletagmanager className="h-6 w-6" />
                                <span className="text-sm font-medium ml-2 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  User Managment
                                </span>
                              </div>
                              {/* Icon */}
                  {/* <div className="flex shrink-0 ml-2">
                                <svg
                                  className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                    open && "rotate-180"
                                  }`}
                                  viewBox="0 0 12 12"
                                >
                                  <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                                </svg>
                              </div>
                            </div>
                          </a> */}
                  {/* <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                            <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                              <li className="mb-1 last:mb-0">
                                <NavLink
                                  end
                                  to="/user/addUser"
                                  className={({ isActive }) =>
                                    "block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                                  }
                                >
                                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    Add User
                                  </span>
                                </NavLink> */}
                  {/* </li> */}

                  {/* <li className="mb-1 last:mb-0">
                                <NavLink
                                  end
                                  to="/user/allUsers"
                                  className={({ isActive }) =>
                                    "block text-slate-400 hover:text-slate-200 transition duration-150 truncate "
                                  }
                                >
                                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    All User
                                  </span>
                                </NavLink>
                              </li> */}
                  {/* <li className="mb-1 last:mb-0">
                                <NavLink
                                  end
                                  to="/user/alluser"
                                  className={({ isActive }) =>
                                    "block text-slate-400 hover:text-slate-200 transition duration-150 truncate "
                                  }
                                >
                                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    Users
                                  </span>
                                </NavLink>
                              </li>
                              {/* portal  */}
                  {/* </ul>
                          </div>
                        </React.Fragment>
                      );
                    }}
                  </SidebarLinkGroup> */}

                  {/* Leads */}
                  <SidebarLinkGroup
                    activecondition={pathname.includes("leads")}
                  >
                    {(handleClick, open) => {
                      return (
                        <React.Fragment>
                          <a
                            href="#0"
                            className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                              pathname.includes("leads") &&
                              "hover:text-slate-200"
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              sidebarExpanded
                                ? handleClick()
                                : setSidebarExpanded(true);
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                {/* leads icon */}
                                {/* <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                              <path
                                className={`fill-current text-slate-400 ${
                                  ( pathname.includes('leads')) && '!text-indigo-500'
                                }`}
                                d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z"
                              />
                              <path
                                className={`fill-current text-slate-600 ${( pathname.includes('leads')) && 'text-indigo-600'}`}
                                d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z"
                              />
                              <path
                                className={`fill-current text-slate-400 ${( pathname.includes('leads')) && 'text-indigo-200'}`}
                                d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z"
                              />
                            </svg> */}
                                <MdOutlineLeaderboard className="h-8 w-7" />
                                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Leads
                                </span>
                              </div>
                              {/* Icon */}
                              <div className="flex shrink-0 ml-2">
                                <svg
                                  className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                    open && "rotate-180"
                                  }`}
                                  viewBox="0 0 12 12"
                                >
                                  <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                                </svg>
                              </div>
                            </div>
                          </a>
                          <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                            <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                              <li className="mb-1 last:mb-0">
                                <NavLink
                                  end
                                  to="/addCustomer"
                                  className={({ isActive }) =>
                                    "block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                                  }
                                >
                                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    Add Lead
                                  </span>
                                </NavLink>
                              </li>
                              {/* <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to=""
                              className={({ isActive }) =>
                                'block text-slate-400 hover:text-slate-200 transition duration-150 truncate ' + (isActive ? '!text-indigo-500' : '')
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Edit Lead
                              </span>
                            </NavLink>
                          </li> */}
                              {/* <li className="mb-1 last:mb-0">
                                <NavLink
                                  end
                                  to="/customers"
                                  className={({ isActive }) =>
                                    "block text-slate-400 hover:text-slate-200 transition duration-150 truncate "
                                  }
                                >
                                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    Lead List
                                  </span>
                                </NavLink>
                              </li> */}
                              {/* data table */}
                              <li className="mb-1 last:mb-0">
                                <NavLink
                                  end
                                  to="/leadDataTable"
                                  className={({ isActive }) =>
                                    "block text-slate-400 hover:text-slate-200 transition duration-150 truncate "
                                  }
                                >
                                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    Leads List
                                  </span>
                                </NavLink>
                              </li>
                              {/* portal  */}
                              {/* <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/ecommerce/customers/portal"
                              className={({ isActive }) =>
                                "block text-slate-400 hover:text-slate-200 transition duration-150 truncate "
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Portal
                              </span>
                            </NavLink>
                          </li> */}
                            </ul>
                          </div>
                        </React.Fragment>
                      );
                    }}
                  </SidebarLinkGroup>
                  {/* Communication */}
                  <SidebarLinkGroup
                    activecondition={pathname.includes("leads")}
                  >
                    {(handleClick, open) => {
                      return (
                        <React.Fragment>
                          <a
                            href="#0"
                            className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                              pathname.includes("leads") &&
                              "hover:text-slate-200"
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              sidebarExpanded
                                ? handleClick()
                                : setSidebarExpanded(true);
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <GiSatelliteCommunication className="h-8 w-7" />
                                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Communication
                                </span>
                              </div>
                              {/* Icon */}
                              <div className="flex shrink-0 ml-2">
                                <svg
                                  className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                    open && "rotate-180"
                                  }`}
                                  viewBox="0 0 12 12"
                                >
                                  <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                                </svg>
                              </div>
                            </div>
                          </a>
                          <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                            <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                              <li className="mb-1 last:mb-0">
                                <NavLink
                                  end
                                  to="/messages"
                                  className={({ isActive }) =>
                                    "block text-slate-400 hover:text-slate-200 transition duration-150 truncate "
                                  }
                                >
                                  <span
                                    className="text-slate-400 cursor-pointer hover:text-slate-200 text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                                    // onClick={handleEmailOpen}
                                  >
                                    Chat
                                  </span>
                                </NavLink>
                              </li>
                              {/* <li className="mb-1 last:mb-0">
                                <span
                                  className="text-slate-400 cursor-pointer hover:text-slate-200 text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                                  onClick={handleEmailOpen}
                                >
                                  Email
                                </span>
                              </li> */}
                              {/* <li className="mb-1 last:mb-0">
                                <span
                                  className="text-slate-400 cursor-pointer hover:text-slate-200 text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                                  onClick={handleSMSOpen}
                                >
                                  SMS
                                </span>
                              </li> */}
                              {/* group chat */}
                              {/* <li className="mb-1 last:mb-0">
                                <NavLink
                                  end
                                  to="/chat/groupchat"
                                  className={({ isActive }) =>
                                    "block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                                  }
                                >
                                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    Create Rooms
                                  </span>
                                </NavLink>
                              </li> */}
                              {/* <li className="mb-1 last:mb-0">
                                <NavLink
                                  end
                                  to="/chat/groups"
                                  className={({ isActive }) =>
                                    "block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                                  }
                                >
                                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    Chat Groups
                                  </span>
                                </NavLink>
                              </li> */}

                              {/* <li className="mb-1 last:mb-0">
                                <NavLink
                                  end
                                  to="/chat/groupsDataTable"
                                  className={({ isActive }) =>
                                    "block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                                  }
                                >
                                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    Rooms
                                  </span>
                                </NavLink>
                              </li> */}
                              {/* <li className="mb-1 last:mb-0">
                                <NavLink
                                  end
                                  to="/chat/conversations"
                                  className={({ isActive }) =>
                                    "block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                                  }
                                >
                                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    All Conversations
                                  </span>
                                </NavLink>
                              </li> */}

                              {/*  */}
                            </ul>
                          </div>
                        </React.Fragment>
                      );
                    }}
                  </SidebarLinkGroup>

                  {/* Marketing */}

                  {/* <SidebarLinkGroup
                    activecondition={pathname.includes("leads")}
                  >
                    {(handleClick, open) => {
                      return (
                        <React.Fragment>
                          <a
                            href="#0"
                            className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                              pathname.includes("leads") &&
                              "hover:text-slate-200"
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              sidebarExpanded
                                ? handleClick()
                                : setSidebarExpanded(true);
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                {/* leads icon */}

                  {/* <SiMarketo className="h-8 w-7" />
                                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Marketing
                                </span>
                              </div> */}
                  {/* Icon */}
                  {/* <div className="flex shrink-0 ml-2">
                                <svg
                                  className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                    open && "rotate-180"
                                  }`}
                                  viewBox="0 0 12 12"
                                >
                                  <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                                </svg>
                              </div>
                            </div>
                          </a>
                          <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                            <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                              <li className="mb-1 last:mb-0">
                                <NavLink
                                  end
                                  to=""
                                  className={({ isActive }) =>
                                    "block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                                  }
                                >
                                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    Drip Campaigns
                                  </span>
                                </NavLink>
                              </li>
                            </ul>
                          </div>
                        </React.Fragment>
                      );
                    }}
                  </SidebarLinkGroup> */}

                  {/* Calendar */}

                  {/* <SidebarLinkGroup
                    activecondition={pathname.includes("leads")}
                  >
                    {(handleClick, open) => {
                      return (
                        <React.Fragment>
                          <a
                            href="#0"
                            className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                              pathname.includes("leads") &&
                              "hover:text-slate-200"
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              sidebarExpanded
                                ? handleClick()
                                : setSidebarExpanded(true);
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <SlCalender className="h-8 w-7" />
                                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Calendar
                                </span>
                              </div>
                            </div>
                          </a>
                          <div className="lg:hidden lg:sidebar-expanded:block 2xl:block"></div>
                        </React.Fragment>
                      );
                    }}
                  </SidebarLinkGroup> */}

                  {/* Task Managment */}

                  <SidebarLinkGroup
                    activecondition={pathname.includes("leads")}
                  >
                    {(handleClick, open) => {
                      return (
                        <React.Fragment>
                          <a
                            href="#0"
                            className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                              pathname.includes("leads") &&
                              "hover:text-slate-200"
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              sidebarExpanded
                                ? handleClick()
                                : setSidebarExpanded(true);
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <BsListTask className="h-8 w-7" />
                                <span className="text-sm font-medium ml-2 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Task Managment
                                </span>
                              </div>
                              {/* Icon */}
                              <div className="flex shrink-0 ml-2">
                                <svg
                                  className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                    open && "rotate-180"
                                  }`}
                                  viewBox="0 0 12 12"
                                >
                                  <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                                </svg>
                              </div>
                            </div>
                          </a>
                          <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                            <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                              <li className="mb-1 last:mb-0">
                                <NavLink
                                  end
                                  to="/assignTask"
                                  className={({ isActive }) =>
                                    "block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                                  }
                                >
                                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    Add Task
                                  </span>
                                </NavLink>
                              </li>

                              {/* <li className="mb-1 last:mb-0">
                                <NavLink
                                  end
                                  to="/task/alltasks"
                                  className={({ isActive }) =>
                                    "block text-slate-400 hover:text-slate-200 transition duration-150 truncate "
                                  }
                                >
                                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    All Tasks
                                  </span>
                                </NavLink>
                              </li> */}
                              <li className="mb-1 last:mb-0">
                                <NavLink
                                  end
                                  to="/task/alltasksDataTable"
                                  className={({ isActive }) =>
                                    "block text-slate-400 hover:text-slate-200 transition duration-150 truncate "
                                  }
                                >
                                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    Tasks
                                  </span>
                                </NavLink>
                              </li>
                              {/* portal  */}
                            </ul>
                          </div>
                        </React.Fragment>
                      );
                    }}
                  </SidebarLinkGroup>

                  {/* Reports */}

                  <SidebarLinkGroup
                    activecondition={pathname.includes("leads")}
                  >
                    {(handleClick, open) => {
                      return (
                        <React.Fragment>
                          <a
                            href="#0"
                            className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                              pathname.includes("leads") &&
                              "hover:text-slate-200"
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              sidebarExpanded
                                ? handleClick()
                                : setSidebarExpanded(true);
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <TbReport className="h-8 w-7" />
                                <span className="text-sm font-medium ml-2 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Reports
                                </span>
                              </div>
                              {/* Icon */}
                              <div className="flex shrink-0 ml-2">
                                <svg
                                  className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                    open && "rotate-180"
                                  }`}
                                  viewBox="0 0 12 12"
                                >
                                  <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                                </svg>
                              </div>
                            </div>
                          </a>
                          <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                            <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                              {/* <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  <NavLink
                                    end
                                    to="/reports/allreports"
                                    className={({ isActive }) =>
                                      "block text-slate-400 hover:text-slate-200 transition duration-150 truncate "
                                    }
                                  >
                                    <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                      Reports
                                    </span>
                                  </NavLink>
                                </span> */}

                              <li className="mb-1 last:mb-0">
                                <NavLink
                                  end
                                  to="/reports/allreports"
                                  className={({ isActive }) =>
                                    "block text-slate-400 hover:text-slate-200 transition duration-150 truncate "
                                  }
                                >
                                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    Lead Report
                                  </span>
                                </NavLink>
                              </li>
                              <li className="mb-1 last:mb-0">
                                <NavLink
                                  end
                                  to="/reports/loanOfficer"
                                  className={({ isActive }) =>
                                    "block text-slate-400 hover:text-slate-200 transition duration-150 truncate "
                                  }
                                >
                                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    Loan Officer Report
                                  </span>
                                </NavLink>
                              </li>
                              {/* <li className="mb-1 last:mb-0">
                                <NavLink
                                  end
                                  to="/chat/conversationsDataTable"
                                  className={({ isActive }) =>
                                    "block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                                  }
                                >
                                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    Communication Report
                                  </span>
                                </NavLink>
                              </li> */}
                              {/* portal  */}
                            </ul>
                          </div>
                        </React.Fragment>
                      );
                    }}
                  </SidebarLinkGroup>
                  {/* Settings  */}
                  <SidebarLinkGroup
                    activecondition={pathname.includes("leads")}
                  >
                    {(handleClick, open) => {
                      return (
                        <React.Fragment>
                          <a
                            href="#0"
                            className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                              pathname.includes("leads") &&
                              "hover:text-slate-200"
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              sidebarExpanded
                                ? handleClick()
                                : setSidebarExpanded(true);
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <AiOutlineSetting className="h-8 w-7" />
                                <span className="text-sm font-medium ml-2 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Settings
                                </span>
                              </div>
                              {/* Icon */}
                              <div className="flex shrink-0 ml-2">
                                <svg
                                  className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                    open && "rotate-180"
                                  }`}
                                  viewBox="0 0 12 12"
                                >
                                  <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                                </svg>
                              </div>
                            </div>
                          </a>
                          <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                            <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                              <li className="mb-1 last:mb-0">
                                <NavLink
                                  end
                                  to="/settings/account"
                                  className={({ isActive }) =>
                                    "block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                                  }
                                >
                                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    My Account
                                  </span>
                                </NavLink>
                              </li>

                              {/* <li className="mb-1 last:mb-0">
                                <NavLink
                                  end
                                  to="/task/alltasks"
                                  className={({ isActive }) =>
                                    "block text-slate-400 hover:text-slate-200 transition duration-150 truncate "
                                  }
                                >
                                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    All Tasks
                                  </span>
                                </NavLink>
                              </li> */}
                              {/* portal  */}
                            </ul>
                          </div>
                        </React.Fragment>
                      );
                    }}
                  </SidebarLinkGroup>

                  {/* Contact Managment */}

                  <SidebarLinkGroup
                    activecondition={pathname.includes("leads")}
                  >
                    {(handleClick, open) => {
                      return (
                        <React.Fragment>
                          <a
                            href="#0"
                            className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                              pathname.includes("leads") &&
                              "hover:text-slate-200"
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              sidebarExpanded
                                ? handleClick()
                                : setSidebarExpanded(true);
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <AiOutlineSetting className="h-8 w-7" />
                                <span className="text-sm font-medium ml-2 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Contact Managment
                                </span>
                              </div>
                              {/* Icon */}
                              <div className="flex shrink-0 ml-2">
                                <svg
                                  className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                    open && "rotate-180"
                                  }`}
                                  viewBox="0 0 12 12"
                                >
                                  <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                                </svg>
                              </div>
                            </div>
                          </a>
                          <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                            <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                              <li className="mb-1 last:mb-0">
                                <NavLink
                                  end
                                  to="/contacts/contact"
                                  className={({ isActive }) =>
                                    "block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                                  }
                                >
                                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    Create Contact
                                  </span>
                                </NavLink>
                              </li>

                              <li className="mb-1 last:mb-0">
                                <NavLink
                                  end
                                  to="/contacts/contactList"
                                  className={({ isActive }) =>
                                    "block text-slate-400 hover:text-slate-200 transition duration-150 truncate "
                                  }
                                >
                                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    Contact List
                                  </span>
                                </NavLink>
                              </li>
                            </ul>
                          </div>
                        </React.Fragment>
                      );
                    }}
                  </SidebarLinkGroup>

                  {/* Messages */}

                  {/* Inbox */}

                  {/* Calendar */}

                  {/* Campaigns */}

                  {/* Settings */}

                  {/* Utility */}
                </ul>
              </div>
              {/* More group */}
            </div>

            {/* Expand / collapse button */}
            <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
              <div className="px-3 py-2">
                <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
                  <span className="sr-only">Expand / collapse sidebar</span>
                  <svg
                    className="w-6 h-6 fill-current sidebar-expanded:rotate-180"
                    viewBox="0 0 24 24"
                  >
                    <path
                      className="text-slate-400"
                      d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                    />
                    <path className="text-slate-600" d="M3 23H1V1h2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
