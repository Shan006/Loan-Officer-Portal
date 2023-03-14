import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const PurchaseDetails = (props) => {
  const [area, setArea] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [downPaymentAmount, setDownPaymentAmount] = useState("");
  const [timeframe, setTimeframe] = useState("");

  // useEffect(() => {
  //   props.d.area && setArea(props.d.area);
  //   props.d.purchase_price && setPurchasePrice(props.d.purchase_price);
  //   props.d.down_payment && setDownPaymentAmount(props.d.down_payment);
  //   props.d.time_frame && setTimeframe(props.d.time_frame);
  // }, [props.d.length > 0]);

  // useEffect(() => {
  //   setArea("");
  //   setPurchasePrice("");
  //   setDownPaymentAmount("");
  //   setTimeframe("");
  //   props.setClear(false);
  // }, [props.clear]);
  return (
    <>
      <div className="border-solid border-2 rounded-md border-indigo-200 py-3 mt-4">
        <h1 className="ml-4 font-medium">Purchase Details</h1>
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
            label="Area"
            InputLabelProps={{
              shrink: true,
            }}
            value={area}
            onChange={(e) => {
              setArea(e.target.value);
              props.setCo({
                ...props.co,
                area: e.target.value,
              });
            }}
          />
          <TextField
            id="outlined-password-input"
            label="PurchasePrice"
            InputLabelProps={{
              shrink: true,
            }}
            value={purchasePrice}
            onChange={(e) => {
              setPurchasePrice(e.target.value);
              props.setCo({ ...props.co, purchasePrice: e.target.value });
            }}
          />
          <TextField
            id="outlined-password-input"
            label="DownPaymentAmount"
            InputLabelProps={{
              shrink: true,
            }}
            value={downPaymentAmount}
            onChange={(e) => {
              setDownPaymentAmount(e.target.value);
              props.setCo({ ...props.co, downPaymentAmount: e.target.value });
            }}
          />
          <TextField
            id="outlined-select-currency"
            select
            label="TimeFrame"
            defaultValue="E"
            onChange={(e) => {
              setTimeframe(e.target.value);
              props.setCo({ ...props.co, timeframe: e.target.value });
            }}
          >
            <MenuItem value="1Week">1Week</MenuItem>
            <MenuItem value="2-4Weeks">2-4 Weeks</MenuItem>
            <MenuItem value="30-60Days">30-60 Days</MenuItem>
            <MenuItem value="60-90Days">60-90 Days</MenuItem>
            <MenuItem value="3-6Months">3-6 Months</MenuItem>
            <MenuItem value="1+Year">1+ Year</MenuItem>
          </TextField>
          {/* <button
            onClick={(e) => {
              e.preventDefault();
              console.log("PurchaseDetails", props.co);
            }}
          >
            Check
          </button> */}
        </Box>
      </div>
    </>
  );
};

export default PurchaseDetails;
