import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const QualificationQuestions = (props) => {
  const [bankruptcy, setBankruptcy] = useState("");
  const [foreclosure, setForeclosure] = useState("");
  const [shortSale, setShortSale] = useState("");
  const [latePayments, setLatePayments] = useState("");
  const [firstTimeHomeBuyer, setFirstTimeHomeBuyer] = useState("");
  const [fhaLoan, setFhaLoan] = useState("");
  const [veteran, setVeteran] = useState("");
  const [vaDisability, setVaDisability] = useState("");

  // useEffect(() => {
  //   props.d.bankruptcy && setBankruptcy(props.d.bankruptcy);
  //   props.d.foreclosure && setForeclosure(props.d.foreclosure);
  //   props.d.short_sale && setShortSale(props.d.short_sale);
  //   props.d.late_payments && setLatePayments(props.d.late_payments);
  //   props.d.first_time_homebuyer &&
  //     setFirstTimeHomeBuyer(props.d.first_time_homebuyer);
  //   props.d.FHA_loan && setFhaLoan(props.d.FHA_loan);
  //   props.d.veteran && setVeteran(props.d.veteran);
  //   props.d.VA_disability && setVaDisability(props.d.VA_disability);
  // }, [props.d.length > 0]);

  // useEffect(() => {
  //   setBankruptcy("");
  //   setForeclosure("");
  //   setShortSale("");
  //   setLatePayments("");
  //   setFirstTimeHomeBuyer("");
  //   setFhaLoan("");
  //   setVeteran("");
  //   setVaDisability("");
  //   props.setClear(false);
  // }, [props.clear]);
  return (
    <>
      <div className="border-solid border-2 rounded-md border-indigo-200 py-3 mt-4">
        <h1 className="ml-4 font-medium">Refinance Details</h1>
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
            id="Bankruptcy"
            select
            label="MortgageStatus"
            defaultValue="E"
            onChange={(e) => {
              setBankruptcy(e.target.value);
              props.setCo({ ...props.co, bankruptcy: e.target.value });
            }}
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </TextField>
          <TextField
            id="outlined-select-currency"
            select
            label="ForeClosure"
            defaultValue="E"
            onChange={(e) => {
              setForeclosure(e.target.value);
              props.setCo({ ...props.co, foreclosure: e.target.value });
            }}
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </TextField>
          <TextField
            id="outlined-select-currency"
            select
            label="ShortSale"
            defaultValue="E"
            onChange={(e) => {
              setShortSale(e.target.value);
              props.setCo({ ...props.co, shortSale: e.target.value });
            }}
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </TextField>
          <TextField
            id="outlined-select-currency"
            select
            label="LatePayments"
            defaultValue="E"
            onChange={(e) => {
              setLatePayments(e.target.value);
              props.setCo({ ...props.co, latePayments: e.target.value });
            }}
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </TextField>
          <TextField
            id="outlined-select-currency"
            select
            label="FirstTimeHomeBuyer?"
            defaultValue="E"
            onChange={(e) => {
              setFirstTimeHomeBuyer(e.target.value);
              props.setCo({ ...props.co, firstTimeHomeBuyer: e.target.value });
            }}
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </TextField>
          <TextField
            id="outlined-select-currency"
            select
            label="FHALoan"
            defaultValue="E"
            onChange={(e) => {
              setFhaLoan(e.target.value);
              props.setCo({ ...props.co, fhaLoan: e.target.value });
            }}
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </TextField>
          <TextField
            id="outlined-select-currency"
            select
            label="Veteran"
            defaultValue="E"
            onChange={(e) => {
              setVeteran(e.target.value);
              props.setCo({ ...props.co, veteran: e.target.value });
            }}
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </TextField>
          <TextField
            id="outlined-select-currency"
            select
            label="VADisability"
            defaultValue="E"
            onChange={(e) => {
              setVaDisability(e.target.value);
              props.setCo({ ...props.co, vadisability: e.target.value });
            }}
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </TextField>
          {/* <button
            onClick={(e) => {
              e.preventDefault();
              console.log("RefinanceDetails", props.co);
            }}
          >
            Check
          </button> */}
        </Box>
      </div>
    </>
  );
};

export default QualificationQuestions;
