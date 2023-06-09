import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const AddCoBorrower = (props) => {
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
            disabled
            id="outlined-password-input"
            label="Suffix"
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.suffix : ""}
          />
          <TextField
            id="outlined-password-input"
            label="Email"
            disabled
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.email : ""}
          />
          <TextField
            id="outlined-password-input"
            label="Phone Number"
            disabled
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.phone_number : ""}
          />
          <TextField
            id="outlined-password-input"
            label="Mailing Address"
            disabled
            type="email"
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.mailing_address : ""}
          />
          <TextField
            id="outlined-password-input"
            label="Martial Status"
            disabled
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.martial_status : ""}
          />
          <TextField
            id="outlined-password-input"
            label="Current Address"
            // placeholder="yyyy-mm-dd"
            disabled
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.current_address : ""}
          />
          <TextField
            id="outlined-password-input"
            label="Month At Current Address"
            disabled
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.month_at_current_address : ""}
          />
          <TextField
            id="outlined-password-input"
            label="Current Montly Rent Amount"
            disabled
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.current_monthly_rent_amount : ""}
          />

          <TextField
            id="outlined-password-input"
            label="Year At Current Address"
            disabled
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.years_at_current_address : ""}
          />
          <TextField
            id="outlined-password-input"
            label="Is Co Borrower"
            disabled
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.is_co_borrower : ""}
          />
          {/* <TextField
            id="outlined-password-input"
            label="Income Type"
            disabled
            InputLabelProps={{
              shrink: true,
            }}
            value={incomeType}
            onChange={(e) => {
              setIncomeType(e.target.value);
            }}
          /> */}
        </Box>
      </div>
    </>
  );
};

export default AddCoBorrower;
