import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const LeadDetails = (props) => {
  const [entity_name, setEntity_name] = useState("");
  const [entity_type, setEntity_type] = useState("");
  const [account_priority, setAccount_priority] = useState("");
  const [reference_id, setReference_id] = useState("");
  const [tags, settags] = useState([]);
  const [notes, setNotes] = useState("");

  // useEffect(() => {
  //   props.d.entity_name && setEntity_name(props.d.entity_name);
  //   props.d.entity_type && setEntity_type(props.d.entity_type);
  //   props.d.account_priority && setAccount_priority(props.d.account_priority);
  //   props.d.reference_id && setReference_id(props.d.reference_id);
  //   props.d.tags && settags(props.d.tags);
  //   props.d.notes && setNotes(props.d.notes);
  // }, [props.d.length > 0]);

  //   useEffect(() => {
  //     setEntity_name("");
  //     setEntity_type("");
  //     setAccount_priority("");
  //     setReference_id("");
  //     settags("");
  //     setNotes("");
  //     props.setClear(false);
  //   }, [props.clear]);
  return (
    <>
      <div className="border-solid border-2 rounded-md border-indigo-200 py-3 mt-4">
        <h1 className="ml-4 font-medium">Lead Notes</h1>
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
            label="Entity Name"
            InputLabelProps={{
              shrink: true,
            }}
            value={entity_name}
            onChange={(e) => {
              setEntity_name(e.target.value);
              //   props.setCo({
              //     ...props.co,
              //     area: e.target.value,
              //   });
            }}
          />
          <TextField
            id="outlined-select-currency"
            select
            label="EntityType"
            defaultValue="E"
            onChange={(e) => {
              setEntity_type(e.target.value);
              //   props.setCo({ ...props.co, timeframe: e.target.value });
            }}
          ></TextField>
          <TextField
            id="outlined-select-currency"
            select
            label="AccountPriority"
            defaultValue="E"
            onChange={(e) => {
              setAccount_priority(e.target.value);
              //   props.setCo({ ...props.co, timeframe: e.target.value });
            }}
          >
            <MenuItem value="Hot">Hot</MenuItem>
            <MenuItem value="Warm">Warm</MenuItem>
            <MenuItem value="Cold">Cold</MenuItem>
            <MenuItem value="Nurture">Nurture</MenuItem>
            <MenuItem value="Dead">Dead</MenuItem>
            <MenuItem value="Trash">Trash</MenuItem>
          </TextField>
          <TextField
            id="outlined-password-input"
            label="RefrenceId"
            InputLabelProps={{
              shrink: true,
            }}
            value={reference_id}
            onChange={(e) => {
              setReference_id(e.target.value);
              //   props.setCo({ ...props.co, purchasePrice: e.target.value });
            }}
          />
          <div className="flex">
            <TextField
              id="outlined-password-input"
              label="Notes"
              InputLabelProps={{
                shrink: true,
              }}
              value={notes}
              onChange={(e) => {
                setNotes(e.target.value);
                //   props.setCo({ ...props.co, downPaymentAmount: e.target.value });
              }}
            />
            <FormGroup className="flex-row mt-2 ml-2 items-center">
              <h1 className="mr-3">Tags : </h1>
              <FormControlLabel
                control={<Checkbox />}
                onClick={(e) => {
                  if (tags.length === 0) {
                    tags.push(e.target.name);
                  } else {
                    settags([...tags, e.target.name]);
                  }
                }}
                label="Contacted"
                name="Contacted"
              />
              <FormControlLabel
                control={<Checkbox />}
                onClick={(e) => {
                  if (tags.length === 0) {
                    tags.push(e.target.name);
                  } else {
                    settags([...tags, e.target.name]);
                  }
                }}
                label="NotContacted"
                name="NotContacted"
              />
              <FormControlLabel
                control={<Checkbox />}
                onClick={(e) => {
                  if (tags.length === 0) {
                    tags.push(e.target.name);
                  } else {
                    settags([...tags, e.target.name]);
                  }
                }}
                label="DoNotContact"
                name="DoNotContact"
              />
              <FormControlLabel
                control={<Checkbox />}
                onClick={(e) => {
                  if (tags.length === 0) {
                    tags.push(e.target.name);
                  } else {
                    settags([...tags, e.target.name]);
                  }
                }}
                label="Interested"
                name="Interested"
              />
              <FormControlLabel
                control={<Checkbox />}
                onClick={(e) => {
                  if (tags.length === 0) {
                    tags.push(e.target.name);
                  } else {
                    settags([...tags, e.target.name]);
                  }
                }}
                label="NotInterested"
                name="NotInterested"
              />
            </FormGroup>
          </div>
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

export default LeadDetails;
