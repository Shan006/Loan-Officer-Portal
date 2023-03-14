import React, { useState, useEffect } from "react";
import Customer from "./CustomersTableItem";
import { toast } from "react-hot-toast";
import Image01 from "../../images/user-40-01.jpg";
import Image02 from "../../images/user-40-02.jpg";
import Image03 from "../../images/user-40-03.jpg";
import Image04 from "../../images/user-40-04.jpg";
import Image05 from "../../images/user-40-05.jpg";
import Image06 from "../../images/user-40-06.jpg";
import Image07 from "../../images/user-40-07.jpg";
import Image08 from "../../images/user-40-08.jpg";
import Image09 from "../../images/user-40-09.jpg";
import Image10 from "../../images/user-40-10.jpg";

function CustomersTable({ Leads }) {
  const customers = [
    {
      id: "0",
      image: Image01,
      name: "Patricia Semklo",
      email: "patricia.semklo@app.com",
      lastOrder: "#123567",
      refunds: "-",
      fav: true,
    },
    {
      id: "1",
      image: Image02,
      name: "Dominik Lamakani",
      email: "dominik.lamakani@gmail.com",
      lastOrder: "#779912",
      refunds: "4",
      fav: false,
    },
    {
      id: "2",
      image: Image03,
      name: "Ivan Mesaros",
      email: "imivanmes@gmail.com",
      lastOrder: "#889924",
      refunds: "1",
      fav: true,
    },
    {
      id: "3",
      image: Image04,
      name: "Maria Martinez",
      email: "martinezhome@gmail.com",
      lastOrder: "#897726",
      refunds: "2",
      fav: false,
    },
    {
      id: "4",
      image: Image05,
      name: "Vicky Jung",
      email: "itsvicky@contact.com",
      lastOrder: "#123567",
      refunds: "-",
      fav: true,
    },
    {
      id: "5",
      image: Image06,
      name: "Tisho Yanchev",
      email: "tisho.y@kurlytech.com",
      lastOrder: "#896644",
      refunds: "1",
      fav: true,
    },
    {
      id: "6",
      image: Image07,
      name: "James Cameron",
      email: "james.ceo@james.tech",
      lastOrder: "#136988",
      refunds: "2",
      fav: true,
    },
    {
      id: "7",
      image: Image08,
      name: "Haruki Masuno",
      email: "haruki@supermail.jp",
      lastOrder: "#442206",
      refunds: "6",
      fav: false,
    },
    {
      id: "8",
      image: Image09,
      name: "Joe Huang",
      email: "joehuang@hotmail.com",
      lastOrder: "#764321",
      refunds: "-",
      fav: true,
    },
    {
      id: "9",
      image: Image10,
      name: "Carolyn McNeail",
      email: "carolynlove@gmail.com",
      lastOrder: "#908764",
      refunds: "2",
      fav: false,
    },
  ];

  const [selectAll, setSelectAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [list, setList] = useState([]);

  // useEffect(() => {
  //   setList(customers);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setIsCheck(list.map((li) => li.id));
    if (selectAll) {
      setIsCheck([]);
    }
  };

  const handleClick = (e) => {
    const { id, checked } = e.target;
    setSelectAll(false);
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  // useEffect(() => {
  //   selectedItems(isCheck);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isCheck]);

  return (
    <div className="bg-white shadow-lg rounded-sm border border-slate-200 relative">
      <header className="px-5 py-4">
        <h2 className="font-semibold text-slate-800">
          All Leads
          {/* <span className="text-slate-400 font-medium">248</span> */}
        </h2>
      </header>
      <div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t border-b border-slate-200">
              <tr>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">FullName</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Email</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">MobilePhone</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold">Status</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-200">
              {Leads &&
                Leads.lead.map((customer, index) => {
                  return customer.leads.map((item) => {
                    return (
                      <>
                        <Customer
                          key={index}
                          id={customer._id}
                          image={Image08}
                          name={item.firstname + " " + item.lastname}
                          email={item.email}
                          phone={item.phone}
                          status="New Lead"
                        />
                      </>
                    );
                  });
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CustomersTable;
