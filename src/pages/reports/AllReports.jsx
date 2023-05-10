import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import DeleteButton from "../../partials/actions/DeleteButton";
import DateSelect from "../../components/DateSelect";
import FilterButton from "../../components/DropdownFilter";
import CustomersTable from "../../partials/customers/CustomersTable";
import PaginationClassic from "../../components/PaginationClassic";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";
import Image01 from "../../images/user-40-01.jpg";

function AllReports() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [array, setArray] = React.useState([]);

  const [apiData, setApiData] = useState();
  const Navigate = useNavigate();
  const { userData } = useContext(AuthContext);

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "firstname", headerName: "First name", width: 130 },
    { field: "lastname", headerName: "Last name", width: 130 },
    {
      field: "email",
      headerName: "Email",
      type: "email",
      width: 150,
    },
    {
      field: "phone",
      headerName: "Phone",
      type: "number",
      width: 150,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      width: 220,
    },
    {
      field: "loanbalance",
      headerName: "LoanBalance",
      width: 140,
    },
    {
      field: "realtor",
      headerName: "RealtorRefferal",
      width: 140,
    },
    {
      field: "status",
      headerName: "Status",
      width: 140,
    },
  ];

  // useEffect(() => {
  //   try {
  //     axios
  //       .get(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/report/allReports`, {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       })
  //       .then((res) => {
  //         console.log(res);
  //         console.log(res.data.leads);
  //         setApiData(res.data.leads);
  //       })
  //       .catch((err) => {
  //         toast.error("Something went wrong!");
  //       });
  //   } catch (error) {
  //     toast.error("Something went wrong!");
  //   }
  //   console.log("apiData", apiData);
  // }, []);

  const myRef = useRef(false);
  useEffect(() => {
    if (userData !== undefined) {
      if (myRef.current) return;
      myRef.current = true;
      try {
        axios
          .get(
            `${
              import.meta.env.VITE_REACT_APP_SERVER_URL
            }/report/user/reportByLoanOfficer/${userData._id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                Custom: "Reports",
              },
            }
          )
          .then((res) => {
            console.log(res.data);
            const data = res?.data;
            const leads = data?.lead;
            if (leads !== undefined) {
              leads.forEach((element) => {
                let properDate = moment(element.leads[0].createdAt).format(
                  "MMMM Do YYYY"
                );
                const dd = {
                  id: element._id,
                  lastname: element.leads[0].lastname,
                  firstname: element.leads[0].firstname,
                  email: element.leads[0].email,
                  phone: element.leads[0].phone,
                  createdAt: properDate,
                  loanbalance:
                    element.loandetails[0] !== undefined
                      ? element.loandetails[0].estimated_value
                      : "0",
                  realtor:
                    element.leads[0].realtor !== undefined
                      ? element.leads[0].realtor.firstname
                      : "No Realtor",
                  status: "New Lead",
                };
                setArray((oldPosts) => [...oldPosts, dd]);
              });
            } else {
              toast.error("No Lead Reports Found");
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
    } else {
      null;
    }
  }, [userData]);

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
                  Reports
                </h1>
              </div>

              {/* Right: Actions */}
              {/* <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2"> */}
              {/* Delete button */}
              {/* <DeleteButton selectedItems={selectedItems} /> */}

              {/* Dropdown */}
              {/* <DateSelect /> */}

              {/* Filter button */}
              {/* <FilterButton align="right" /> */}
              {/* </div> */}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              {/* <table className="table-auto w-full">
                <thead className="text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t border-b border-slate-200">
                  <tr>
                    <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                      <div className="font-semibold text-left">LeadName</div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                      <div className="font-semibold text-left">Date</div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                      <div className="font-semibold text-left">MobilePhone</div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                      <div className="font-semibold">Email</div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                      <div className="font-semibold">LoanDetails</div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                      <div className="font-semibold">RealtorRefferal</div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                      <div className="font-semibold">Status</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-slate-200">
                  {apiData &&
                    apiData.map((report) => {
                      return report.leads.map((reportData) => {
                        return (
                          <>
                            <tr>
                              <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                                    <img
                                      className="rounded-full"
                                      src={Image01}
                                      width="40"
                                      height="40"
                                      alt="image"
                                    />
                                  </div>
                                  <div className="font-medium text-slate-800">
                                    {reportData.firstname} {reportData.lastname}
                                  </div>
                                </div>
                              </td>
                              <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                <div className="text-left">
                                  {reportData.createdAt}
                                </div>
                              </td>
                              <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                <div className="text-left font-medium text-sky-500">
                                  {reportData.phone}
                                </div>
                              </td>
                              <td className="px-0 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                <div className="text-center">
                                  {reportData.email}
                                </div>
                              </td>
                              <td className="px-0 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                <div className="text-center">Loan</div>
                              </td>
                              <td className="px-0 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                <div className="text-center">User</div>
                              </td>
                              <td className="px-0 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                <div className="text-center bg-blue-600 py-2 rounded-md text-white">
                                  NewLead
                                </div>
                              </td>
                            </tr>
                          </>
                        );
                      });
                    })}
                </tbody>
              </table> */}
              <div style={{ height: 430, width: "100%" }}>
                <DataGrid
                  rows={array}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  rowHeight={40}
                  headerRowHeight={40}
                  checkboxSelection
                  className="curson-pointer"
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AllReports;
