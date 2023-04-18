import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
import { alpha, styled } from "@mui/material/styles";
import { toast } from "react-hot-toast";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import WelcomeBanner from "../../partials/dashboard/WelcomeBanner";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import AddCoBorrower from "./AddCoBorrower";
import AddContact from "./AddContact";
import OpportunityDetails from "./OpportunityDetails";
import RefinanceDetails from "./RefinanceDetails";
import PurchaseDetails from "./PurchaseDetails";
import QualificationQuestions from "./QualifyingQuestions";
import LeadDetails from "./LeadNotes";
import ExtendedPropertyInfo from "./ExtendedPropertyInfo";
import AddRealtor from "./AddRealtor";

const AddCustomers = () => {
  const [userId, setUserId] = useState("");
  const [coBorrower, setCoBorrower] = useState([]);
  const [contact, setContact] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [firstname, setfirstname] = useState();
  const [middlename, setmiddlename] = useState();
  const [lastname, setlastname] = useState();
  const [phone, setphone] = useState();
  const [email, setEmail] = useState();
  const [suffix, setSuffix] = useState();
  const [income, setIncome] = useState();
  const [incomeType, setIncomeType] = useState();
  const [martialStatus, setMartialStatus] = useState();
  const [language, setLanguage] = useState([]);
  const [coBorrowerData, setCoBorrowerData] = useState([]);
  const [contactData, setContactData] = useState([]);
  const [opportunityDetails, setOpportunityDetails] = useState([]);
  const [refinanceDetails, setRefinanceDetails] = useState([]);
  const [purchaseDetails, setPurchaseDetails] = useState([]);
  const [qualifyingQuestions, setQualificationQuestions] = useState([]);
  const [leadDetails, setLeadDetails] = useState([]);
  const [extendedPropertyInfo, setExtendedPropertyInfo] = useState([]);
  const [clearFields, setClearFields] = useState(false);
  const [status, setStatus] = useState();
  const [realtorDetails, setRealtorDetails] = useState();
  const [isValid, setIsValid] = useState(false);

  const Navigate = useNavigate();

  const validateEmail = (value) => {
    // regex to check if email is valid
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(value);
  };
  const handleEmailChange = (event) => {
    const emailValue = event.target.value;
    setEmail(emailValue);
    setIsValid(validateEmail(emailValue));
  };

  const addCoBorrower = () => {
    setCoBorrower([...coBorrower, "Co-Borrower Component"]);
  };
  const addContact = () => {
    setContact([...contact, "Contact Component"]);
  };

  const AddData = (e) => {
    e.preventDefault();
    if ((firstname === "", lastname === "", phone === "", email === "")) {
      toast("Please Fill The Required Fields", {
        position: "top-center",
      });
    }
    if (realtorDetails !== undefined) {
      const DataToSend = {
        firstname,
        lastname,
        phone,
        email,
        realtorDetails,
      };

      axios
        .post(
          `${import.meta.env.VITE_REACT_APP_SERVER_URL}/lead/user/add`,
          DataToSend,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(function (response) {
          console.log(response);
          setfirstname("");
          setlastname("");
          setphone("");
          setEmail("");
          toast.success("Lead Added Successfully", {
            position: "top-center",
          });
        })
        .catch(function (error) {
          console.log(error);
          if (error.response.data.message === "jwt expired") {
            Navigate("/signin/unauthorized");
            toast.success(
              "Session Expired Please Join Again Through Refferal Link"
            );
            localStorage.removeItem("token");
          }
          toast.error("Something Went Wrong", {
            position: "top-center",
          });
        });
    } else {
      const DataToSend = {
        firstname,
        lastname,
        phone,
        email,
      };

      axios
        .post(
          `${import.meta.env.VITE_REACT_APP_SERVER_URL}/lead/user/add`,
          DataToSend,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(function (response) {
          console.log(response);
          setfirstname("");
          setlastname("");
          setphone("");
          setEmail("");
          toast.success("Lead Added Successfully", {
            position: "top-center",
          });
        })
        .catch(function (error) {
          console.log(error);
          toast.error("Something Went Wrong", {
            position: "top-center",
          });
        });
    }
  };

  const currencies = [
    {
      value: "phone",
      label: "Mobile Phone",
    },
    {
      value: "HomePhone",
      label: "Home Phone",
    },
    {
      value: "WorkPhone",
      label: "Work Phone",
    },
    {
      value: "Text",
      label: "Text",
    },
    {
      value: "email",
      label: "Email",
    },
  ];

  // const CssTextField = styled(TextField)({
  //   "& label.Mui-focused": {
  //     color: "red",
  //   },
  //   "& .MuiInput-underline:after": {
  //     borderBottomColor: "red",
  //   },
  //   "& .MuiOutlinedInput-root": {
  //     "& fieldset": {
  //       borderColor: "red",
  //     },
  //     "&:hover fieldset": {
  //       borderColor: "red",
  //     },
  //     "&.Mui-focused fieldset": {
  //       borderColor: "red",
  //     },
  //   },
  // });

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              <WelcomeBanner />
            </div>
            <Box
              className="border-solid border-2 rounded-md border-indigo-200 px-2 py-4 ml-2"
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <div className="flex justify-between">
                <h1 className="ml-4 mb-3 font-medium">Borrower Information</h1>
                <Button onClick={AddData} variant="contained">
                  Submit
                </Button>
              </div>
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="FirstName"
                type="text"
                InputLabelProps={{
                  shrink: true,
                }}
                value={firstname}
                onChange={(e) => setfirstname(e.target.value)}
              />
              <TextField
                id="outlined-password-input"
                label="LastName"
                InputLabelProps={{
                  shrink: true,
                }}
                value={lastname}
                onChange={(e) => setlastname(e.target.value)}
              />
              <TextField
                id="outlined-password-input"
                label="Mobile Phone"
                InputLabelProps={{
                  shrink: true,
                }}
                value={phone}
                onChange={(e) => setphone(e.target.value)}
              />
              <TextField
                id="outlined-password-input"
                label="Email"
                type="email"
                InputLabelProps={{
                  shrink: true,
                }}
                value={email}
                onChange={handleEmailChange}
                error={!isValid}
                helperText={isValid ? "" : "Please enter valid email!!"}
              />
              <TextField
                id="outlined-password-input"
                label="MiddleName"
                disabled
                InputLabelProps={{
                  shrink: true,
                }}
                value={middlename}
                onChange={(e) => setmiddlename(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                variant="outlined"
                disabled
                label="Suffix"
                type="text"
                InputLabelProps={{
                  shrink: true,
                }}
                value={suffix}
                onChange={(e) => setSuffix(e.target.value)}
              />
              <TextField
                id="outlined-password-input"
                label="Martial Status"
                disabled
                type="email"
                InputLabelProps={{
                  shrink: true,
                }}
                value={martialStatus}
                onChange={(e) => setMartialStatus(e.target.value)}
              />
              <TextField
                id="outlined-password-input"
                label="Additional Incomes"
                disabled
                type="email"
                InputLabelProps={{
                  shrink: true,
                }}
                value={income}
                onChange={(e) => setIncome(e.target.value)}
              />
              <TextField
                id="outlined-password-input"
                label="Income Type"
                disabled
                type="email"
                InputLabelProps={{
                  shrink: true,
                }}
                value={incomeType}
                onChange={(e) => setIncomeType(e.target.value)}
              />
              <br></br>
              <Button
                variant="outlined"
                className="mt-3"
                onClick={addCoBorrower}
              >
                Add Co-Borrower
              </Button>
              <Button variant="outlined" className="mt-3" onClick={addContact}>
                Add Contact
              </Button>
            </Box>
            <div className="ml-4 mb-4 mt-4">
              <AddRealtor
                details={realtorDetails}
                setDetails={setRealtorDetails}
              />
            </div>
            <div className="ml-4 mb-4 mt-4">
              <AddCoBorrower />
              {coBorrower.map((index) => (
                <AddCoBorrower />
              ))}
            </div>
            <div className="ml-4 mb-4 mt-4">
              <AddContact />
              {contact.map((index) => (
                <AddContact />
              ))}
            </div>
            <div className="ml-4 mb-4 mt-4">
              <OpportunityDetails />
            </div>
            <div className="ml-4 mb-4 mt-4">
              <RefinanceDetails />
            </div>
            <div className="ml-4 mb-4 mt-4">
              <PurchaseDetails />
            </div>
            <div className="ml-4 mb-4 mt-4">
              <QualificationQuestions />
            </div>
            <div className="ml-4 mb-4 mt-4">
              <ExtendedPropertyInfo />
            </div>
            <div className="ml-4 mb-4 mt-4">
              <LeadDetails />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AddCustomers;
