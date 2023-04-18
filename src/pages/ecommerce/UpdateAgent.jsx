import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const UpdateAgent = (props) => {
  // const[updateAgent,setUpdateAgent]=useState();
  // useEffect(()=>{
  //     setUpdateAgent(props.d);
  // },[props.d]);
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
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.agent_first_name : ""}
            onChange={(e) =>
              props.ud({ ...props.d, agent_first_name: e.target.value })
            }
            // value={props.d?props.d.agent_first_name:''}
          />
          <TextField
            id="outlined-password-input"
            label="LastName"
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.agent_last_name : ""}
            onChange={(e) =>
              props.ud({ ...props.d, agent_last_name: e.target.value })
            }
            // value={props.d?props.d.agent_last_name:''}
          />
          <TextField
            id="outlined-password-input"
            label="Email"
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.agent_email : ""}
            onChange={(e) =>
              props.ud({ ...props.d, agent_email: e.target.value })
            }
            // value={props.d?props.d.agent_email:''}
          />
          <TextField
            id="outlined-password-input"
            label="Phone Number"
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.agent_phone : ""}
            onChange={(e) =>
              props.ud({ ...props.d, agent_phone: e.target.value })
            }
            // value={props.d?props.d.agent_phone:''}
          />
          <TextField
            id="outlined-password-input"
            label="Is RealState Agent?"
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.is_real_estate_agent : ""}
            onChange={(e) =>
              props.ud({ ...props.d, is_real_estate_agent: e.target.value })
            }
            // value={props.d?props.d.is_real_estate_agent:''}
          />
        </Box>
      </div>
    </>
  );
};

export default UpdateAgent;
