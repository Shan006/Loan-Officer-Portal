import React, { useEffect, useState, useContext, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import { BsTelephone } from "react-icons/bs";
import { FormControlLabel } from "@mui/material";
// import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import { CheckBox } from "@mui/icons-material";
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineCloudUpload, AiOutlineMail } from "react-icons/ai";
import { BiMessageDots } from "react-icons/bi";
import { VscTasklist } from "react-icons/vsc";
import { GrDocument } from "react-icons/gr";
import { GrAddCircle } from "react-icons/gr";
import { TailSpin } from "react-loader-spinner";

import PredefinedForm from "./portalComponents/PredefinedForm";
import { PortalMilestoneForm } from "./portalComponents/PortalMilestoneForm";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
// import {
//   Modal,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Button,
// } from "@windmill/react-ui";
import { AuthContext } from "../../context/AuthContext";

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

const Portal = () => {
  // states
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sendInviteToggle, setSendInviteToggle] = useState(false);
  const [docTempToggle, setdocTempToggle] = useState(false);
  const [pLoginLink, setPLoginLink] = useState("");
  const [pass, setPass] = useState("");
  const [cpass, setCPass] = useState("");
  const [addCutomDoc, setaddCutomDoc] = useState(false);
  const [array, setArray] = useState([]);
  const [subArray, setSubArray] = useState([]);
  const [arr, setarr] = useState(PredefinedForm);
  const [selected, setSelected] = useState("DEDAULT NEED LIST");
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [openMsgModal, setOpenMsgModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sendingRefLinkDate, setsendingRefLinkDate] = useState("");
  const { openTaskModal, closeTaskModal } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [docs, setDocs] = useState([]);
  const Location = useLocation();
  const myRef = useRef(false);
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
            to: Location.state.phone,
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
        toast.success(respo.data.message);
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
      toast.warn("Please fill all the feilds!!!");
    } else {
      try {
        setLoading(true);
        const respo = await axios.post(
          `${import.meta.env.VITE_REACT_APP_SERVER_URL}/conversation/send`,
          {
            email: Location.state.email && Location.state.email,
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
        toast.success(respo.data.message);
      } catch (error) {
        console.log("Error while sending email ", error);
      }
    }
  };
  // send lead refral link via Email
  const SendLeadLinkViaEmail = async () => {
    let newData = arr.filter((item) => item.title === selected);
    let updatedData = newData[0].data.filter((item) => item.status === true);
    updatedData.map((item) => {
      docs.push(item.data);
    });
    console.log(docs);
    if (docs.length < 0) {
      toast.warn("Please add documents!!!");
    } else {
      try {
        setLoading(true);
        const result = await axios.post(
          `${import.meta.env.VITE_REACT_APP_SERVER_URL}/lead/referral`,
          {
            leadId: Location.state.leadId,
            documents_required: docs,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setLoading(false);
        console.log("result of sending lead link :", result.data);
        toast.success(result.data.message);
        setsendingRefLinkDate(
          new Date().toLocaleString("en-US", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
          })
        );
      } catch (error) {
        console.log("Error while sending Lead link", error);
      }
    }
  };

  const SelectionOp = (op) => {
    setSelected(op);
    let SingleData = arr.filter((item) => item.title === op);
    SingleData[0].data.map((itemData) => {
      subArray.push(itemData);
    });
    if (subArray.length > 46) {
      while (subArray.length !== 46) {
        subArray.shift();
      }
    }
    console.log(subArray);
  };
  return (
    <>
      {loading ? (
        <div className=" flex items-center justify-center h-screen w-screen">
          <TailSpin height={60} />
        </div>
      ) : (
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="relative flex  flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {/*  Site header */}
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            {/* calls email  */}
            <div className=" w- h-[60px]     my-6 ml-2 pr-2 ">
              <div className="w-full  flex  lg:flex-row md:flex-col    justify-between   h-full">
                <div className="flex  w-3/4 justify-evenly items-center ">
                  {/* <div className='h-full flex items-center ' >Lorenza Valencia</div> */}
                  {/* <div className="h-[40px] w-[40px] rounded-md hover:bg-[#058cc1] bg-[#1d4189] items-center flex justify-center cursor-pointer">
                    <BsTelephone className="h-6 w-6 text-white hover:scale-95 " />
                  </div> */}
                  {/* <div
                    className="h-[40px] w-[40px] rounded-md hover:bg-[#058cc1] bg-[#1d4189] items-center flex justify-center cursor-pointer"
                    onClick={openModal}
                  >
                    <AiOutlineMail
                      className="h-6 w-6 text-white hover:scale-95"
                      onClick={handleEmailOpen}
                    />
                  </div>
                  <Modal
                    open={emailOpen}
                    onClose={handleEmailClose}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                  >
                    <Box sx={{ ...style, width: 600 }}>
                      <h2
                        id="parent-modal-title"
                        className="text-xl text-center"
                      >
                        <b>EMAIL</b>
                      </h2>
                      <div className="flex flex-col ">
                        <div className="flex flex-col w-full ">
                          <p className="">To</p>
                          <input
                            type="email"
                            name="to"
                            value={Location.state.email}
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
                  <div>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="parent-modal-title"
                      aria-describedby="parent-modal-description"
                    >
                      <Box sx={{ ...style, width: 600 }}>
                        <h2
                          id="parent-modal-title"
                          className="text-xl text-center"
                        >
                          <b>SMS</b>
                        </h2>
                        <h2 className="text-lg">To</h2>
                        <input
                          type="text"
                          name="to"
                          value={Location.state.phone}
                          onChange={MessageFormHandler}
                        />
                        <h2 className="text-lg">Message</h2>

                        <input
                          type="text"
                          name="message"
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
                  </div> */}
                  {/* <div
                    className="h-[40px] w-[40px] rounded-md hover:bg-[#058cc1] bg-[#1d4189] items-center flex justify-center cursor-pointer"
                    onClick={openTaskModal}
                  >
                    <VscTasklist className="h-6 w-6 text-white hover:scale-95" />
                  </div> */}
                </div>
                <div className="flex   justify-evenly items-center ">
                  <div className="h-full flex items-center text-black text-lg font-bold lg:mr-4 xl:mr-4 md:mr-4">
                    {Location.state.firstName.toUpperCase()} {""}
                    {Location.state.lastName.toUpperCase()}
                  </div>
                  <div className="h-full w-[55px] rounded-full hover:bg-[#058cc1] bg-[#1d4189] items-center flex justify-center text-lg font-bold text-white">
                    {Location.state.firstName[0]}
                    {Location.state.lastName[0]}
                  </div>
                </div>
              </div>
            </div>

            {/* portal invite sec */}
            <div className="   h-auto   bg-[#ffffffec] border   border-b ml-2 mr-2 ">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4  justify-evenly py-4">
                <div className="h-full w-full flex-col flex  items-center ">
                  <p className="text-[#0F91c5] ">Portal Invite Date</p>
                  {sendingRefLinkDate == "" ? (
                    <p className="text-xl font-bold">-/--/----</p>
                  ) : (
                    <p className="text-xl font-bold">{sendingRefLinkDate}</p>
                  )}
                </div>
                <div className="h-full w-full flex-col flex  items-center">
                  <p className="text-[#0F91c5] ">Application Completion Date</p>
                  <p className="text-xl font-bold">-/--/----</p>
                </div>
                <div className="h-full w-full flex-col flex  items-center">
                  <p className="text-[#0F91c5] ">Status</p>
                </div>
                <div className="">
                  <div className=" flex  justify-center rounded-md p-2 hover:bg-[#058cc1] bg-[#1d4189]">
                    <button
                      className="text-lg text-white font-semibold "
                      onClick={() => setSendInviteToggle(!sendInviteToggle)}
                    >
                      Send Portal Invite
                    </button>
                  </div>
                </div>
                {/* invite toggle  */}
                <div
                  className={`bg-[#FFFFFF] right-72 top-56 w-[150px] h-auto ${
                    sendInviteToggle ? "absolute  " : "hidden"
                  }`}
                >
                  <ul className="flex-col ">
                    <li
                      className="cursor-pointer pt-2 text-[#0F91c5]  hover:text-[#1b478a]"
                      onClick={SendLeadLinkViaEmail}
                    >
                      Send via Email
                    </li>
                    <li className="cursor-pointer text-[#0F91c5] pt-2 hover:text-[#1b478a]">
                      Send via SMS
                    </li>
                    <li className="cursor-pointer text-[#0F91c5] pt-2 hover:text-[#1b478a]">
                      Copy Portal Link
                    </li>
                  </ul>
                  {/* </Transition> */}
                </div>
              </div>
            </div>

            {/* Analysis section */}
            <div className="  h-auto   bg-[#ffffffec] border   border-b  ml-2 mr-2 ">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3  justify-evenly py-4">
                <div className="h-full w-full flex-col flex  items-center ">
                  <p className="text-[#ACBEC8] text-lg hover:scale-95 cursor-pointer ">
                    <GrDocument className="w-8 h-8 text-yellow-700 inline-flex mx-1" />
                    Docs Owed
                  </p>
                  <p className="text-3xl font-bold">0</p>
                </div>
                <div className="h-full w-full flex-col flex  items-center">
                  <p className="text-[#ACBEC8] text-lg hover:scale-95 cursor-pointer ">
                    <GrDocument className="w-8 h-8 text-yellow-700 inline-flex mx-1" />
                    Docs Pending Review
                  </p>
                  <p className="text-3xl font-bold">0</p>
                </div>
                <div className="h-full w-full flex-col flex  items-center">
                  <p className="text-[#ACBEC8] text-lg hover:scale-95 cursor-pointer ">
                    <GrDocument className="w-8 h-8 text-yellow-700 inline-flex mx-1" />
                    Docs Accepted
                  </p>
                  <p className="text-3xl font-bold">0</p>
                </div>
              </div>
            </div>
            {/*  */}
            <div className=" bg-[#ffffffec]   ml-2 mr-2 ">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3  justify-evenly py-4">
                <div className="h-full w-full flex-col flex  items-center">
                  <p className="text-[#ACBEC8] text-lg cursor-pointer ">
                    <select
                      name="PreTempDocs"
                      className="w-full"
                      onChange={(e) => SelectionOp(e.target.value)}
                    >
                      {arr.map((item, index) => (
                        <option
                          value={`${item.title}`}
                          className="cursor-pointer text-[#0F91c5] pt-2  hover:hover:text-[#c07229]"
                        >
                          {item.title}
                        </option>
                      ))}
                    </select>
                  </p>
                </div>
                <div className="h-full w-full flex-col flex  items-center">
                  <p className="text-[#ACBEC8] text-lg cursor-pointer">
                    Help With Google Remote
                  </p>
                </div>
                <div className="h-full w-full flex-col flex  items-center">
                  <p className="text-[#ACBEC8] text-lg cursor-pointer ">
                    Email Docs{" "}
                  </p>
                </div>
              </div>
            </div>
            {/* document table*/}
            <div className="flex flex-col pb-6">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 ml-2">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left  font-medium text-gray-500  tracking-wider"
                          >
                            <ul className="flex justify-around">
                              <li className="inline-flex items-center">
                                Docs Type
                                <IoIosArrowDown
                                  className={`inline-flex hover:rotate-180 h-3 w-3`}
                                />
                              </li>

                              <li className="inline-flex items-center">
                                Docs Type
                                <IoIosArrowDown
                                  className={`inline-flex hover:rotate-180 h-3 w-3`}
                                />
                              </li>
                              <li className="inline-flex items-center">
                                Docs Type
                                <IoIosArrowDown
                                  className={`inline-flex hover:rotate-180 h-3 w-3`}
                                />
                              </li>
                              <li className="inline-flex items-center">
                                Docs Type
                                <IoIosArrowDown
                                  className={`inline-flex hover:rotate-180 h-3 w-3`}
                                />
                              </li>
                            </ul>
                          </th>
                          <th
                            scope="col"
                            className=" py-3   font-medium text-gray-500  tracking-wider"
                          >
                            Action
                            <IoIosArrowDown
                              className={`inline-flex hover:rotate-180 h-3 w-3`}
                            />
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {subArray.map((item) => (
                          <tr className="pt-2">
                            <td className="px-6  whitespace-nowrap">
                              <input
                                type="checkbox"
                                name=""
                                value=""
                                className={` mx-2 w-5 h-5 rounded-md ${
                                  item.status ? "checked:bg-blue-500" : ""
                                } `}
                              />
                              <label for="vehicle1">{item.data}</label>
                            </td>
                            <td className="px-6  whitespace-nowrap">
                              {item.status ? (
                                <div className="text-sm text-gray-900">
                                  <AiOutlineCloudUpload className="h-6 w-6 cursor-pointer" />
                                </div>
                              ) : (
                                ""
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/*Add PreApprovel letter button */}
            <div className="w-[300px] mx-2 pb-4  ">
              <div className=" flex items-center cursor-pointer  justify-center rounded-md p-2 border-dashed border-2 border-gray-500 hover:scale-95 ">
                <GrAddCircle className="inline-flex  w-5 h-5 text-gray-600" />
                <button
                  className="text-lg text-slate-500 font-semibold  "
                  onClick={() => setaddCutomDoc(!addCutomDoc)}
                >
                  Add Custom Doc
                </button>
              </div>
            </div>
            {/* <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 pb-4 px-2">
              <div className="flex items-center cursor-pointer">
                <input type="checkbox" className="inline-flex mr-2" />
                <p className="text-xs">
                  {" "}
                  Allow referral partner to generate pre-approval letters
                </p>
              </div>
              <div className="cursor-pointer">Download zip</div>
              <div className="cursor-pointer">Convert to PDF</div>
            </div> */}
            {/* Send pre Approvel Letter */}
            {/* <div className="w-[300px] mx-2 pb-2  ">
              <div className=" flex  justify-center rounded-md p-2 hover:bg-[#058cc1] bg-[#1d4189] hover:scale-95">
                <button
                  className="text-lg font-medium text-white  "
                  //  onClick={() => setSendInviteToggle(!sendInviteToggle)}
                >
                  Send Pre_Approvel Letter
                </button>
              </div>
            </div> */}
            {addCutomDoc ? (
              <>
                <div className="lg:flex-row md:flex-row xl:flex sm:flex flex-col  justify-center mx-2 pb-4 ">
                  <div className="flex-col">
                    <p>Document type</p>
                    <input type="text" />
                  </div>
                  <div className="flex-col md:mx-4 ">
                    <p> Description for Customer</p>

                    <input type="text" />
                  </div>
                </div>
                <div className="lg:flex-row md:flex-row xl:flex sm:flex flex-col  justify-between mx-2 pb-4 ">
                  <div className="flex-col">
                    <p className="hover:scale-95 cursor-pointer">
                      Upload PDF Document
                    </p>
                  </div>
                  <div className="mx-0 md:mx-4  ">
                    <p className="hover:scale-95 cursor-pointer">
                      Map for Signature
                    </p>
                  </div>
                  <div className=" flex  justify-center rounded-md p-2 hover:bg-[#058cc1] bg-[#1d4189] hover:scale-95">
                    <button
                      className="text-lg font-medium text-white  "
                      //  onClick={() => setSendInviteToggle(!sendInviteToggle)}
                    >
                      Save Custom Doc
                    </button>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
            {/* Trash document table*/}
            {/* <div className="flex flex-col pb-6">
              <p className=" flex text-lg font-semibold px-2">
                Trash Documents
              </p>

              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 ml-2">
                      <thead className="bg-gray-50 ">
                        <tr className="py-3 ">
                          <th
                            scope="col"
                            className="  font-medium text-gray-500  tracking-wider"
                          >
                            Doc Type
                          </th>
                          <th
                            scope="col"
                            className="  font-medium text-gray-500  tracking-wider"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            className="  font-medium text-gray-500  tracking-wider"
                          >
                            Date
                          </th>
                          <th
                            scope="col"
                            className="  font-medium text-gray-500  tracking-wider"
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr className="">
                          <td className=" pt-3 whitespace-nowrap">abc</td>
                          <td className=" pt-3 whitespace-nowrap">abc</td>
                          <td className=" pt-3 whitespace-nowrap">
                            02/12/2022
                          </td>
                          <td className=" pt-3 whitespace-nowrap">abc</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div> */}

            {/* Portal Milestones*/}
            <div className="flex flex-col pb-6">
              <p className=" flex text-lg font-semibold px-2">
                Portal Milestones
              </p>
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg pb-4">
                    <table className="min-w-full divide-y divide-gray-200 ml-2">
                      <thead className="bg-gray-50 ">
                        <tr className="py-3 ">
                          <th
                            scope="col"
                            className="  font-medium text-gray-500  tracking-wider"
                          >
                            Portal Status
                          </th>
                          <th
                            scope="col"
                            className="  font-medium text-gray-500  tracking-wider"
                          >
                            Date
                          </th>
                          <th
                            scope="col"
                            className="  font-medium text-gray-500  tracking-wider"
                          >
                            Checked By(User)
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {PortalMilestoneForm.map((item) => (
                          <tr className="">
                            <td className=" pt-3 whitespace-nowrap">
                              <input
                                type="checkbox"
                                className="w-5 h-5 rounded-md mx-2"
                              />
                              <p className="inline-flex">{item.data}</p>
                            </td>
                            <td className=" pt-3 whitespace-nowrap">
                              02/12/2022
                            </td>
                            <td className=" pt-3 whitespace-nowrap">abc</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* bellow work */}

            {/* <div className="mt-3 flex-col w-[100%] bg-white p-2">
              <div className="flex w-[100%] justify-between">
                <h1 className="text-lg">Custom Questions & Fields</h1>
                <div className="flex w-48 justify-center rounded-md p-2 hover:bg-[#058cc1] bg-[#1d4189] hover:scale-95">
                  <button className="text-lg font-medium text-white">
                    Add Fields
                  </button>
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <table className="min-w-full divide-y divide-gray-200 ml-2">
                  <thead className="bg-gray-50 ">
                    <tr className="py-3 border-t-2">
                      <th
                        scope="col"
                        className="  font-medium text-gray-500  tracking-wider border-r-2 p-2"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className=" font-medium text-gray-500  tracking-wider w-5/6 pl-3"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="  font-medium text-gray-500  tracking-wider border-l-2 pl-3"
                      >
                        Answer
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr className="py-3">
                      <th
                        scope="col"
                        className="  font-medium text-gray-500  tracking-wider p-2"
                      >
                        <FormControlLabel control={<CheckBox />} />
                      </th>
                      <th
                        scope="col"
                        className="  font-medium text-gray-500  tracking-wider w-5/6 pl-3"
                      >
                        How Satisfied were you with our overall service (1 Best
                        , 2.Good, 3 OK, 4 not good, 5 Worst)
                      </th>
                      <th
                        scope="col"
                        className="  font-medium text-gray-500  tracking-wider pl-3"
                      >
                        <input
                          type="text"
                          className="w-1/2 mt-2 rounded-md sm:w-3/5"
                        />
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div> */}
            {/* <div className="mt-3 flex-col w-[100%] bg-white p-3 text-lg">
              <h1>Portal Password Reset</h1>
              <Box
                className="ml-2 mt-3"
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="outlined-password-input"
                  label="Portal Login Link"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={pLoginLink}
                  onChange={(e) => {
                    setPLoginLink(e.target.value);
                  }}
                />
                <TextField
                  id="outlined-password-input"
                  label="New Password"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={pass}
                  onChange={(e) => {
                    setPass(e.target.value);
                  }}
                />
                <TextField
                  id="outlined-password-input"
                  label="Confirm Password"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={cpass}
                  onChange={(e) => {
                    setCPass(e.target.value);
                  }}
                />
              </Box>
              <div className="flex w-48 justify-center rounded-md p-2 hover:bg-[#058cc1] bg-[#1d4189] hover:scale-95 m-3">
                <button className="text-md text-white">Reset Password</button>
              </div>
            </div> */}
          </div>
          {/* <BorrowerMail/> */}
          {/* <ToastContainer /> */}
        </div>
      )}
    </>
  );
};

export default Portal;
