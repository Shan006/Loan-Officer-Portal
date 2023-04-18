import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const UpdateMiletryInfo = (props) => {
  // const[updateMiletry,setUpdateMiletry]=useState();
  // useEffect(()=>{
  //     setUpdateMiletry(props.d);
  // },[props.d]);
  return (
    <>
      <div className="border-solid border-2 rounded-md border-indigo-200 py-3 mt-4">
        <h1 className="ml-4 font-medium">Military Information</h1>
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
            label="Served In Military?"
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.served_in_military : ""}
            onChange={(e) =>
              props.ud({ ...props.d, served_in_military: e.target.value })
            }
            // value={props.d?props.d.served_in_military:''}
          />
        </Box>
      </div>
    </>
  );
};

export default UpdateMiletryInfo;
