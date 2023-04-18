import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const AddRealtor = (props) => {
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [isValid, setIsValid] = useState(false);

  const validateEmail = (value) => {
    // regex to check if email is valid
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(value);
  };
  const handleEmailChange = (event) => {
    const emailValue = event.target.value;
    setEmail(emailValue);
    props.setDetails({ ...props.details, email: event.target.value });
    setIsValid(validateEmail(emailValue));
  };

  return (
    <>
      <div className="border-solid border-2 rounded-md border-indigo-200 py-3 mt-4">
        <h1 className="ml-4 font-medium">Realtor Information</h1>
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
            value={firstname}
            onChange={(e) => {
              setFirstname(e.target.value);
              props.setDetails({ ...props.details, firstname: e.target.value });
            }}
          />
          <TextField
            id="outlined-password-input"
            label="LastName"
            InputLabelProps={{
              shrink: true,
            }}
            value={lastname}
            onChange={(e) => {
              setLastname(e.target.value);
              props.setDetails({ ...props.details, lastname: e.target.value });
            }}
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
            label="Phone Number"
            InputLabelProps={{
              shrink: true,
            }}
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              props.setDetails({ ...props.details, phone: e.target.value });
            }}
          />
          {/* <button
            onClick={(e) => {
              e.preventDefault();
              console.log(props.co);
              console.log(props.d);
              console.log(count);
            }}
          >
            Check
          </button> */}
        </Box>
      </div>
    </>
  );
};

export default AddRealtor;
