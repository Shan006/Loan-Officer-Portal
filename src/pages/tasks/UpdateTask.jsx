import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Link, useLocation } from "react-router-dom";

const UpdateTask = () => {
  const Location = useLocation();
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [title, setTitle] = useState(Location.state.title);
  const [description, setDescription] = useState(Location.state.description);
  const [deadline, setDeadline] = useState(Location.state.deadlinee);
  const [assignedTo, setAssignedTo] = useState(Location.state.assigned_to);
  const [isUrgent, setIsUrgent] = useState(false);

  const TaskStatus = [
    {
      label: "Started",
      value: "Started",
    },
    {
      label: "Pending",
      value: "Pending",
    },
    {
      label: "On Hold",
      value: "On Hold",
    },
    {
      label: "Complete",
      value: "Complete",
    },
  ];
  const Cancel = () => {
    setDeadline("");
    setTitle("");
    setDescription("");
    setStatus("");
  };
  const UpdateTask = async () => {
    // Parse deadline and current date
    const currentDate = new Date();
    let deadlineDate = new Date(deadline);

    if (title != "" && description != "" && deadline != "") {
      // Validate deadline
      if (isNaN(deadlineDate.getTime())) {
        toast.error("Please enter a valid deadline");
        return;
      }
      if (deadlineDate < currentDate && !isUrgent) {
        toast.warning("Deadline must be in the future");
        return;
      }
      // Check if task is marked as urgent and the deadline is in the past
      if (isUrgent && deadlineDate < currentDate) {
        deadlineDate = currentDate;
        console.log("Deadline changed to current date: " + deadlineDate);
      }
      try {
        const result = await axios.put(
          `${
            import.meta.env.VITE_REACT_APP_SERVER_URL
          }/task/update/user_status/${Location.state.id}`,
          {
            title: title,
            description: description,
            deadline: deadlineDate,
            status: status,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        toast.success(result.data.message);
        setTitle("");
        setDescription("");
        setDeadline("");
        setAssignedTo("");
        setStatus("");
        // Navigate("/task/alltasks");
        Navigate("/task/alltasksDataTable");
      } catch (error) {
        console.log("error while updating task status", error);
      }
    } else {
      toast.error("please fill the feild!!!");
    }
  };

  return (
    <>
      {loading ? (
        <div className=" flex items-center justify-center h-screen w-screen">
          <TailSpin height={60} />
        </div>
      ) : (
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
                className="border-solid border-2 rounded-md border-indigo-200 px-2 py-4 ml-2"
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <h1 className="ml-4 mb-3  font-bold text-2xl">Update Task </h1>
                <TextField
                  id="outlined-password-input"
                  label="Title"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <TextField
                  id="outlined-password-input"
                  label="Deadline"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
                {/* <TextField
                id="outlined-password-input"
                label="Assigend To"
                InputLabelProps={{
                  shrink: true,
                }}
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
              /> */}
                <TextField
                  id="outlined-password-input"
                  label="Status"
                  select
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  {TaskStatus.map((option) => (
                    <MenuItem value={option.value} key={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Description"
                  multiline
                  maxRows={3}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                {/* <br></br> */}

                <Button variant="contained" className="m-3">
                  <Link
                    to="/tasks/list"
                    className="text-white hover:text-white no-underline"
                  >
                    Cancel
                  </Link>
                </Button>
                {/* <br> */}
                <Button
                  variant="contained"
                  className="m-3"
                  onClick={UpdateTask}
                >
                  Update
                </Button>
              </Box>
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateTask;
