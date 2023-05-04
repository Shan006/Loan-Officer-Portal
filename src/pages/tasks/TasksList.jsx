import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import WelcomeBanner from "../../partials/dashboard/WelcomeBanner";
import Button from "@mui/material/Button";
import axios from "axios";
import { toast } from "react-hot-toast";
import moment from "moment/moment";
import Conformation from "./Conformation";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
const TasksList = () => {
  const [data, setData] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [Itemdata, setItemData] = useState({});
  const Navigate = useNavigate();
  const myRef = useRef(false);

  // open delete dialog
  function OpenDelete(item) {
    console.log("deleting  iddd:", item);
    setOpen(true);
    setItemData(item);
  }

  const columns = [
    // { field: "id", headerName: "ID", width: 200 },
    {
      field: "title",
      headerName: "Title",
      width: 150,
      headerClassName: "bg-blue-500 text-white text-lg",
    },
    {
      field: "description",
      headerName: "Description",
      width: 150,
      headerClassName: "bg-blue-500 text-white text-lg",
    },
    {
      field: "deadline",
      headerName: "Deadline",
      width: 150,
      headerClassName: "bg-blue-500 text-white text-lg",
    },
    {
      field: "assignto",
      headerName: "Assign To",
      width: 150,
      headerClassName: "bg-blue-500 text-white text-lg",
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      headerClassName: "bg-blue-500 text-white text-lg",
    },
    {
      field: "delete",
      headerName: "Action",
      width: 100,
      headerClassName: "bg-blue-500 text-white text-lg",
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            OpenDelete(params.row);
          }}
        >
          <AiOutlineDelete className="h-5 w-5" />
        </Button>
      ),
    },

    {
      field: "update",
      headerName: "Action",
      width: 100,
      headerClassName: "bg-blue-500 text-white text-lg",
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            console.log("params:", params);
            Navigate(`/task/updateTask`, {
              state: {
                id: params.row.id,
                title: params.row.title,
                description: params.row.description,
                deadline: params.row.deadline,
                assigned_to: params.row.assigned_to,
                status: params.row.status,
              },
            });
          }}
        >
          <AiOutlineEdit className="h-5 w-5" />
        </Button>
      ),
    },
  ];

  const getData = async () => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_REACT_APP_SERVER_URL}/task/user`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("taskssss", result.data);

      const taskDatum = result.data.tasks;
      taskDatum &&
        taskDatum.forEach((element, index) => {
          const dd = {
            id: element._id,
            title: element.title,
            description: element.description,
            deadline: moment(element.deadline).format("MM.DD.YYYY"),
            assignto: element.assigned_to.name,
            status: element.status === "pending" ? "Pending" : element.status,
          };
          setData((oldData) => [...oldData, dd]);
        });
    } catch (error) {
      console.log("error:", error);
    }
  };
  const DeleteTask = async () => {
    try {
      const result = await axios.delete(
        `${import.meta.env.VITE_REACT_APP_SERVER_URL}/task/delete/user/${
          Itemdata?.id
        }`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(result.data.message);
      console.log(data);
      console.log(Itemdata?.id);
      let newData = data.filter((item) => item.id !== Itemdata?.id);
      setData(newData);
      setOpen(false);
    } catch (error) {
      console.log("Error while deleting task", error);
    }
  };
  useEffect(() => {
    if (myRef.current) return;
    myRef.current = true;
    getData();
  }, []);
  // console.log("Task State",data.assigned_by.name);
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
              {/* Page header */}
              <div className="sm:flex sm:justify-between sm:items-center mb-8">
                {/* Left: Title */}
                <div className="mb-4 sm:mb-0">
                  <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
                    Tasks
                  </h1>
                </div>

                {/* Right: Actions */}
              </div>

              {/* Table */}
              <div style={{ height: 430, width: "100%" }}>
                <DataGrid
                  rows={data}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  rowHeight={40}
                  headerRowHeight={40}
                  checkboxSelection
                  className="curson-pointer"
                  onCellClick={(e) => {
                    console.log("eeee", e);
                    // Navigate("/ecommerce/customers/leadDetails", {
                    //   state: {
                    //     id: e.id,
                    //   },
                    // });
                  }}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
      <Conformation
        open={open}
        title={Itemdata?.title}
        deleteFunction={DeleteTask}
        closeDialog={() => setOpen(false)}
      />
    </>
  );
};
export default TasksList;
