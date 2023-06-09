import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const AddContact = (props) => {
  return (
    <>
      <div className="border-solid border-2 rounded-md border-indigo-200 py-3 mt-4">
        <h1 className="ml-4 font-medium">Address Information</h1>
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
            label="Mailing Address"
            disabled
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.mailing_address : ""}
          />
          <TextField
            id="outlined-password-input"
            label="Another Former Address"
            disabled
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.another_former_address : ""}
          />
          <TextField
            id="outlined-password-input"
            label="Current Address"
            disabled
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.current_address : ""}
          />
          <TextField
            id="outlined-password-input"
            label="Current Monthly Rent Amount"
            disabled
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.current_monthly_rent_amount : ""}
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
            label="Year At Current Address"
            disabled
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.another_former_address : ""}
          />
        </Box>
      </div>
    </>
  );
};

export default AddContact;
