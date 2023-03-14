import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import DeleteButton from "../../partials/actions/DeleteButton";
import DateSelect from "../../components/DateSelect";
import FilterButton from "../../components/DropdownFilter";
import CustomersTable from "../../partials/customers/CustomersTable";
import PaginationClassic from "../../components/PaginationClassic";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function Customers() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  // To get All data from Api.
  const [apiData, setApiData] = useState();
  // to show paginated record on screen
  const [showRecords, setShowRecords] = useState([]);
  // for count
  const [noOfRecord, setNoOfRecord] = useState();
  // const [recordsPerPage, setRecordsPerPage] = useState(1);
  // const [startRecord, setStartRecord] = useState(0);
  // const [endRecord, setEndRecord] = useState(startRecord + recordsPerPage);
  const Navigate = useNavigate();

  // const handleSelectedItems = (selectedItems) => {
  //   setSelectedItems([...selectedItems]);
  // };

  useEffect(() => {
    try {
      axios
        .get(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/lead/user_all`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res);
          console.log(res.data);
          setApiData(res.data);
          console.log(res.data.lead.length);
          setNoOfRecord(res.data.lead.length);
          // setEndRecord(recordsPerPage);
        })
        .catch((err) => {
          // toast.error("Something went wrong!");
        });
    } catch (error) {
      // toast.error("Something went wrong!");
    }
    console.log("apiData", apiData);
  }, []);

  // useEffect(() => {
  //   console.log(startRecord);
  //   setShowRecords([]);
  //   for (let i = startRecord; i < endRecord; i++) {
  //     showRecords.push(apiData.lead[i]);
  //   }
  //   console.log("Record", showRecords);
  // }, [endRecord]);

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
                {/* Delete button */}
                {/* <DeleteButton selectedItems={selectedItems} /> */}

                {/* Dropdown */}
                <DateSelect />

                {/* Filter button */}
                <FilterButton align="right" />

                {/* Add customer button */}
                <button
                  className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                  onClick={() => {
                    Navigate("/ecommerce/customer/add");
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
            {/* <CustomersTable selectedItems={handleSelectedItems} /> */}
            <CustomersTable Leads={apiData} />

            {/* Pagination */}
            <div className="mt-8">
              <PaginationClassic
                Record={noOfRecord}
                // perPage={recordsPerPage}
                // start={startRecord}
                // end={startRecord}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Customers;
