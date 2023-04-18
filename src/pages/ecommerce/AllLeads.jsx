import * as React from "react";
import { useEffect, useRef, useContext, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-hot-toast";
import axios from "axios";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Conformation from "../tasks/Conformation";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

function AllLeads() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [array, setArray] = React.useState([]);
  const [open, setOpen] = useState(false);
  const [deleteID, setdeleteID] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const Navigate = useNavigate();

  function OpenDelete(id, firstname, lastname) {
    setdeleteID(id);
    setFirstname(firstname);
    setLastname(lastname);
    setOpen(true);
  }
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 200,
      headerClassName: "bg-blue-500 text-white text-lg",
      cellClassName: "text-center",
    },
    {
      field: "firstname",
      headerName: "First name",
      width: 130,
      headerClassName: "bg-blue-500 text-white text-lg",
      cellClassName: "text-center",
    },
    {
      field: "lastname",
      headerName: "Last name",
      width: 130,
      headerClassName: "bg-blue-500 text-white text-lg",
      cellClassName: "text-center",
    },
    {
      field: "email",
      headerName: "Email",
      type: "email",
      width: 240,
      headerClassName: "bg-blue-500 text-white text-lg",
      cellClassName: "text-center",
    },
    {
      field: "phone",
      headerName: "Phone",
      type: "number",
      width: 150,
      headerClassName: "bg-blue-500 text-white text-lg",
      cellClassName: "text-center",
    },
    {
      field: "status",
      headerName: "Status",
      width: 140,
      headerClassName: "bg-blue-500 text-white text-lg",
      cellClassName: "text-center",
    },
    {
      field: "del",
      headerName: "Action",
      width: 90,
      headerClassName: "bg-blue-500 text-white text-lg",
      cellClassName: "text-center",
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          onClick={() =>
            OpenDelete(params.row.id, params.row.firstname, params.row.lastname)
          }
        >
          <AiOutlineDelete className="h-6 w-6" />
        </Button>
      ),
    },
    {
      field: "update",
      headerName: "Action",
      width: 90,
      headerClassName: "bg-blue-500 text-white text-lg",
      cellClassName: "text-center",
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            Navigate("/updateLead", {
              state: {
                id: params.row.id,
              },
            })
          }
        >
          <AiOutlineEdit className="w-6 h-6" />
        </Button>
      ),
    },
  ];

  const myRef = useRef(false);

  useEffect(() => {
    if (myRef.current) return;
    myRef.current = true;
    try {
      axios
        .get(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/lead/user_all`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          const data = res?.data;
          const leads = data?.lead;
          // const leads = res.data.lead;
          if (leads !== undefined) {
            leads.forEach((element, index) => {
              const dd = {
                id: element._id,
                lastname: element.leads[0].lastname,
                firstname: element.leads[0].firstname,
                email: element.leads[0].email,
                phone: element.leads[0].phone,
                status: "NewLead",
              };
              setArray((oldPosts) => [...oldPosts, dd]);
            });
          } else {
            toast.error("No Leads Found");
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong!");
        });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  }, []);
  const handleDelete = async () => {
    console.log("handle del iddd:", deleteID);
    try {
      const result = await axios.delete(
        `${
          import.meta.env.VITE_REACT_APP_SERVER_URL
        }/lead/delete/user/${deleteID}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(result.data.message);
      setOpen(false);
      let updatedArray = array.filter((item) => item.id !== deleteID);
      setArray(updatedArray);
    } catch (error) {
      console.log("Error while deleting lead", error);
    }
  };
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
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
                  Leads ✨
                </h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Add customer button */}
                <button
                  className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                  onClick={() => {
                    Navigate("/addCustomer");
                  }}
                >
                  <svg
                    className="w-4 h-4 fill-current opacity-50 shrink-0"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="hidden xs:block ml-2">Add Leads</span>
                </button>
              </div>
            </div>

            {/* Table */}
            <div style={{ height: 430, width: "100%" }}>
              <DataGrid
                rows={array}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                className="curson-pointer"
                onCellClick={(e) => {
                  if (e.value === undefined) {
                    null;
                  } else {
                    Navigate("/Leaddetails", {
                      state: {
                        id: e.id,
                      },
                    });
                  }
                  //   Navigate("/Leaddetails", {
                  //     state: {
                  //       id: e.id,
                  //     },
                  //   });
                }}
              />
            </div>
          </div>
        </main>
      </div>
      <Conformation
        open={open}
        title={firstname + " " + lastname}
        deleteFunction={handleDelete}
        closeDialog={() => setOpen(false)}
      />
    </div>
  );
}

export default AllLeads;
