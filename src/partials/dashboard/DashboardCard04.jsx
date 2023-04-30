import React, { useEffect, useState } from "react";
import BarChart from "../../charts/BarChart01";
import axios from "axios";
import { toast } from "react-hot-toast";

// Import utilities
import { tailwindConfig } from "../../utils/Utils";

function DashboardCard04() {
  const [loanOfficers, setLoanOfficers] = useState([]);
  const [loanValues, setLoanValues] = useState([]);
  const [currentMonth, setCurrentMonth] = useState();
  const [prevMonth, setPrevMonth] = useState();
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
          console.log("Loan Value Comparison", response.data.leads);

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
            loanValues.push(element.monthly_total_loan_value);
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
    // labels: ["March", "April"],
    datasets: [
      {
        label: "Loan Value in $",
        data: loanValues,
        // data: [40000, 62000, 42000, 71000, 49000],
        backgroundColor: tailwindConfig().theme.colors.indigo[400],
        borderColor: tailwindConfig().theme.colors.indigo[400],
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
      {isTrue ? (
        <>
          <BarChart data={data} options={options} />
        </>
      ) : null}
    </div>
  );
}

export default DashboardCard04;
