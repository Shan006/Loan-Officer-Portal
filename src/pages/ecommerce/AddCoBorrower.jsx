import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const AddCoBorrower = (props) => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [mobilePhone, setMobilePhone] = useState();
  const [email, setEmail] = useState();
  const [bestContactMethod, setBestContactMethod] = useState();
  const [dob, setDob] = useState();
  const [creditScore, setCreditScore] = useState();
  const [relationToBorrower, setRelationToBorrower] = useState();

  // useEffect(() => {
  // props.d && setFirstName(props.d.firstname);
  // props.d && setLastName(props.d.lastname);
  // props.d && setMobilePhone(props.d.phone);
  // props.d && setEmail(props.d.email);
  // props.d && setBestContactMethod(props.d.contact_type);
  // props.d && setDob(props.d.DOB);
  // props.d && setCreditScore(props.d.credit_score);
  // props.d && setRelationToBorrower(props.d.relationship);
  // }, [props.d]);

  useEffect(() => {
    setFirstName("");
    setLastName("");
    setMobilePhone("");
    setEmail("");
    setBestContactMethod("");
    setDob("");
    setCreditScore("");
    setRelationToBorrower("");
    props.setClear(false);
  }, [props.clear]);

  const currencies = [
    {
      value: "MobilePhone",
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
      <div className="border-solid border-2 rounded-md border-indigo-200 py-3 mt-4">
        <h1 className="ml-4 font-medium">Co-Borrower Information</h1>
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
            label="FirstName"
            InputLabelProps={{
              shrink: true,
            }}
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              props.setCo({ ...props.co, firstname: e.target.value });
            }}
          />
          <TextField
            id="outlined-password-input"
            label="LastName"
            InputLabelProps={{
              shrink: true,
            }}
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              props.setCo({ ...props.co, lastname: e.target.value });
            }}
          />
          <TextField
            id="outlined-password-input"
            label="Email"
            InputLabelProps={{
              shrink: true,
            }}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              props.setCo({ ...props.co, email: e.target.value });
            }}
          />
          <TextField
            id="outlined-password-input"
            label="Mobile Phone"
            InputLabelProps={{
              shrink: true,
            }}
            value={mobilePhone}
            onChange={(e) => {
              setMobilePhone(e.target.value);
              props.setCo({ ...props.co, phone: e.target.value });
            }}
          />
          <TextField
            id="outlined-password-input"
            label="Date-Of-Birth"
            placeholder="yyyy-mm-dd"
            InputLabelProps={{
              shrink: true,
            }}
            value={dob}
            onChange={(e) => {
              setDob(e.target.value);
              props.setCo({ ...props.co, dob: e.target.value });
            }}
          />
          <TextField
            id="outlined-password-input"
            label="Credit Score"
            InputLabelProps={{
              shrink: true,
            }}
            value={creditScore}
            onChange={(e) => {
              setCreditScore(e.target.value);
              props.setCo({ ...props.co, creditScore: e.target.value });
            }}
          />
          <TextField
            id="outlined-select-currency"
            select
            label="Best Contact Method"
            defaultValue="E"
            onChange={(e) => {
              setBestContactMethod(e.target.value);
              props.setCo({ ...props.co, bestContactMethod: e.target.value });
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
            label="Relationship to Borrower"
            InputLabelProps={{
              shrink: true,
            }}
            value={relationToBorrower}
            onChange={(e) => {
              setRelationToBorrower(e.target.value);
              props.setCo({ ...props.co, relationToBorrower: e.target.value });
            }}
          />
          {/* <button
            onClick={(e) => {
              e.preventDefault();
              console.log(props.co);
            }}
          >
            Check
          </button> */}
        </Box>
      </div>
    </>
  );
};

export default AddCoBorrower;
