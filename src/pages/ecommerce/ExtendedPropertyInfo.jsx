import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const ExtendedPropertyInfo = (props) => {
  return (
    <>
      <div className="border-solid border-2 rounded-md border-indigo-200 py-3 mt-4">
        <h1 className="ml-4 font-medium">Real State Agents</h1>
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
            disabled
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.agent_first_name : ""}
          />
          <TextField
            id="outlined-password-input"
            label="LastName"
            disabled
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.agent_last_name : ""}
          />
          <TextField
            id="outlined-password-input"
            label="Email"
            disabled
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.agent_email : ""}
          />
          <TextField
            id="outlined-password-input"
            label="Phone Number"
            disabled
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.agent_phone : ""}
          />
          <TextField
            id="outlined-password-input"
            label="Is RealState Agent?"
            disabled
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.is_real_estate_agent : ""}
          />
        </Box>
      </div>
    </>
  );
};

export default ExtendedPropertyInfo;
