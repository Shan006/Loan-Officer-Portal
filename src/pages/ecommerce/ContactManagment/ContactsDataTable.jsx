import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../partials/Sidebar";
import Header from "../../../partials/Header";
// import WelcomeBanner from "../../partials/dashboard/WelcomeBanner";
import Button from "@mui/material/Button";
import axios from "axios";
import { toast } from "react-hot-toast";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const ContactsDataTable = () => {
  const [data, setData] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isData, setIsData] = useState(true);
  const Navigate = useNavigate();
  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      headerClassName: "bg-blue-500 text-white text-lg",
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
      headerClassName: "bg-blue-500 text-white text-lg",
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 170,
      headerClassName: "bg-blue-500 text-white text-lg",
    },
    {
      field: "group",
      headerName: "Group",
      width: 170,
      headerClassName: "bg-blue-500 text-white text-lg",
    },

    //     { field: "update", headerName: "Action", width: 100,headerClassName: 'bg-blue-500 text-white text-lg',cellClassName: 'text-center',
    //     renderCell: (params) => (
    //       <Button
    //         variant="contained"
    //         color="primary"
    //         onClick={
    //             () => {
    //                 console.log("params:",params);
    //                 Navigate(`/user/updateUser`,{
    //                   state:{
    //                     id:params.row.id,
    //                     name:params.row.name,
    //                     email:params.row.email,
    //                     role:params.row.role==='Loan Officer'?'loan_officer':'loan_processor',
    //                     status:params.row.status==='Active'?true:false
    //                   }
    //                 }
    //                 );
    //               }
    //     }
    //       >
    //               <AiOutlineEdit className="w-6 h-6"/>

    //       </Button>
    //     )
    //   },
  ];

  const getData = async () => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_REACT_APP_SERVER_URL}/contact/user`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(result.data.contacts[0].contact_group);
      const usersDataum = result.data.contacts[0].contact_group;
      usersDataum.forEach((element, index) => {
        element.contacts.forEach((contact) => {
          const dd = {
            id: contact._id,
            name: contact.name,
            email: contact.email,
            phone: contact.phone,
            group: element.group_name,
          };
          setData((oldData) => [...oldData, dd]);
        });
      });
      if (data.length < 0) {
        setIsData(false);
      }
    } catch (error) {
      toast.error("Error while getting Users!!!");
      console.log("Error while getting data ", error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
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
                    Contacts✨
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
                  headerRowHeight={40}
                  rowHeight={40}
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
    </>
  );
};
export default ContactsDataTable;
