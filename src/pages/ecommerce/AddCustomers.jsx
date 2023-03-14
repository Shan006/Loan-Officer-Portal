import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
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
import { AuthContext } from "../../context/AuthContext";
import AddCoBorrower from "./AddCoBorrower";
import AddContact from "./AddContact";
import OpportunityDetails from "./OpportunityDetails";
import RefinanceDetails from "./RefinanceDetails";
import PurchaseDetails from "./PurchaseDetails";
import QualificationQuestions from "./QualifyingQuestions";
import LeadDetails from "./LeadNotes";
import ExtendedPropertyInfo from "./ExtendedPropertyInfo";

const AddCustomers = () => {
  const { backendUri } = useContext(AuthContext);
  const [userId, setUserId] = useState("");
  const [coBorrower, setCoBorrower] = useState([]);
  const [contact, setContact] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [firstname, setfirstname] = useState();
  const [lastname, setlastname] = useState();
  const [phone, setphone] = useState();
  const [email, setEmail] = useState();
  const [alternateEmail, setAlternateEmail] = useState();
  const [contactMethod, setContactMethod] = useState();
  const [creditScore, setCreditScore] = useState();
  const [DTI, setDTI] = useState();
  const [LTV, setLTV] = useState();
  const [liquidAssets, setLiquidAssets] = useState();
  const [SSN, setSSN] = useState();
  let [dob, setDob] = useState();
  const [source, setSource] = useState();
  const [workingWithRetailor, setWorkingWithRetailor] = useState();
  const [referalpartner, setReferalpartner] = useState();
  const [referalSource, setReferalSource] = useState();
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
  const [obj, setObj] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    dob: "",
    creditScore: "",
    bestContactMethod: "",
    relationToBorrower: "",
  });
  const [contactObj, setContactObj] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    alternatePhone: "",
    decisionMaker: "",
    bestContactMethod: "",
    relationToBorrower: "",
  });
  const [opportunityObj, setOpportunityObj] = useState({
    SubjectPropertyAddress: "",
    city: "",
    state: "",
    zipCode: "",
    purpose: "",
    objective: "",
    loanAmount: "",
    compensation: "",
    country: "",
    propertyType: "",
    uints: "",
    AppraisalValue: "",
    targetRate: "",
    targetRateType: "",
    propertyUse: "",
    occupancy: "",
  });
  const [refinanceObj, setRefinanceObj] = useState({
    mortgageProgram: "",
    loanDate: "",
    originalLoanBalance: "",
    currentLoanBalance: "",
    payoff: "",
    purchasePrice: "",
    purchaseDate: "",
    mortgageStatus: "",
    interestRate: "",
    rateType: "",
    monthlyPayment: "",
    proposedPayment: "",
    moneySaved: "",
    borrowerOpinionValue: "",
    cashOutAmount: "",
    refiPurpose: "",
  });
  const [purchaseObj, setPurchaseObj] = useState({
    area: "",
    purchasePrice: "",
    downPaymentAmount: "",
    timeframe: "",
  });
  const [qualifiyingQuestionsObj, setQualifyingQuestionsObj] = useState({
    bankruptcy: "",
    foreclosure: "",
    shortSale: "",
    latePayments: "",
    firstTimeHomeBuyer: "",
    fhaLoan: "",
    veteran: "",
    vaDisability: "",
  });
  const [extendedQualityUseObj, setExtendedQualityUseObj] = useState({
    zillow_url_link: "",
    zestimate: "",
    street_view_link: "",
    costar_link: "",
    year_built: "",
    last_sold_date: "",
    last_sold_year: "",
    last_sold_price: "",
    listed: "",
    estimated_ceo: "",
    tax_assessment: "",
    sqaure_footage: "",
    square_footage_added: "",
    finished_square_footage: "",
    adding_units: "",
    number_of_units: "",
    number_of_bedrooms: "",
    number_of_bathrooms: "",
    cltv: "",
    preferred_equity_amount: "",
    property_notes: "",
  });
  const [leadDetailsObj, setLeadDetailsObj] = useState({
    entity_name: "",
    entity_type: "",
    account_priority: "",
    reference_id: "",
    tags: [],
    notes: "",
  });

  const Navigate = useNavigate();
  const token = localStorage.getItem("token");

  const addCoBorrower = () => {
    setCoBorrower([...coBorrower, "Co-Borrower Component"]);
  };
  const addContact = () => {
    setContact([...contact, "Contact Component"]);
  };

  // useEffect(() => {
  //   console.log(session.token);
  //   axios
  //     .get(`${backendUri}/lead/user/params/userId`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then(function (response) {
  //       console.log(response);
  //       console.log("Data", response.data.leads);
  //       setLeadData(response.data.leads);
  // setCoBorrowerData(response.data.leads.coborrower_details);
  // for (let i = 1; i < (response.data.leads.coborrower_details.length)-1; i++) {
  //   setCoBorrower([...coBorrower, "Co-Borrower Component"]);
  // }
  // setContactData(response.data.leads.other_company_details);
  // for (let i = 1; i < (response.data.leads.other_company_details.length)-1; i++) {
  //   setContact([...contact, "Contact Component"]);
  // }
  // setOpportunityDetails(response.data.leads.opportunity_details);
  // setRefinanceDetails(response.data.leads.refinance_details);
  // setPurchaseDetails(response.data.leads.purchase_details);
  // setQualificationQuestions(response.data.leads.qualifying_questions);
  // setExtendedPropertyInfo(response.data.leads.property_information);
  // setLeadDetails(response.data.leads.lead_notes);
  //     })
  //     .catch(function (error) {
  //       toast("Something Went Wrong", {
  //         position: "top-center",
  //       });
  //       console.log(error);
  //     });
  // }, [userId]);

  const AddData = (e) => {
    e.preventDefault();
    const DataToSend = {
      firstname,
      lastname,
      phone,
      email,
    };
    console.log(token);

    axios
      .post(
        `${import.meta.env.VITE_REACT_APP_SERVER_URL}/lead/user/add`,
        DataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
        console.log("Added");
        console.log(DataToSend);
      })
      .catch(function (error) {
        console.log(DataToSend);
        toast.error("Something Went Wrong", {
          position: "top-center",
        });
        console.log(error);
      });
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
              <div className="flex justify-between mr-2">
                <h1 className="ml-4 mb-3 font-medium">Borrower Information</h1>
                <Button variant="contained" onClick={AddData}>
                  Submit
                </Button>
              </div>
              <TextField
                id="outlined-password-input"
                label="firstname"
                InputLabelProps={{
                  shrink: true,
                }}
                value={firstname}
                onChange={(e) => setfirstname(e.target.value)}
              />
              <TextField
                id="outlined-password-input"
                label="lastname"
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
                InputLabelProps={{
                  shrink: true,
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                id="outlined-password-input"
                label="Alternate Email"
                InputLabelProps={{
                  shrink: true,
                }}
                value={alternateEmail}
                onChange={(e) => setAlternateEmail(e.target.value)}
              />
              <TextField
                id="outlined-select-currency"
                select
                label="Best Contact Method"
                // defaultValue="E"
                onChange={(e) => setContactMethod(e.target.value)}
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="outlined-password-input"
                label="Credit Score"
                InputLabelProps={{
                  shrink: true,
                }}
                value={creditScore}
                onChange={(e) => setCreditScore(e.target.value)}
              />
              <TextField
                id="outlined-password-input"
                label="DTI"
                InputLabelProps={{
                  shrink: true,
                }}
                value={DTI}
                onChange={(e) => setDTI(e.target.value)}
              />
              <TextField
                id="outlined-password-input"
                label="LTV"
                InputLabelProps={{
                  shrink: true,
                }}
                value={LTV}
                onChange={(e) => setLTV(e.target.value)}
              />
              <TextField
                id="outlined-password-input"
                label="Liquid Assets"
                InputLabelProps={{
                  shrink: true,
                }}
                value={liquidAssets}
                onChange={(e) => setLiquidAssets(e.target.value)}
              />
              <TextField
                id="outlined-password-input"
                label="SSN"
                InputLabelProps={{
                  shrink: true,
                }}
                value={SSN}
                onChange={(e) => setSSN(e.target.value)}
              />
              <TextField
                id="outlined-password-input"
                label="Date Of Birth"
                placeholder="yyyy-mm-dd"
                InputLabelProps={{
                  shrink: true,
                }}
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
              <TextField
                id="outlined-select-currency"
                select
                label="Source"
                // defaultValue="E"
                onChange={(e) => {
                  setSource(e.target.value);
                  console.log(e.target.value);
                }}
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="outlined-select-currency"
                select
                label="Working With Realtor?"
                // defaultValue="E"
                onChange={(e) => {
                  setWorkingWithRetailor(e.target.value);
                }}
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="outlined-password-input"
                label="Referral Partner"
                InputLabelProps={{
                  shrink: true,
                }}
                value={referalpartner}
                onChange={(e) => setReferalpartner(e.target.value)}
              />
              <TextField
                id="outlined-password-input"
                label="Referral Source"
                InputLabelProps={{
                  shrink: true,
                }}
                value={referalSource}
                onChange={(e) => setReferalSource(e.target.value)}
              />
              <FormGroup className="flex flex-row mt-2 ml-2">
                <FormControlLabel
                  control={<Checkbox />}
                  onClick={(e) => {
                    if (language.length === 0) {
                      language.push(e.target.name);
                    } else {
                      setLanguage([...language, e.target.name]);
                    }
                  }}
                  label="Spanish"
                  name="Spanish"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  onClick={(e) => {
                    if (language.length === 0) {
                      language.push(e.target.name);
                    } else {
                      setLanguage([...language, e.target.name]);
                    }
                  }}
                  label="Chinese"
                  name="Chinese"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  onClick={(e) => {
                    if (language.length === 0) {
                      language.push(e.target.name);
                    } else {
                      setLanguage([...language, e.target.name]);
                    }
                  }}
                  label="Others"
                  name="Others"
                />
              </FormGroup>
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
              <AddCoBorrower
                d={coBorrowerData[0]}
                setD={setCoBorrowerData}
                co={obj}
                setCo={setObj}
                clear={clearFields}
                setClear={setClearFields}
              />
              {coBorrower.map((index) => (
                <AddCoBorrower
                  d={coBorrowerData[index + 1]}
                  setD={setCoBorrowerData}
                  co={obj}
                  setCo={setObj}
                  clear={clearFields}
                  setClear={setClearFields}
                />
              ))}
            </div>
            <div className="ml-4 mb-4 mt-4">
              <AddContact
                d={contactData[0]}
                setD={setContactData}
                co={contactObj}
                setCo={setContactObj}
                clear={clearFields}
                setClear={setClearFields}
              />
              {contact.map((index) => (
                <AddContact
                  d={contactData[index + 1]}
                  setD={setContactData}
                  co={contactObj}
                  setCo={setContactObj}
                  clear={clearFields}
                  setClear={setClearFields}
                />
              ))}
            </div>
            <div className="ml-4 mb-4 mt-4">
              <OpportunityDetails
                d={opportunityDetails[0]}
                setD={setOpportunityDetails}
                co={opportunityObj}
                setCo={setOpportunityObj}
                clear={clearFields}
                setClear={setClearFields}
              />
            </div>
            <div className="ml-4 mb-4 mt-4">
              <RefinanceDetails
                d={refinanceDetails[0]}
                setD={setRefinanceDetails}
                co={refinanceObj}
                setCo={setRefinanceObj}
                clear={clearFields}
                setClear={setClearFields}
              />
            </div>
            <div className="ml-4 mb-4 mt-4">
              <PurchaseDetails
                d={purchaseDetails[0]}
                setD={setPurchaseDetails}
                co={purchaseObj}
                setCo={setPurchaseObj}
                clear={clearFields}
                setClear={setClearFields}
              />
            </div>
            <div className="ml-4 mb-4 mt-4">
              <QualificationQuestions
                d={qualifyingQuestions[0]}
                setD={setQualificationQuestions}
                co={purchaseObj}
                setCo={setPurchaseObj}
                clear={clearFields}
                setClear={setClearFields}
              />
            </div>
            <div className="ml-4 mb-4 mt-4">
              <ExtendedPropertyInfo
                d={extendedPropertyInfo[0]}
                setD={setExtendedPropertyInfo}
                co={purchaseObj}
                setCo={setPurchaseObj}
                clear={clearFields}
                setClear={setClearFields}
              />
            </div>
            <div className="ml-4 mb-4 mt-4">
              <LeadDetails
                d={leadDetails[0]}
                setD={setLeadDetails}
                co={purchaseObj}
                setCo={setPurchaseObj}
                clear={clearFields}
                setClear={setClearFields}
              />
            </div>
          </main>
        </div>
        {/* <ToastContainer /> */}
      </div>
    </>
  );
};

export default AddCustomers;
