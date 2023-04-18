import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import WelcomeBanner from "../../partials/dashboard/WelcomeBanner";
import Button from "@mui/material/Button";
import axios from "axios";
// import { toast } from "react-toastify";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import moment from "moment";
// import {  Checkbox, FormControlLabel } from '@material-ui/core';
const AssignTask = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [userId, setUserId] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const GetTask = async () => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_REACT_APP_SERVER_URL}/user_management`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      //  console.log("Getting all users :",result.data.users);
      setUsers(result.data.users);
    } catch (error) {
      console.log("Error to getting all leads ", error);
    }
  };
  useEffect(() => {
    GetTask();
  }, []);
  const Add_Task = async () => {
    // Parse deadline and current date
    const currentDate = new Date();
    let deadlineDate = new Date(deadline);

    if (title != "" && description != "" && deadline != "" && userId != "") {
      // Validate deadline
      if (isNaN(deadlineDate.getTime())) {
        toast.warning("Please enter a valid deadline");
        return;
      }
      if (deadlineDate < currentDate && !isUrgent) {
        toast.error("Deadline must be in the future");
        return;
      }
      // Check if task is marked as urgent and the deadline is in the past
      if (isUrgent && deadlineDate < currentDate) {
        deadlineDate = currentDate;
        console.log("Deadline changed to current date: " + deadlineDate);
      }
      try {
        const result = await axios.post(
          `${import.meta.env.VITE_REACT_APP_SERVER_URL}/task/add/user`,
          {
            title: title,
            description: description,
            deadline: deadlineDate,
            assigned_to: userId,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        // console.log(result.data.message);
        toast.success(result.data.message);
        setTitle("");
        setDeadline("");
        setDescription("");
        setIsUrgent(false);
        navigate("/task/alltasksDataTable");
      } catch (error) {
        console.log("error", error);
      }
    } else {
      toast.error("Please fill all the feilds!!!");
    }
  };

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              <WelcomeBanner />
            </div>
            <Box
              className="border-solid border-2   rounded-md border-indigo-200 px-2 py-4 ml-2"
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <h1 className="ml-4 mb-3  font-bold text-2xl ">Add Task</h1>

              <TextField
                id="outlined-password-input"
                label=" Title"
                InputLabelProps={{
                  shrink: true,
                }}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                id="outlined-password-input"
                label="Description"
                InputLabelProps={{
                  shrink: true,
                }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <TextField
                id="outlined-select-currency"
                select
                label="Assigned To"
                defaultValue="E"
                onChange={(e) => setUserId(e.target.value)}
              >
                {users.map((option) => (
                  <MenuItem key={option._id} value={option._id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                id="outlined-password-input"
                type="date"
                label="Deadline"
                InputLabelProps={{
                  shrink: true,
                }}
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
              <FormControlLabel
                style={{ marginLeft: "2px" }}
                control={
                  <Checkbox
                    checked={isUrgent}
                    onChange={(event) => setIsUrgent(event.target.checked)}
                  />
                }
                label="Urgent?"
              />
              <Button variant="contained" className="m-3" onClick={Add_Task}>
                Submit
              </Button>
            </Box>
          </main>
        </div>
      </div>
    </>
  );
};

export default AssignTask;
