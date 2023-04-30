import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Sidebar from "../../../partials/Sidebar";
import Header from "../../../partials/Header";
import WelcomeBanner from "../../../partials/dashboard/WelcomeBanner";
import Button from "@mui/material/Button";
import axios from "axios";
import { toast } from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const CreateContact = () => {
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [firstname, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [group, setGroup] = useState("");
  const navigate = useNavigate();
  const SetEmpty = () => {
    setFirstName("");
    setEmail("");
    setGroup("");
    setPhone("");
  };
  // const navigate = useNavigate();
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
  const Add_User = async () => {
    if (firstname != "" && phone != "" && email != "" && group != "") {
      try {
        const result = await axios.post(
          `${import.meta.env.VITE_REACT_APP_SERVER_URL}/contact/user/add`,
          {
            contact_group: [
              {
                group_name: group,
                contacts: [
                  {
                    name: firstname,
                    email: email,
                    phone: phone,
                  },
                ],
              },
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setLoading(true);
        toast.success("Contact Added Successfully");
        console.log(result);
        setLoading(false);
        SetEmpty();
      } catch (error) {
        setLoading(false);
        toast.error("SomeThing Went Wrong");
        console.log("Error while adding user", error);
      }
    } else {
      toast.error("Please fill the feilds!!!");
    }
  };

  const Roles = [
    {
      value: "Realtor",
      lable: "Realtor",
    },
    {
      value: "LoanOfficer",
      lable: "Loan Officer",
    },
    {
      value: "LoanProcessor",
      lable: "Loan Processor",
    },
    {
      value: "Lead",
      lable: "Lead",
    },
  ];
  return (
    <>
      {loading ? (
        <div className=" flex items-center justify-center h-full w-full">
          <TailSpin height={60} />
        </div>
      ) : (
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
                className="border-solid border-2   rounded-md border-indigo-200 px-2 py-4 ml-2"
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <h1 className="ml-4 mb-3 font-bold text-2xl ">
                  Create Contact
                </h1>

                <TextField
                  id="outlined-password-input"
                  label=" Name"
                  autoComplete="off"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={firstname}
                  onChange={(e) => setFirstName(e.target.value)}
                />

                <TextField
                  id="outlined-password-input"
                  label="Email"
                  autoComplete="off"
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
                  label="Phone Number"
                  autoComplete="off"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />

                <TextField
                  id="outlined-password-input"
                  label="group"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  select
                  onChange={(e) => setGroup(e.target.value)}
                >
                  {Roles.map((roles) => (
                    <MenuItem value={roles.value} key={roles.value}>
                      {roles.lable}
                    </MenuItem>
                  ))}
                </TextField>
                <Button
                  variant="contained"
                  color="primary"
                  className="m-3"
                  onClick={Add_User}
                >
                  Submit
                </Button>

                {/* <button className="btn pt-2 px-4 hover:bg-[#058cc1] bg-[#1d4189] text-white ml-3 whitespace-nowrap" onClick={Add_User} >
              Submit
              </button> */}
              </Box>
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateContact;
