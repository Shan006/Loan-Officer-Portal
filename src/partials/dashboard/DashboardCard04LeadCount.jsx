import React, { useEffect, useState } from "react";
import BarChart01LeadCount from "../../charts/BarChart01LeadCount";
import axios from "axios";

// Import utilities
import { tailwindConfig } from "../../utils/Utils";

function DashboardCard04LeadCount() {
  const [loanOfficers, setLoanOfficers] = useState([]);
  const [leadCounts, setLeadCounts] = useState([]);
  const [isTrue, setIsTrue] = useState(false);
  const [currentMonth, setCurrentMonth] = useState();
  const [prevMonth, setPrevMonth] = useState();

  useEffect(() => {
    try {
      axios
        .get(
          `${
            import.meta.env.VITE_REACT_APP_SERVER_URL
          }/user_management/leadComparison`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(function (response) {
          console.log("LeadCount", response.data.leads);

          const today = new Date();
          const previousMonth = new Date();
          previousMonth.setMonth(today.getMonth() - 1);

          const currentMonthName = today.toLocaleString("default", {
            month: "long",
          });
          const previousMonthName = previousMonth.toLocaleString("default", {
            month: "long",
          });

          setCurrentMonth(currentMonthName);
          setPrevMonth(previousMonthName);

          response.data.leads.forEach((element) => {
            leadCounts.push(element.monthly_lead_count);
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

  const data = {
    labels: [currentMonth, prevMonth],
    // labels: [prevMonth, currentMonth],
    // labels: ["John", "Jane", "Mark", "Alice", "Bob"],
    datasets: [
      {
        label: "Lead Count",
        data: leadCounts,
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
          Lead Comparison
        </h2>
      </header>

      {isTrue ? (
        <>
          <BarChart01LeadCount data={data} options={options} />
        </>
      ) : null}
    </div>
  );
}

export default DashboardCard04LeadCount;
