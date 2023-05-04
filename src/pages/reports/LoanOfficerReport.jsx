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
import uuid from "react-uuid";

function LoanOfficerReport() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [array, setArray] = React.useState([]);

  const [apiData, setApiData] = useState();
  const Navigate = useNavigate();
  const { userData } = useContext(AuthContext);

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "leadname", headerName: "Lead name", width: 130 },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      width: 220,
    },
    {
      field: "loanvalue",
      headerName: "LoanValue",
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
            }/report/user/loanOfficerReport`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            console.log(res.data);
            const data = res?.data;
            const leads = data?.lead;
            if (leads !== undefined) {
              leads.forEach((element) => {
                let properDate = moment(element.created).format("MMMM Do YYYY");
                const dd = {
                  id: uuid(),
                  leadname: element.firstname + " " + element.lastname,
                  createdAt: properDate,
                  loanvalue: element.monthly_total_loan_value
                    ? element.monthly_total_loan_value
                    : "0",
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
                  Reports ✨
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

export default LoanOfficerReport;
