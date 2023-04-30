import * as React from "react";
import { useEffect, useRef, useContext, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-hot-toast";
import axios from "axios";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Conformation from "../tasks/Conformation";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { BsChatText } from "react-icons/bs";
import { HiOutlinePhoneMissedCall } from "react-icons/hi";
import { MdOutlineEmail } from "react-icons/md";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

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

function AllLeads() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [array, setArray] = React.useState([]);
  const [Copen, setCOpen] = useState(false);
  const [deleteID, setdeleteID] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const Navigate = useNavigate();
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSMSModalOpen, setisSMSModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [emailOpen, setEmailOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState();
  const [selectedText, setSelectedText] = useState();

  function OpenDelete(id, firstname, lastname) {
    setdeleteID(id);
    setFirstname(firstname);
    setLastname(lastname);
    setCOpen(true);
  }

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
            to: selectedText,
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
            email: selectedEmail,
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
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 200,
      headerClassName: "bg-blue-500 text-white text-lg",
      cellClassName: "text-center",
    },
    {
      field: "Sms",
      headerName: "SMS",
      width: 90,
      headerClassName: "bg-blue-500 text-white text-lg",
      cellClassName: "text-center",
      renderCell: (params) => (
        <Button variant="contained" color="primary" onClick={handleOpen}>
          <BsChatText className="h-5 w-5" />
        </Button>
      ),
    },
    {
      field: "Call",
      headerName: "Call",
      width: 90,
      headerClassName: "bg-blue-500 text-white text-lg",
      cellClassName: "text-center",
      renderCell: (params) => (
        <Button variant="contained" color="primary" onClick={HandleRingCentral}>
          <HiOutlinePhoneMissedCall className="h-5 w-5" />
        </Button>
      ),
    },
    {
      field: "Email",
      headerName: "Email",
      width: 90,
      headerClassName: "bg-blue-500 text-white text-lg",
      cellClassName: "text-center",
      renderCell: (params) => (
        <Button variant="contained" color="primary" onClick={handleEmailOpen}>
          <MdOutlineEmail className="h-5 w-5" />
        </Button>
      ),
    },
    {
      field: "firstname",
      headerName: "First name",
      width: 130,
      headerClassName: "bg-blue-500 text-white text-lg",
      cellClassName: "text-center",
    },
    {
      field: "lastname",
      headerName: "Last name",
      width: 130,
      headerClassName: "bg-blue-500 text-white text-lg",
      cellClassName: "text-center",
    },
    {
      field: "email",
      headerName: "Email",
      type: "email",
      width: 240,
      headerClassName: "bg-blue-500 text-white text-lg",
      cellClassName: "text-center",
    },
    {
      field: "phone",
      headerName: "Phone",
      type: "number",
      width: 150,
      headerClassName: "bg-blue-500 text-white text-lg",
      cellClassName: "text-center",
    },
    {
      field: "status",
      headerName: "Status",
      width: 140,
      headerClassName: "bg-blue-500 text-white text-lg",
      cellClassName: "text-center",
    },
    {
      field: "del",
      headerName: "Delete",
      width: 90,
      headerClassName: "bg-blue-500 text-white text-lg",
      cellClassName: "text-center",
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          onClick={() =>
            OpenDelete(params.row.id, params.row.firstname, params.row.lastname)
          }
        >
          <AiOutlineDelete className="h-6 w-6" />
        </Button>
      ),
    },
    {
      field: "update",
      headerName: "Update",
      width: 90,
      headerClassName: "bg-blue-500 text-white text-lg",
      cellClassName: "text-center",
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            Navigate("/updateLead", {
              state: {
                id: params.row.id,
              },
            })
          }
        >
          <AiOutlineEdit className="w-6 h-6" />
        </Button>
      ),
    },
  ];

  const myRef = useRef(false);

  useEffect(() => {
    if (myRef.current) return;
    myRef.current = true;
    try {
      axios
        .get(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/lead/user_all`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          const data = res?.data;
          const leads = data?.lead;
          // const leads = res.data.lead;
          if (leads !== undefined) {
            leads.forEach((element, index) => {
              const dd = {
                id: element._id,
                lastname: element.leads[0].lastname,
                firstname: element.leads[0].firstname,
                email: element.leads[0].email,
                phone: element.leads[0].phone,
                status: "NewLead",
              };
              setArray((oldPosts) => [...oldPosts, dd]);
            });
          } else {
            toast.error("No Leads Found");
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong!");
        });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  }, []);
  const handleDelete = async () => {
    console.log("handle del iddd:", deleteID);
    try {
      const result = await axios.delete(
        `${
          import.meta.env.VITE_REACT_APP_SERVER_URL
        }/lead/delete/user/${deleteID}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(result.data.message);
      setOpen(false);
      let updatedArray = array.filter((item) => item.id !== deleteID);
      setArray(updatedArray);
    } catch (error) {
      console.log("Error while deleting lead", error);
    }
  };
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Page header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
                  Leads ✨
                </h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Add customer button */}
                <button
                  className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                  onClick={() => {
                    Navigate("/addCustomer");
                  }}
                >
                  <svg
                    className="w-4 h-4 fill-current opacity-50 shrink-0"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="hidden xs:block ml-2">Add Leads</span>
                </button>
              </div>
            </div>

            {/* Table */}
            <div style={{ height: 430, width: "100%" }}>
              <DataGrid
                rows={array}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                className="curson-pointer"
                onCellClick={(e) => {
                  setSelectedEmail(e.row.email);
                  setSelectedText(e.row.phone);
                  if (e.value === undefined) {
                    null;
                  } else {
                    Navigate("/Leaddetails", {
                      state: {
                        id: e.id,
                      },
                    });
                  }
                }}
              />
            </div>
          </div>
          {/* Email Modal */}
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
                    value={selectedEmail}
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
          {/* SMS Modal */}
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
                value={selectedText}
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
        </main>
      </div>
      <Conformation
        open={Copen}
        title={firstname + " " + lastname}
        deleteFunction={handleDelete}
        closeDialog={() => setCOpen(false)}
      />
    </div>
  );
}

export default AllLeads;
