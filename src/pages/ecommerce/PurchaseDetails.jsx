import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const PurchaseDetails = (props) => {
  return (
    <>
      <div className="border-solid border-2 rounded-md border-indigo-200 py-3 mt-4">
        <h1 className="ml-4 font-medium">Loan Details</h1>
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
            label="Loan Type"
            disabled
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.loan_type : ""}
          />
          <TextField
            id="outlined-password-input"
            label="Current Loan Balance"
            disabled
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.current_loan_balance : ""}
          />
          <TextField
            id="outlined-password-input"
            label="Credit Rating"
            disabled
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.credit_rating : ""}
          />
          <TextField
            id="outlined-password-input"
            label="Down payment Amount"
            disabled
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.down_payment_amounts : ""}
          />
          <TextField
            id="outlined-password-input"
            label="Down payment Amount"
            disabled
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.down_payment : ""}
          />
          <TextField
            id="outlined-password-input"
            label="Estimated Value"
            disabled
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.estimated_value : ""}
          />
          <TextField
            id="outlined-password-input"
            label="First Time Home Buyer"
            disabled
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.first_time_home_buyer : ""}
          />
          <TextField
            id="outlined-password-input"
            label="Property Type"
            disabled
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.property_type : ""}
          />
          <TextField
            id="outlined-password-input"
            label="Property Use"
            disabled
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.property_use : ""}
          />
          <TextField
            id="outlined-password-input"
            label="Purchase Price"
            disabled
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.purchase_price : ""}
          />
          <TextField
            id="outlined-password-input"
            label="Time Frame"
            disabled
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.timeFrame : ""}
          />
        </Box>
      </div>
    </>
  );
};

export default PurchaseDetails;
