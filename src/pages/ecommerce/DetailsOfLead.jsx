import React, { useState, useContext, useEffect } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
import AddCoBorrower from "./AddCoBorrower";
import AddContact from "./AddContact";
import { AuthContext } from "../../context/AuthContext";
import OpportunityDetails from "./OpportunityDetails";
import RefinanceDetails from "./RefinanceDetails";
import PurchaseDetails from "./PurchaseDetails";
import QualificationQuestions from "./QualifyingQuestions";
import LeadDetails from "./LeadNotes";
import ExtendedPropertyInfo from "./ExtendedPropertyInfo";
import { CgDetailsMore } from "react-icons/cg";
import { GiPortal } from "react-icons/gi";

const DetailsOfLead = () => {
  const [value, setValue] = useState(0);
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
  const [clearFields, setClearFields] = useState(false);
  const [coBorrowerObj, setCoBorrowerObj] = useState();
  const [addressObj, setAddressObj] = useState();
  const [assetsObj, setAssetsObj] = useState();
  const [creditObj, setCreditObj] = useState();
  const [loanObj, setLoanObj] = useState();
  const [propertyObj, setPropertyObj] = useState();
  const [agentObj, setAgentObj] = useState();
  const [militaryObj, setMilitaryObj] = useState();
  const Navigate = useNavigate();
  const Location = useLocation();
  const { setSession } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  const addCoBorrower = () => {
    setCoBorrower([...coBorrower, "Co-Borrower Component"]);
  };
  const addContact = () => {
    setContact([...contact, "Contact Component"]);
  };

  useEffect(() => {
    try {
      axios
        .get(
          `${import.meta.env.VITE_REACT_APP_SERVER_URL}/lead/user/params/${
            Location.state.id
          }`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              Custom: "Leads",
            },
          }
        )
        .then(function (response) {
          console.log(response);
          setfirstname(response.data.lead[0].leads[0].firstname);
          setlastname(response.data.lead[0].leads[0].lastname);
          setEmail(response.data.lead[0].leads[0].email);
          setphone(response.data.lead[0].leads[0].phone);

          setCoBorrowerObj(response.data.lead[0].coborrower_details[0]);
          setAddressObj(response.data.lead[0].address_infos[0]);
          setAssetsObj(response.data.lead[0].assets[0]);
          setCreditObj(response.data.lead[0].creditverifications[0]);
          setLoanObj(response.data.lead[0].loandetails[0]);
          setPropertyObj(response.data.lead[0].propertyinfos[0]);
          setAgentObj(response.data.lead[0].realestateagents[0]);
          setMilitaryObj(response.data.lead[0].military_infos[0]);
        })
        .catch(function (error) {
          console.log(error);
          toast("Something Went Wrong", {
            position: "top-center",
          });
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
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
            <Box sx={{ width: 1100 }} className="flex justify-center mb-5">
              <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              >
                <BottomNavigationAction
                  label="LeadDetails"
                  icon={<CgDetailsMore />}
                />
                <BottomNavigationAction
                  label="Portal"
                  icon={<GiPortal />}
                  onClick={() =>
                    Navigate("/portal", {
                      state: {
                        leadId: Location.state.id,
                        firstName: firstname,
                        lastName: lastname,
                        email: email,
                        phone: phone,
                      },
                    })
                  }
                />
              </BottomNavigation>
            </Box>
            <Box
              className="border-solid border-2 rounded-md border-indigo-200 px-2 py-4 ml-2"
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <h1 className="ml-4 mb-3 font-medium">Borrower Information</h1>
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
                id="outlined-basic"
                variant="outlined"
                label="FirstName"
                disabled
                type="text"
                InputLabelProps={{
                  shrink: true,
                }}
                value={firstname}
                onChange={(e) => setfirstname(e.target.value)}
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
                id="outlined-password-input"
                label="LastName"
                disabled
                InputLabelProps={{
                  shrink: true,
                }}
                value={lastname}
                onChange={(e) => setlastname(e.target.value)}
              />
              <TextField
                id="outlined-password-input"
                label="Mobile Phone"
                disabled
                InputLabelProps={{
                  shrink: true,
                }}
                value={phone}
                onChange={(e) => setphone(e.target.value)}
              />
              <TextField
                id="outlined-password-input"
                label="Email"
                disabled
                type="email"
                InputLabelProps={{
                  shrink: true,
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                id="outlined-password-input"
                label="Martial Status"
                disabled
                // type="email"
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
            </Box>
            <div className="ml-4 mb-4 mt-4">
              <AddCoBorrower d={coBorrowerObj} />
              {/* {coBorrower.map((index) => (
                <AddCoBorrower
                  d={coBorrowerData[index + 1]}
                  setD={setCoBorrowerData}
                  co={obj}
                  setCo={setObj}
                  clear={clearFields}
                  setClear={setClearFields}
                />
              ))} */}
            </div>
            <div className="ml-4 mb-4 mt-4">
              <AddContact d={addressObj} />
              {/* {contact.map((index) => (
                <AddContact
                  d={contactData[index + 1]}
                  setD={setContactData}
                  co={contactObj}
                  setCo={setContactObj}
                  clear={clearFields}
                  setClear={setClearFields}
                />
              ))} */}
            </div>
            <div className="ml-4 mb-4 mt-4">
              <OpportunityDetails d={assetsObj} />
            </div>
            <div className="ml-4 mb-4 mt-4">
              <RefinanceDetails d={creditObj} />
            </div>
            <div className="ml-4 mb-4 mt-4">
              <PurchaseDetails d={loanObj} />
            </div>
            <div className="ml-4 mb-4 mt-4">
              <QualificationQuestions d={propertyObj} />
            </div>
            <div className="ml-4 mb-4 mt-4">
              <ExtendedPropertyInfo d={agentObj} />
            </div>
            <div className="ml-4 mb-4 mt-4">
              <LeadDetails d={militaryObj} />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default DetailsOfLead;
