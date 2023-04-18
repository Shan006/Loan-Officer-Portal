import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const UpdateLoanDetail = (props) => {
  // const[props.d,props.ud]=useState();
  // useEffect(()=>{
  //     setUpdateLoan(props.d)
  // },[props.d])
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
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.loan_type : ""}
            onChange={(e) =>
              props.ud({ ...props.d, loan_type: e.target.value })
            }
            // value={props.d?props.d.loan_type:''}
          />
          <TextField
            id="outlined-password-input"
            label="Current Loan Balance"
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.current_loan_balance : ""}
            onChange={(e) =>
              props.ud({ ...props.d, current_loan_balance: e.target.value })
            }
            // value={props.d?props.d.current_loan_balance:''}
          />
          <TextField
            id="outlined-password-input"
            label="Credit Rating"
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.credit_rating : ""}
            onChange={(e) =>
              props.ud({ ...props.d, credit_rating: e.target.value })
            }
            // value={props.d?props.d.credit_rating:''}
          />
          <TextField
            id="outlined-password-input"
            label="Down payment Amount"
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.down_payment_amounts : ""}
            onChange={(e) =>
              props.ud({ ...props.d, down_payment_amounts: e.target.value })
            }
            // value={props.d?props.d.down_payment_amounts:''}
          />
          <TextField
            id="outlined-password-input"
            label="Down payment Amount"
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.down_payment : ""}
            onChange={(e) =>
              props.ud({ ...props.d, down_payment: e.target.value })
            }
            // value={props.d?props.d.down_payment:''}
          />
          <TextField
            id="outlined-password-input"
            label="Estimated Value"
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.estimated_value : ""}
            onChange={(e) =>
              props.ud({ ...props.d, estimated_value: e.target.value })
            }
            // value={props.d?props.d.estimated_value:''}
          />
          <TextField
            id="outlined-password-input"
            label="First Time Home Buyer"
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.first_time_home_buyer : ""}
            onChange={(e) =>
              props.ud({ ...props.d, first_time_home_buyer: e.target.value })
            }
            // value={props.d?props.d.first_time_home_buyer:''}
          />
          <TextField
            id="outlined-password-input"
            label="Property Type"
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.property_type : ""}
            onChange={(e) =>
              props.ud({ ...props.d, property_type: e.target.value })
            }
            // value={props.d?props.d.property_type:''}
          />
          <TextField
            id="outlined-password-input"
            label="Property Use"
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.property_use : ""}
            onChange={(e) =>
              props.ud({ ...props.d, property_use: e.target.value })
            }
            // value={props.d?props.d.property_use:''}
          />
          <TextField
            id="outlined-password-input"
            label="Purchase Price"
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.purchase_price : ""}
            onChange={(e) =>
              props.ud({ ...props.d, purchase_price: e.target.value })
            }
            // value={props.d?props.d.purchase_price:''}
          />
          <TextField
            id="outlined-password-input"
            label="Time Frame"
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.timeFrame : ""}
            onChange={(e) =>
              props.ud({ ...props.d, timeFrame: e.target.value })
            }
            // value={props.d?props.d.timeFrame:''}
          />
        </Box>
      </div>
    </>
  );
};

export default UpdateLoanDetail;
