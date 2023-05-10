import React, { useState, useEffect, useRef, useContext } from "react";
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
import { AuthContext } from "../context/AuthContext";
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
  const { userData } = useContext(AuthContext);
  const [emailOpen, setEmailOpen] = useState(false);
  const [smsOpen, setSmsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [menuItems, setMenuItems] = useState([
    {
      label: "Leads",
      attr: [
        { item: "Add Lead", to: "/addCustomer" },
        { item: "Lead List", to: "/leadDataTable" },
      ],
    },
    { label: "Communication", attr: [{ item: "Chat", to: "/messages" }] },
    {
      label: "Task Management",
      attr: [
        { item: "Add Task", to: "/assignTask" },
        { item: "Tasks", to: "/task/alltasksDataTable" },
      ],
    },
    {
      label: "Reports",
      attr: [
        { item: "Lead Report", to: "/reports/allreports" },
        { item: "Loan Officer Report", to: "/reports/loanOfficer" },
      ],
    },
    {
      label: "Contact Management",
      attr: [
        { item: "Create Contact", to: "/contacts/contact" },
        { item: "Contact List", to: "/contacts/contactList" },
      ],
    },
  ]);

  useEffect(() => {
    if (userData !== undefined) {
      // const array = ["Task Managment", "Leads"];
      console.log("This Person's Permissions", userData.permissions);
      const filteredArray = menuItems.filter((item) =>
        userData.permissions.includes(item.label)
      );
      console.log("Permissions", filteredArray);
      setMenuItems(filteredArray);
    } else {
      null;
    }
  }, [userData]);

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
                            </ul>
                          </div>
                        </React.Fragment>
                      );
                    }}
                  </SidebarLinkGroup>
                  {menuItems.map((menu) => {
                    return (
                      <>
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
                                        {menu.label}
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
                                  <ul
                                    className={`pl-9 mt-1 ${!open && "hidden"}`}
                                  >
                                    {menu.attr.map((attribute) => {
                                      return (
                                        <>
                                          <li className="mb-1 last:mb-0">
                                            <NavLink
                                              end
                                              to={attribute.to}
                                              className={({ isActive }) =>
                                                "block text-slate-400 hover:text-slate-200 transition duration-150 truncate " +
                                                (isActive
                                                  ? "!text-indigo-500"
                                                  : "")
                                              }
                                            >
                                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                {attribute.item}
                                              </span>
                                            </NavLink>
                                          </li>
                                        </>
                                      );
                                    })}
                                  </ul>
                                </div>
                              </React.Fragment>
                            );
                          }}
                        </SidebarLinkGroup>
                      </>
                    );
                  })}
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
                                    "block text-slate-400 hover:text-slate-200 transition duration-150 truncate " +
                                    (isActive ? "!text-indigo-500" : "")
                                  }
                                >
                                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    My Account
                                  </span>
                                </NavLink>
                              </li>
                            </ul>
                          </div>
                        </React.Fragment>
                      );
                    }}
                  </SidebarLinkGroup>
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
