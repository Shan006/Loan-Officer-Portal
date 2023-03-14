import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const AddContact = (props) => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [mobilePhone, setMobilePhone] = useState();
  const [email, setEmail] = useState();
  const [bestContactMethod, setBestContactMethod] = useState();
  const [alternatePhone, setAlternatePhone] = useState();
  const [decisionMaker, setDecisionMaker] = useState();
  const [relationToBorrower, setRelationToBorrower] = useState();

  // useEffect(() => {
  //   props.d.firstname && setFirstName(props.d.firstname);
  //   props.d.lastname && setLastName(props.d.lastname);
  //   props.d.phone && setMobilePhone(props.d.phone);
  //   props.d.email && setEmail(props.d.email);
  //   props.d.alternate_email && setAlternatePhone(props.d.alternate_email);
  //   props.d.decision_maker && setDecisionMaker(props.d.decision_maker);
  //   props.d.contact_type && setBestContactMethod(props.d.contact_type);
  //   props.d.relationship && setRelationToBorrower(props.d.relationship);
  // }, [props.d.length > 0]);

  // useEffect(() => {
  //   setFirstName("");
  //   setLastName("");
  //   setMobilePhone("");
  //   setEmail("");
  //   setBestContactMethod("");
  //   setAlternatePhone("");
  //   setDecisionMaker("");
  //   setRelationToBorrower("");
  //   props.setClear(false);
  // }, [props.clear]);

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
        <h1 className="ml-4 font-medium">Contact Information</h1>
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
              props.setCo({ ...props.co, phone: e.target.value });
            }}
          />
          <TextField
            id="outlined-password-input"
            label="Alternate Phone"
            InputLabelProps={{
              shrink: true,
            }}
            value={alternatePhone}
            onChange={(e) => {
              props.setCo({ ...props.co, alternatePhone: e.target.value });
            }}
          />
          <TextField
            id="outlined-password-input"
            label="Decision Maker"
            InputLabelProps={{
              shrink: true,
            }}
            value={decisionMaker}
            onChange={(e) => {
              props.setCo({ ...props.co, decisionMaker: e.target.value });
            }}
          />
          <TextField
            id="outlined-select-currency"
            select
            label="Best Contact Method"
            defaultValue="E"
            onChange={(e) => {
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

export default AddContact;
