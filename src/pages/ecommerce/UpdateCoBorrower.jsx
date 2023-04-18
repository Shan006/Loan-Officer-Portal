import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const UpdateCoBorrower = (props) => {
  //   const[props.d,setUpdatedData]=useState();
  //  useEffect(()=>{
  //     setUpdatedData(props.d)
  //  },[props.d])

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
            id="outlined-password-input"
            label="Suffix"
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.suffix : ""}
            onChange={(e) => props.ud({ ...props.d, suffix: e.target.value })}
          />
          <TextField
            id="outlined-password-input"
            label="Email"
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.email : ""}
            onChange={(e) => props.ud({ ...props.d, email: e.target.value })}
          />
          <TextField
            id="outlined-password-input"
            label="Phone Number"
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.phone_number : ""}
            onChange={(e) =>
              props.ud({ ...props.d, phone_number: e.target.value })
            }
            // value={props.d? props.d.phone_number:''}
          />
          <TextField
            id="outlined-password-input"
            label="Mailing Address"
            type="email"
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.mailing_address : ""}
            onChange={(e) =>
              props.ud({ ...props.d, mailing_address: e.target.value })
            }
            // value={props.d? props.d.mailing_address:''}
          />
          <TextField
            id="outlined-password-input"
            label="Martial Status"
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.martial_status : ""}
            onChange={(e) =>
              props.ud({ ...props.d, martial_status: e.target.value })
            }
            // value={props.d? props.d.martial_status:''}
          />
          <TextField
            id="outlined-password-input"
            label="Current Address"
            // placeholder="yyyy-mm-dd"

            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.current_address : ""}
            onChange={(e) =>
              props.ud({ ...props.d, current_address: e.target.value })
            }
            // value={props.d? props.d.current_address:''}
          />
          <TextField
            id="outlined-password-input"
            label="Month At Current Address"
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.month_at_current_address : ""}
            onChange={(e) =>
              props.ud({ ...props.d, month_at_current_address: e.target.value })
            }
            // value={props.d? props.d.month_at_current_address:''}
          />
          <TextField
            id="outlined-password-input"
            label="Current Montly Rent Amount"
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
            // value={props.d? props.d.current_monthly_rent_amount:''}
          />

          <TextField
            id="outlined-password-input"
            label="Year At Current Address"
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.years_at_current_address : ""}
            onChange={(e) =>
              props.ud({ ...props.d, years_at_current_address: e.target.value })
            }
            // value={props.d? props.d.years_at_current_address:''}
          />
          <TextField
            id="outlined-password-input"
            label="Is Co Borrower"
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.is_co_borrower : ""}
            onChange={(e) =>
              props.ud({ ...props.d, is_co_borrower: e.target.value })
            }
            // value={props.d? props.d.is_co_borrower:''}
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

export default UpdateCoBorrower;
