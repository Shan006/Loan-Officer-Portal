import React, { useEffect, useState } from "react";
import DoughnutChart from "../../charts/DoughnutChart";
import axios from "axios";
import toast from "react-hot-toast";

// Import utilities
import { tailwindConfig } from "../../utils/Utils";

function DashboardCard06() {
  const [purchase, setPurchase] = useState(0);
  const [refinace, setRefinace] = useState(0);
  const [isTrue, setIsTrue] = useState(false);

  useEffect(() => {
    try {
      axios
        .get(
          `${
            import.meta.env.VITE_REACT_APP_SERVER_URL
          }/user_management/purchaseVrefinace`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(function (response) {
          console.log("Purchase Vs Refinace", response.data.leads);
          response.data.leads.forEach((element) => {
            element.loandetails.forEach((item) => {
              if (item.loan_type === "Purchase") {
                setPurchase(purchase + 1);
              } else if (item.loan_type === "Refinance") {
                setRefinace(refinace + 1);
              } else {
                null;
              }
            });
          });
          setIsTrue(true);
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

  const chartData = {
    labels: ["Purchase", "Refinance"],
    datasets: [
      {
        label: "Number Of Leads",
        data: [purchase, refinace],
        backgroundColor: [
          tailwindConfig().theme.colors.indigo[500],
          tailwindConfig().theme.colors.blue[400],
        ],
        hoverBackgroundColor: [
          tailwindConfig().theme.colors.indigo[600],
          tailwindConfig().theme.colors.blue[500],
        ],
        hoverBorderColor: tailwindConfig().theme.colors.white,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800 text-center">
          Purchase Vs Refinace
        </h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}

      {isTrue ? (
        <>
          <DoughnutChart data={chartData} width={389} height={260} />
        </>
      ) : null}
    </div>
  );
}

export default DashboardCard06;
