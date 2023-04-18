import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const UpdateAddressInfo = (props) => {
  // console.log("UpdateAddress props.d",props.d);
  // const[props.d,props.ud]=useState();
  // useEffect(()=>{
  //   props.ud(props.d)
  // },[props.d]);
  // console.log("UpdateAddressInfo", updatedAddress);
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
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.mailing_address : ""}
            onChange={(e) =>
              props.ud({
                ...props.d,
                mailing_address: e.target.value,
              })
            }
            // value={props.d?props.d.mailing_address:''}
          />
          <TextField
            id="outlined-password-input"
            label="Another Former Address"
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.another_former_address : ""}
            onChange={(e) =>
              props.ud({
                ...props.d,
                another_former_address: e.target.value,
              })
            }
            // value={props.d?props.d.another_former_address:''}
          />
          <TextField
            id="outlined-password-input"
            label="Current Address"
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.current_address : ""}
            onChange={(e) =>
              props.ud({
                ...props.d,
                current_address: e.target.value,
              })
            }
            // value={props.d?props.d.current_address:''}
          />
          <TextField
            id="outlined-password-input"
            label="Current Monthly Rent Amount"
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.current_monthly_rent_amount : ""}
            onChange={(e) =>
              props.ud({
                ...props.d,
                current_monthly_rent_amount: e.target.value,
              })
            }
            // value={props.d?props.d.current_monthly_rent_amount:''}
          />
          <TextField
            id="outlined-password-input"
            label="Month At Current Address"
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.month_at_current_address : ""}
            onChange={(e) =>
              props.ud({
                ...props.d,
                month_at_current_address: e.target.value,
              })
            }
            // value={props.d?props.d.month_at_current_address:''}
          />
          <TextField
            id="outlined-password-input"
            label="Year At Current Address"
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.years_at_current_address : ""}
            onChange={(e) =>
              props.ud({
                ...props.d,
                another_former_address: e.target.value,
              })
            }
            // value={props.d?props.d.another_former_address:''}
          />
        </Box>
        {/* <button
          onClick={() => {
            console.log(props.d);
          }}
        >
          Test
        </button> */}
      </div>
    </>
  );
};

export default UpdateAddressInfo;
