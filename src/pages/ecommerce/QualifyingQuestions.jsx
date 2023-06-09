import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const QualificationQuestions = (props) => {
  return (
    <>
      <div className="border-solid border-2 rounded-md border-indigo-200 py-3 mt-4">
        <h1 className="ml-4 font-medium">Property Information</h1>
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
            label="State"
            disabled
            value={props.d ? props.d.state : ""}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="outlined-password-input"
            label="City"
            disabled
            value={props.d ? props.d.city : ""}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="outlined-password-input"
            label="Zip Code"
            disabled
            value={props.d ? props.d.zip : ""}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="outlined-password-input"
            label="Subject Property Address"
            disabled
            value={props.d ? props.d.subject_property_address : ""}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
      </div>
    </>
  );
};

export default QualificationQuestions;
