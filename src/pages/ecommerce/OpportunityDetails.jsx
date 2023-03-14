import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const OpportunityDetails = (props) => {
  const [propertyAddress, setPropertyAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [purpose, setPurpose] = useState("");
  const [objectives, setObjectives] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [compensation, setCompensation] = useState("");
  const [country, setCountry] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [uints, setUnits] = useState("");
  const [appraisalValue, setAppraisalValue] = useState("");
  const [targetRate, setTargetRate] = useState("");
  const [targetRateType, setTargetRateType] = useState("");
  const [propertyUse, setPropertyUse] = useState("");
  const [occupancy, setOccupancy] = useState("");
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
  const [propertyTypeArray, setPropertyTypeArray] = useState([
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

  useEffect(() => {
    props.d && setPropertyAddress(props.d.subject_property_address);
    props.d && setCity(props.d.city);
    props.d && setState(props.d.state);
    props.d && setZipCode(props.d.zip);
    // props.d.purpose && setPurpose(props.d.purpose);
    // props.d.goal && setObjectives(props.d.goal);
    // props.d.projected_loan_amount &&
    //   setLoanAmount(props.d.projected_loan_amount);
    // props.d.compensation && setCompensation(props.d.compensation);
    // props.d.country && setCountry(props.d.country);
    // props.d.property_type && setPropertyType(props.d.property_type);
    // props.d.unit && setUnits(props.d.unit);
    // props.d.appraisal_value && setAppraisalValue(props.d.appraisal_value);
    // props.d.target_rate && setTargetRate(props.d.target_rate);
    // props.d.target_rate_type && setTargetRateType(props.d.target_rate_type);
    // props.d.intended_use && setPropertyUse(props.d.intended_use);
    // props.d.occupancy && setOccupancy(props.d.occupancy);
  }, [props.d]);

  // useEffect(() => {
  //   setPropertyAddress("");
  //   setCity("");
  //   setState("");
  //   setZipCode("");
  //   setPurpose("");
  //   setObjectives("");
  //   setLoanAmount("");
  //   setCompensation("");
  //   setCountry("");
  //   setPropertyType("");
  //   setUnits("");
  //   setAppraisalValue("");
  //   setTargetRate("");
  //   setTargetRateType("");
  //   setPropertyUse("");
  //   setOccupancy("");
  //   props.setClear(false);
  // }, [props.clear]);
  return (
    <>
      <div className="border-solid border-2 rounded-md border-indigo-200 py-3 mt-4">
        <h1 className="ml-4 font-medium">Opportunity Details</h1>
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
            label="SubjectPropertyAddress"
            InputLabelProps={{
              shrink: true,
            }}
            value={propertyAddress}
            onChange={(e) => {
              setPropertyAddress(e.target.value);
              props.setCo({
                ...props.co,
                SubjectPropertyAddress: e.target.value,
              });
            }}
          />
          <TextField
            id="outlined-password-input"
            label="City/Municipality"
            InputLabelProps={{
              shrink: true,
            }}
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              props.setCo({ ...props.co, city: e.target.value });
            }}
          />
          <TextField
            id="outlined-select-currency"
            select
            label="State/Province"
            defaultValue="E"
            onChange={(e) => {
              setState(e.target.value);
              props.setCo({ ...props.co, state: e.target.value });
            }}
          >
            {StateData.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="outlined-password-input"
            label="Zip/PostalCode"
            InputLabelProps={{
              shrink: true,
            }}
            value={zipCode}
            onChange={(e) => {
              setZipCode(e.target.value);
              props.setCo({ ...props.co, zipCode: e.target.value });
            }}
          />
          <TextField
            id="outlined-select-currency"
            select
            label="Purpose"
            defaultValue="E"
            onChange={(e) => {
              setPurpose(e.target.value);
              props.setCo({ ...props.co, purpose: e.target.value });
            }}
          >
            <MenuItem value="Refinance">Refinance</MenuItem>
            <MenuItem value="Purchase">Purchase</MenuItem>
            <MenuItem value="CashOutRefinance">Cash Out Refinance</MenuItem>
          </TextField>
          <TextField
            id="outlined-password-input"
            label="Est. Goals&Objectives"
            InputLabelProps={{
              shrink: true,
            }}
            value={objectives}
            onChange={(e) => {
              setObjectives(e.target.value);
              props.setCo({ ...props.co, objective: e.target.value });
            }}
          />
          <TextField
            id="outlined-password-input"
            label="ProjectedLoanAmount"
            placeholder="$"
            InputLabelProps={{
              shrink: true,
            }}
            value={loanAmount}
            onChange={(e) => {
              setLoanAmount(e.target.value);
              props.setCo({ ...props.co, loanAmount: e.target.value });
            }}
          />
          <TextField
            id="outlined-password-input"
            label="Est. Compensation"
            placeholder="$"
            InputLabelProps={{
              shrink: true,
            }}
            value={compensation}
            onChange={(e) => {
              setCompensation(e.target.value);
              props.setCo({ ...props.co, compensation: e.target.value });
            }}
          />
          <TextField
            id="outlined-password-input"
            label="Country"
            InputLabelProps={{
              shrink: true,
            }}
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
              props.setCo({ ...props.co, country: e.target.value });
            }}
          />
          <TextField
            id="outlined-select-currency"
            select
            label="PropertyType"
            defaultValue="E"
            onChange={(e) => {
              setPropertyType(e.target.value);
              props.setCo({ ...props.co, propertyType: e.target.value });
            }}
          >
            {propertyTypeArray.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="outlined-password-input"
            label="NoOfUnits"
            placeholder="1"
            InputLabelProps={{
              shrink: true,
            }}
            value={uints}
            onChange={(e) => {
              setUnits(e.target.value);
              props.setCo({ ...props.co, uints: e.target.value });
            }}
          />
          <TextField
            id="outlined-password-input"
            label="EstimatedAppraisalValue"
            placeholder="$"
            InputLabelProps={{
              shrink: true,
            }}
            value={appraisalValue}
            onChange={(e) => {
              setAppraisalValue(e.target.value);
              props.setCo({ ...props.co, AppraisalValue: e.target.value });
            }}
          />
          <TextField
            id="outlined-password-input"
            label="TargetRate"
            placeholder="0%"
            InputLabelProps={{
              shrink: true,
            }}
            value={targetRate}
            onChange={(e) => {
              setTargetRate(e.target.value);
              props.setCo({ ...props.co, targetRate: e.target.value });
            }}
          />
          <TextField
            id="outlined-password-input"
            label="TargetRateType"
            InputLabelProps={{
              shrink: true,
            }}
            value={targetRateType}
            onChange={(e) => {
              setTargetRateType(e.target.value);
              props.setCo({ ...props.co, targetRateType: e.target.value });
            }}
          />
          <TextField
            id="outlined-select-currency"
            select
            label="IntendedPropertyUse"
            defaultValue="E"
            onChange={(e) => {
              setPropertyUse(e.target.value);
              props.setCo({ ...props.co, propertyUse: e.target.value });
            }}
          >
            <MenuItem value="PrimaryResidence">Primary Residence</MenuItem>
            <MenuItem value="SecondHome">Second Home</MenuItem>
            <MenuItem value="InvestmentProperty">Investment Property</MenuItem>
          </TextField>
          <TextField
            id="outlined-select-currency"
            select
            label="Occupancy"
            defaultValue="E"
            onChange={(e) => {
              setOccupancy(e.target.value);
              props.setCo({ ...props.co, occupancy: e.target.value });
            }}
          >
            <MenuItem value="PrimaryResidence">Primary</MenuItem>
            <MenuItem value="SecondHome">Second Home</MenuItem>
            <MenuItem value="InvestmentProperty">Investment</MenuItem>
            <MenuItem value="InvestmentProperty">Other</MenuItem>
          </TextField>
          {/* <button
            onClick={(e) => {
              e.preventDefault();
              console.log("OpportunityDetails", props.co);
            }}
          >
            Check
          </button> */}
        </Box>
      </div>
    </>
  );
};

export default OpportunityDetails;
