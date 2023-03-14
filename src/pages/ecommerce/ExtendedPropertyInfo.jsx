import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const ExtendedPropertyInfo = (props) => {
  const [zillow_url_link, setzillow_url_link] = useState("");
  const [zestimate, setzestimate] = useState("");
  const [street_view_link, setstreet_view_link] = useState("");
  const [costar_link, setcostar_link] = useState("");
  const [year_built, setyear_built] = useState("");
  const [last_sold_date, setlast_sold_date] = useState("");
  const [last_sold_year, setlast_sold_year] = useState("");
  const [last_sold_price, setlast_sold_price] = useState("");
  const [listed, setlisted] = useState("");
  const [estimated_ceo, setestimated_ceo] = useState("");
  const [tax_assessment, settax_assessment] = useState("");
  const [sqaure_footage, setsqaure_footage] = useState("");
  const [square_footage_added, setsquare_footage_added] = useState("");
  const [finished_square_footage, setfinished_square_footage] = useState("");
  const [adding_units, setadding_units] = useState("");
  const [number_of_units, setnumber_of_units] = useState("");
  //
  const [number_of_bedrooms, setnumber_of_bedrooms] = useState("");
  const [number_of_bathrooms, setnumber_of_bathrooms] = useState("");
  const [cltv, setcltv] = useState("");
  const [preferred_equity_amount, setpreferred_equity_amount] = useState("");
  const [property_notes, setproperty_notes] = useState("");

  //   useEffect(() => {
  //     setzillow_url_link("");
  //     setzestimate("");
  //     setstreet_view_link("");
  //     setyear_built("");
  //     setlast_sold_date("");
  //     setlast_sold_year("");
  //     setlast_sold_price("");
  //     setlisted("");
  //     setestimated_ceo("");
  //     settax_assessment("");
  //     setsqaure_footage("");
  //     setsquare_footage_added("");
  //     setfinished_square_footage("");
  //     setadding_units("");
  //     setnumber_of_units("");
  //     props.setClear(false);
  //   }, [props.clear]);
  return (
    <>
      <div className="border-solid border-2 rounded-md border-indigo-200 py-3 mt-4">
        <h1 className="ml-4 font-medium">Extended Property Info</h1>
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
            label="Zillow Url Link"
            InputLabelProps={{
              shrink: true,
            }}
            value={zillow_url_link}
            onChange={(e) => {
              setzillow_url_link(e.target.value);
              //   props.setCo({
              //     ...props.co,
              //     zillow_url_link: e.target.value,
              //   });
            }}
          />
          <TextField
            id="outlined-password-input"
            label="Zestimate"
            InputLabelProps={{
              shrink: true,
            }}
            value={zestimate}
            onChange={(e) => {
              setzestimate(e.target.value);
              //   props.setCo({ ...props.co, zestimate: e.target.value });
            }}
          />
          <TextField
            id="outlined-password-input"
            label="Street View Link"
            InputLabelProps={{
              shrink: true,
            }}
            value={street_view_link}
            onChange={(e) => {
              setstreet_view_link(e.target.value);
              //   props.setCo({ ...props.co, street_view_link: e.target.value });
            }}
          />
          <TextField
            id="outlined-password-input"
            label="Costar Link"
            InputLabelProps={{
              shrink: true,
            }}
            value={costar_link}
            onChange={(e) => {
              setcostar_link(e.target.value);
              //   props.setCo({ ...props.co, costar_link: e.target.value });
            }}
          />
          <TextField
            id="outlined-password-input"
            label="Year Built"
            // placeholder="yyyy-mm-dd"
            InputLabelProps={{
              shrink: true,
            }}
            value={year_built}
            onChange={(e) => {
              setyear_built(e.target.value);
              //   props.setCo({ ...props.co, year_built: e.target.value });
            }}
          />
          <TextField
            id="outlined-password-input"
            label="Last Sold Date"
            InputLabelProps={{
              shrink: true,
            }}
            value={last_sold_date}
            onChange={(e) => {
              setlast_sold_date(e.target.value);
              //   props.setCo({ ...props.co, last_sold_date: e.target.value });
            }}
          />
          <TextField
            id="outlined-password-input"
            label="Last Sold Year"
            InputLabelProps={{
              shrink: true,
            }}
            value={last_sold_year}
            onChange={(e) => {
              setlast_sold_year(e.target.value);
              //   props.setCo({ ...props.co, last_sold_year: e.target.value });
            }}
          />
          <TextField
            id="outlined-password-input"
            label="Last Sold Price"
            InputLabelProps={{
              shrink: true,
            }}
            value={last_sold_price}
            onChange={(e) => {
              setlast_sold_price(e.target.value);
              //   props.setCo({ ...props.co, last_sold_year: e.target.value });
            }}
          />
          {/* <TextField
            id="outlined-select-currency"
            select
            label="last_sold_price"
            defaultValue="E"
            onChange={(e) => {
              setlast_sold_price(e.target.value);
              //   props.setCo({ ...props.co, last_sold_price: e.target.value });
            }}
          >
            <MenuItem value="Current">Current</MenuItem>
            <MenuItem value="NotCurrent">Not Current</MenuItem>
            <MenuItem value="Matured">Matured</MenuItem>
            <MenuItem value="MaturityDefault">Maturity Default</MenuItem>
            <MenuItem value="PaymentDefault">Payment Default</MenuItem>
            <MenuItem value="ForeCloser">Forecloser</MenuItem>
            <MenuItem value="ForeBearance">Forebearance</MenuItem>
          </TextField> */}

          <TextField
            id="outlined-select-currency"
            select
            label="Listed"
            defaultValue="E"
            onChange={(e) => {
              setlisted(e.target.value);
              //   props.setCo({ ...props.co, last_sold_price: e.target.value });
            }}
          >
            <MenuItem value="Current">Yes</MenuItem>
            <MenuItem value="NotCurrent">No</MenuItem>
            <MenuItem value="Matured">Pending Sale</MenuItem>
          </TextField>
          <TextField
            id="outlined-password-input"
            label="Estimated COE"
            // placeholder="$"
            InputLabelProps={{
              shrink: true,
            }}
            value={estimated_ceo}
            onChange={(e) => {
              setestimated_ceo(e.target.value);
              //   props.setCo({ ...props.co, tax_assessment: e.target.value });
            }}
          />
          <TextField
            id="outlined-password-input"
            label="Tax Assesment"
            // placeholder="$"
            InputLabelProps={{
              shrink: true,
            }}
            value={tax_assessment}
            onChange={(e) => {
              settax_assessment(e.target.value);
              //   props.setCo({ ...props.co, tax_assessment: e.target.value });
            }}
          />
          <TextField
            id="outlined-select-currency"
            select
            label="Adding Square Footage"
            defaultValue="E"
            onChange={(e) => {
              setsqaure_footage(e.target.value);
              //   props.setCo({ ...props.co, last_sold_price: e.target.value });
            }}
          >
            <MenuItem value="Current">Yes</MenuItem>
            <MenuItem value="NotCurrent">No</MenuItem>
            <MenuItem value="Matured">1</MenuItem>
          </TextField>
          <TextField
            id="outlined-password-input"
            label="Square Footage Added"
            InputLabelProps={{
              shrink: true,
            }}
            value={square_footage_added}
            onChange={(e) => {
              setsquare_footage_added(e.target.value);
              //   props.setCo({
              //     ...props.co,
              //     square_footage_added: e.target.value,
              //   });
            }}
          />
          <TextField
            id="outlined-password-input"
            label="Finished Property Square Footage"
            InputLabelProps={{
              shrink: true,
            }}
            value={finished_square_footage}
            onChange={(e) => {
              setfinished_square_footage(e.target.value);
              //   props.setCo({
              //     ...props.co,
              //     finished_square_footage: e.target.value,
              //   });
            }}
          />
          <TextField
            id="outlined-select-currency"
            select
            label="Adding Units?"
            defaultValue="E"
            onChange={(e) => {
              setadding_units(e.target.value);
              //   props.setCo({ ...props.co, last_sold_price: e.target.value });
            }}
          >
            <MenuItem value="Current">Yes</MenuItem>
            <MenuItem value="NotCurrent">No</MenuItem>
            <MenuItem value="Matured">1</MenuItem>
          </TextField>
          <TextField
            id="outlined-password-input"
            label="Number Of Units Added"
            InputLabelProps={{
              shrink: true,
            }}
            value={number_of_units}
            onChange={(e) => {
              setnumber_of_units(e.target.value);
              //   props.setCo({
              //     ...props.co,
              //     number_of_units: e.target.value,
              //   });
            }}
          />
          <TextField
            id="outlined-password-input"
            label="Number Of Bedrooms"
            InputLabelProps={{
              shrink: true,
            }}
            value={number_of_bedrooms}
            onChange={(e) => {
              setnumber_of_bedrooms(e.target.value);
              //   props.setCo({
              //     ...props.co,
              //     number_of_units: e.target.value,
              //   });
            }}
          />
          <TextField
            id="outlined-password-input"
            label="Number Of Bathrooms"
            InputLabelProps={{
              shrink: true,
            }}
            value={number_of_bathrooms}
            onChange={(e) => {
              setnumber_of_bathrooms(e.target.value);
              //   props.setCo({
              //     ...props.co,
              //     number_of_units: e.target.value,
              //   });
            }}
          />
          <TextField
            id="outlined-password-input"
            label="CLTV"
            InputLabelProps={{
              shrink: true,
            }}
            value={cltv}
            onChange={(e) => {
              setcltv(e.target.value);
              //   props.setCo({
              //     ...props.co,
              //     number_of_units: e.target.value,
              //   });
            }}
          />
          <TextField
            id="outlined-password-input"
            label="Preffered Equity Amount Requested"
            InputLabelProps={{
              shrink: true,
            }}
            value={preferred_equity_amount}
            onChange={(e) => {
              setpreferred_equity_amount(e.target.value);
              //   props.setCo({
              //     ...props.co,
              //     number_of_units: e.target.value,
              //   });
            }}
          />
          <TextField
            id="outlined-password-input"
            label="Property Notes"
            InputLabelProps={{
              shrink: true,
            }}
            value={property_notes}
            onChange={(e) => {
              setproperty_notes(e.target.value);
              //   props.setCo({
              //     ...props.co,
              //     number_of_units: e.target.value,
              //   });
            }}
          />
          {/* <button
            onClick={(e) => {
              e.preventDefault();
              console.log("ExtendedPropertyInfo", props.co);
            }}
          >
            Check
          </button> */}
        </Box>
      </div>
    </>
  );
};

export default ExtendedPropertyInfo;
