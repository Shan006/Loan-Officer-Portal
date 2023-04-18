import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const UpdateAsset = (props) => {
  const [StateData, setStateData] = useState([
    "AK - Alaska",
    "AL - Alabama",
    "AR - Arkansas",
    "AS - American Samoa",
    "AZ - Arizona",
    "CA - California",
    "CO - Colorado",
    "CT - Connecticut",
    "DC - District of Columbia",
    "DE - Delaware",
    "FL - Florida",
    "GA - Georgia",
    "GU - Guam",
    "HI - Hawaii",
    "IA - Iowa",
    "ID - Idaho",
    "IL - Illinois",
    "IN - Indiana",
    "KS - Kansas",
    "KY - Kentucky",
    "LA - Louisiana",
    "MA - Massachusetts",
    "MD - Maryland",
    "ME - Maine",
    "MI - Michigan",
    "MN - Minnesota",
    "MO - Missouri",
    "MS - Mississippi",
    "MT - Montana",
    "NC - North Carolina",
    "ND - North Dakota",
    "NE - Nebraska",
    "NH - New Hampshire",
    "NJ - New Jersey",
    "NM - New Mexico",
    "NV - Nevada",
    "NY - New York",
    "OH - Ohio",
    "OK - Oklahoma",
    "OR - Oregon",
    "PA - Pennsylvania",
    "PR - Puerto Rico",
    "RI - Rhode Island",
    "SC - South Carolina",
    "SD - South Dakota",
    "TN - Tennessee",
    "TX - Texas",
    "UT - Utah",
    "VA - Virginia",
    "VI - Virgin Islands",
    "VT - Vermont",
    "WA - Washington",
    "WI - Wisconsin",
    "WV - West Virginia",
    "WY - Wyoming",
  ]);
  const [property_typeArray, setproperty_typeArray] = useState([
    "PUD",
    "SFH-Detached",
    "SFH-Attached",
    "TownHome",
    "Condo",
    "Condo-HighRise",
    "2-4Plex",
    "MFH-Single",
    "MFH-Double",
    "MFH-Multi",
    "SFR",
    "2-Unit",
    "3-Unit",
    "4-Unit",
  ]);
  return (
    <>
      <div className="border-solid border-2 rounded-md border-indigo-200 py-3 mt-4">
        <h1 className="ml-4 font-medium">Assets</h1>
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
            label="Bank"
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.bank : ""}
            onChange={(e) => props.ud({ ...props.d, bank: e.target.value })}
            // value={props.d?props.d.bank:''}
          />
          <TextField
            id="outlined-password-input"
            label="Bank Account Number"
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.bank_account_number : ""}
            onChange={(e) =>
              props.ud({
                ...props.d,
                bank_account_number: e.target.value,
              })
            }
            // value={props.d?props.d.bank_account_number:''}
          />
          <TextField
            id="outlined-password-input"
            label="Bank Account Type"
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.bank_account_type : ""}
            onChange={(e) =>
              props.ud({
                ...props.d,
                bank_account_type: e.target.value,
              })
            }
            // value={props.d?props.d.bank_account_type:''}
          />
          <TextField
            id="outlined-password-input"
            label="Bank Account Balance"
            InputLabelProps={{
              shrink: true,
            }}
            value={props.d ? props.d.bank_account_balance : ""}
            onChange={(e) =>
              props.ud({
                ...props.d,
                bank_account_balance: e.target.value,
              })
            }
            // value={props.d?props.d.bank_account_balance:''}
          />
        </Box>
      </div>
    </>
  );
};

export default UpdateAsset;
