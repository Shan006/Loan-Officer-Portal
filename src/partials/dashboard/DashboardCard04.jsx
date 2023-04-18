import React, { useEffect, useState } from "react";
import BarChart from "../../charts/BarChart01";
import axios from "axios";

// Import utilities
import { tailwindConfig } from "../../utils/Utils";

function DashboardCard04() {
  const [loanOfficers, setLoanOfficers] = useState([]);
  const [loanValues, setLoanValues] = useState([]);
  const [isTrue, setIsTrue] = useState(false);
  useEffect(() => {
    try {
      axios
        .get(
          `${
            import.meta.env.VITE_REACT_APP_SERVER_URL
          }/user_management/loanComparison`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(function (response) {
          console.log("Loan Value Comparison", response.data);
          console.log("Leads", response.data.leads);
          response.data.leads.forEach((element) => {
            loanOfficers.push(element.leads[1].LoanOfficer);
            loanValues.push(element.loandetails[0].estimated_value);
            console.log(element.leads[1].LoanOfficer);
            console.log(element.loandetails[0].estimated_value);
            setIsTrue(true);
          });
        })
        .catch(function (error) {
          console.log(error);
          toast("Something Went Wrong", {
            position: "top-center",
          });
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  // const chartData = {
  // labels: [
  //   "12-01-2020",
  //   "01-01-2021",
  //   "02-01-2021",
  //   "03-01-2021",
  //   "04-01-2021",
  //   "05-01-2021",
  // ],
  // datasets: [
  // Light blue bars
  // {
  //   label: "Direct",
  //   data: [800, 1600],
  //   // data: [800, 1600, 900, 1300, 1950, 1700],
  //   backgroundColor: tailwindConfig().theme.colors.blue[400],
  //   hoverBackgroundColor: tailwindConfig().theme.colors.blue[500],
  //   barPercentage: 0.66,
  //   categoryPercentage: 0.66,
  // },
  // Blue bars
  // {
  //   label: 'Indirect',
  //   data: [
  //     4900, 2600, 5350, 4800, 5200, 4800,
  //   ],
  //   backgroundColor: tailwindConfig().theme.colors.indigo[500],
  //   hoverBackgroundColor: tailwindConfig().theme.colors.indigo[600],
  //   barPercentage: 0.66,
  //   categoryPercentage: 0.66,
  // },
  //   ],
  // };

  const data = {
    labels: loanOfficers,
    // labels: ["John", "Jane", "Mark", "Alice", "Bob"],
    datasets: [
      {
        label: "Loan Value in $",
        data: loanValues,
        // data: [40000, 62000, 42000, 71000, 49000],
        backgroundColor: tailwindConfig().theme.colors.indigo[400],
        // backgroundColor: "rgba(64, 162, 235, 0.2)",
        borderColor: tailwindConfig().theme.colors.indigo[400],
        // borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            callback: function (value, index, values) {
              return "$" + value;
            },
          },
        },
      ],
    },
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800 text-center">
          Loan Value Comparison
        </h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      {/* <BarChart data={chartData} width={595} height={248} /> */}
      {isTrue ? (
        <>
          <BarChart data={data} options={options} />
        </>
      ) : null}
      {/* <BarChart data={data} options={options} /> */}
    </div>
  );
}

export default DashboardCard04;
