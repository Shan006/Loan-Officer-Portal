import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const UpdateCreditInfo = (props) => {
  return (
    <>
      <div className="border-solid border-2 rounded-md border-indigo-200 py-3 mt-4">
        <h1 className="ml-4 font-medium">Credit Verification</h1>
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
            label="Borrwer DOB"
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.borrower_dob : ""}
            onChange={(e) =>
              props.ud({ ...props.d, borrower_dob: e.target.value })
            }
            // value={props.d ? props.d.borrower_dob : ""}
          />
          <TextField
            id="outlined-password-input"
            label="Borrower SSN"
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.borrower_ssn : ""}
            onChange={(e) =>
              props.ud({
                ...props.d,
                borrower_ssn: e.target.value,
              })
            }
            // value={props.d ? props.d.borrower_ssn : ""}
          />
          <TextField
            id="outlined-password-input"
            label="Co Borrower DOB"
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.co_borrower_dob : ""}
            onChange={(e) =>
              props.ud({ ...props.d, co_borrower_dob: e.target.value })
            }
            // value={props.d ? props.d.co_borrower_dob : ""}
          />
          <TextField
            id="outlined-password-input"
            label="Co Borrower SSN"
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.co_borrower_ssn : ""}
            onChange={(e) =>
              props.ud({ ...props.d, co_borrower_ssn: e.target.value })
            }
            // value={props.d ? props.d.co_borrower_ssn : ""}
          />
          <TextField
            id="outlined-password-input"
            label="Agreed?"
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.agreed : ""}
            onChange={(e) => props.ud({ ...props.d, agreed: e.target.value })}
            // value={props.d ? props.d.agreed : ""}
          />
        </Box>
      </div>
    </>
  );
};

export default UpdateCreditInfo;
