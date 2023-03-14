import * as React from "react";
import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-hot-toast";
import axios from "axios";

function DataTabel() {
  const [apiData, setApiData] = React.useState([]);
  const [rows, setRows] = React.useState([]);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstname", headerName: "First name", width: 130 },
    { field: "lastname", headerName: "Last name", width: 130 },
    {
      field: "email",
      headerName: "Email",
      type: "email",
      width: 90,
    },
    {
      field: "phone",
      headerName: "Phone",
      type: "number",
      width: 90,
    },
    {
      field: "status",
      headerName: "Status",
      width: 90,
    },
  ];

  //   let rows = [
  //     {
  //       id: 1,
  //       lastname: "Snow",
  //       firstname: "Jon",
  //       email: 35,
  //       phone: 123456,
  //       status: "NewLead",
  //     },
  //     {
  //       id: 2,
  //       lastname: "Lannister",
  //       firstname: "Cersei",
  //       email: 42,
  //       phone: 123456,
  //       status: "NewLead",
  //     },
  //     {
  //       id: 3,
  //       lastname: "Lannister",
  //       firstname: "Jaime",
  //       email: 45,
  //       phone: 123456,
  //       status: "NewLead",
  //     },
  //     {
  //       id: 4,
  //       lastname: "Stark",
  //       firstname: "Arya",
  //       email: 16,
  //       phone: 123456,
  //       status: "NewLead",
  //     },
  //     {
  //       id: 5,
  //       lastname: "Targaryen",
  //       firstname: "Daenerys",
  //       email: null,
  //       phone: 123456,
  //       status: "NewLead",
  //     },
  //     {
  //       id: 6,
  //       lastname: "Melisandre",
  //       firstname: null,
  //       email: 15,
  //       phone: 123456,
  //       status: "NewLead",
  //     },
  //     {
  //       id: 7,
  //       lastname: "Clifford",
  //       firstname: "Ferrara",
  //       email: 44,
  //       phone: 123456,
  //       status: "NewLead",
  //     },
  //     {
  //       id: 8,
  //       lastname: "Frances",
  //       firstname: "Rossini",
  //       email: 36,
  //       phone: 123456,
  //       status: "NewLead",
  //     },
  //     {
  //       id: 9,
  //       lastname: "Roxie",
  //       firstname: "Harvey",
  //       email: 65,
  //       phone: 123456,
  //       status: "NewLead",
  //     },
  //   ];

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
          //   setApiData(res.data.lead);
          res.data.lead.forEach((element) => {
            // console.log(element);
            let i = 0;
            element.leads.forEach((item, index) => {
              setApiData([
                ...apiData,
                {
                  id: i,
                  lastname: item.lastname,
                  firstname: item.firstname,
                  email: item.email,
                  phone: item.phone,
                  status: "NewLead",
                },
              ]);
            });
          });

          console.log("apiData", apiData);
          setRows(apiData);
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
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
      {/* <button onClick={Show}>Click</button> */}
    </div>
  );
}

export default DataTabel;
