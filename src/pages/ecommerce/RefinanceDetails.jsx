import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const RefinanceDetails = (props) => {
  const [mortgageProgram, setMortgageProgram] = useState("");
  const [loanDate, setLoanDate] = useState("");
  const [originalLoanBalance, setOriginalLoanBalance] = useState("");
  const [currentLoanBalance, setCurrentLoanBalance] = useState("");
  const [payoff, setPayoff] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [mortgageStatus, setMortgageStatus] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [rateType, setRateType] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState("");
  const [proposedPayment, setProposedPayment] = useState("");
  const [moneySaved, setMoneySaved] = useState("");
  const [borrowerOpinionValue, setBorrowerOpinionValue] = useState("");
  const [cashOutAmount, setCashOutAmount] = useState("");
  const [refiPurpose, setRefiPurpose] = useState("");

  // useEffect(() => {
  //   props.d.current_mortgage_program &&
  //     setMortgageProgram(props.d.current_mortgage_program);
  //   props.d.loan_date && setLoanDate(props.d.loan_date);
  //   props.d.original_loan_balance &&
  //     setOriginalLoanBalance(props.d.original_loan_balance);
  //   props.d.current_loan_balance &&
  //     setCurrentLoanBalance(props.d.current_loan_balance);
  //   props.d.current_payoff && setPayoff(props.d.current_payoff);
  //   props.d.original_purchase_price &&
  //     setPurchasePrice(props.d.original_purchase_price);
  //   props.d.original_purchase_date &&
  //     setPurchaseDate(props.d.original_purchase_date);
  //   props.d.mortgage_status && setMortgageStatus(props.d.mortgage_status);
  //   props.d.current_interest_rate &&
  //     setInterestRate(props.d.current_interest_rate);
  //   props.d.current_rate_type && setRateType(props.d.current_rate_type);
  //   props.d.current_monthly_payment &&
  //     setMonthlyPayment(props.d.current_monthly_payment);
  //   props.d.proposed_payment && setProposedPayment(props.d.proposed_payment);
  //   props.d.money_saved && setMoneySaved(props.d.money_saved);
  //   props.d.borrower_oppinion_value &&
  //     setBorrowerOpinionValue(props.d.borrower_oppinion_value);
  //   props.d.cash_out_amount && setCashOutAmount(props.d.cash_out_amount);
  //   props.d.refi_purpose && setRefiPurpose(props.d.refi_purpose);
  // }, [props.d.length > 0]);

  // useEffect(() => {
  //   setMortgageProgram("");
  //   setLoanDate("");
  //   setOriginalLoanBalance("");
  //   setPayoff("");
  //   setPurchasePrice("");
  //   setPurchaseDate("");
  //   setMortgageStatus("");
  //   setInterestRate("");
  //   setRateType("");
  //   setMonthlyPayment("");
  //   setProposedPayment("");
  //   setMoneySaved("");
  //   setBorrowerOpinionValue("");
  //   setCashOutAmount("");
  //   setRefiPurpose("");
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
            id="outlined-password-input"
            label="CurrentMortgageProgram"
            InputLabelProps={{
              shrink: true,
            }}
            value={mortgageProgram}
            onChange={(e) => {
              setMortgageProgram(e.target.value);
              props.setCo({
                ...props.co,
                mortgageProgram: e.target.value,
              });
            }}
          />
          <TextField
            id="outlined-password-input"
            label="LoanDate"
            InputLabelProps={{
              shrink: true,
            }}
            value={loanDate}
            onChange={(e) => {
              setLoanDate(e.target.value);
              props.setCo({ ...props.co, loanDate: e.target.value });
            }}
          />
          <TextField
            id="outlined-password-input"
            label="OriginalLoanBalance"
            InputLabelProps={{
              shrink: true,
            }}
            value={originalLoanBalance}
            onChange={(e) => {
              setOriginalLoanBalance(e.target.value);
              props.setCo({ ...props.co, originalLoanBalance: e.target.value });
            }}
          />
          <TextField
            id="outlined-password-input"
            label="CurrentLoanBalance"
            InputLabelProps={{
              shrink: true,
            }}
            value={currentLoanBalance}
            onChange={(e) => {
              setCurrentLoanBalance(e.target.value);
              props.setCo({ ...props.co, currentLoanBalance: e.target.value });
            }}
          />
          <TextField
            id="outlined-password-input"
            label="CurrentPayoff"
            // placeholder="yyyy-mm-dd"
            InputLabelProps={{
              shrink: true,
            }}
            value={payoff}
            onChange={(e) => {
              setPayoff(e.target.value);
              props.setCo({ ...props.co, payoff: e.target.value });
            }}
          />
          <TextField
            id="outlined-password-input"
            label="OriginalPurchasePrice"
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
            label="OriginalPurchaseDate"
            InputLabelProps={{
              shrink: true,
            }}
            value={purchaseDate}
            onChange={(e) => {
              setPurchaseDate(e.target.value);
              props.setCo({ ...props.co, purchaseDate: e.target.value });
            }}
          />
          <TextField
            id="outlined-select-currency"
            select
            label="MortgageStatus"
            defaultValue="E"
            onChange={(e) => {
              setMortgageStatus(e.target.value);
              props.setCo({ ...props.co, mortgageStatus: e.target.value });
            }}
          >
            <MenuItem value="Current">Current</MenuItem>
            <MenuItem value="NotCurrent">Not Current</MenuItem>
            <MenuItem value="Matured">Matured</MenuItem>
            <MenuItem value="MaturityDefault">Maturity Default</MenuItem>
            <MenuItem value="PaymentDefault">Payment Default</MenuItem>
            <MenuItem value="ForeCloser">Forecloser</MenuItem>
            <MenuItem value="ForeBearance">Forebearance</MenuItem>
          </TextField>
          <TextField
            id="outlined-password-input"
            label="CurrentInterestRate"
            placeholder="$"
            InputLabelProps={{
              shrink: true,
            }}
            value={interestRate}
            onChange={(e) => {
              setInterestRate(e.target.value);
              props.setCo({ ...props.co, interestRate: e.target.value });
            }}
          />
          <TextField
            id="outlined-select-currency"
            select
            label="CurrentRateType"
            defaultValue="E"
            onChange={(e) => {
              setRateType(e.target.value);
              props.setCo({ ...props.co, rateType: e.target.value });
            }}
          >
            <MenuItem value="Fixed">Fixed</MenuItem>
            <MenuItem value="Adjustable">Adjustable</MenuItem>
            <MenuItem value="Variable">Variable</MenuItem>
          </TextField>
          <TextField
            id="outlined-password-input"
            label="CurrentMonthlyPayment"
            placeholder="$"
            InputLabelProps={{
              shrink: true,
            }}
            value={monthlyPayment}
            onChange={(e) => {
              setMonthlyPayment(e.target.value);
              props.setCo({ ...props.co, monthlyPayment: e.target.value });
            }}
          />
          <TextField
            id="outlined-password-input"
            label="PropsedPayment"
            InputLabelProps={{
              shrink: true,
            }}
            value={proposedPayment}
            onChange={(e) => {
              setProposedPayment(e.target.value);
              props.setCo({ ...props.co, proposedPayment: e.target.value });
            }}
          />
          <TextField
            id="outlined-password-input"
            label="MoneySaved"
            InputLabelProps={{
              shrink: true,
            }}
            value={moneySaved}
            onChange={(e) => {
              setMoneySaved(e.target.value);
              props.setCo({ ...props.co, moneySaved: e.target.value });
            }}
          />
          <TextField
            id="outlined-password-input"
            label="BorrowerOpinionValue"
            InputLabelProps={{
              shrink: true,
            }}
            value={borrowerOpinionValue}
            onChange={(e) => {
              setBorrowerOpinionValue(e.target.value);
              props.setCo({
                ...props.co,
                borrowerOpinionValue: e.target.value,
              });
            }}
          />
          <TextField
            id="outlined-password-input"
            label="CashOutAmount"
            InputLabelProps={{
              shrink: true,
            }}
            value={cashOutAmount}
            onChange={(e) => {
              setCashOutAmount(e.target.value);
              props.setCo({
                ...props.co,
                cashOutAmount: e.target.value,
              });
            }}
          />
          <TextField
            id="outlined-password-input"
            label="RefiPurpose"
            InputLabelProps={{
              shrink: true,
            }}
            value={refiPurpose}
            onChange={(e) => {
              setRefiPurpose(e.target.value);
              props.setCo({
                ...props.co,
                refiPurpose: e.target.value,
              });
            }}
          />
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

export default RefinanceDetails;
