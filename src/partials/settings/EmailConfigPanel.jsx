import React, { useContext, useState, useEffect } from "react";

import Image from "../../images/user-avatar-80.png";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-hot-toast";
import axios from "axios";

function EmailConfigPanel() {
  const { userData } = useContext(AuthContext);
  const [email, setEmail] = useState(userData && userData.email);
  const [password, setPassword] = useState("");
  const [portNumber, setPortNumber] = useState("");
  const [sync, setSync] = useState(false);
  const CancleHandle = () => {
    setPassword("");
    setPortNumber("");
  };
  const SaveChanges = async () => {
    if (password != "" && portNumber != "") {
      await axios
        .post(
          `${import.meta.env.VITE_REACT_APP_SERVER_URL}/emailConfig/user/add`,
          {
            email: email,
            password: password,
            portNo: portNumber,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          toast.success("Configuration Added Successfully");
          setEmail();
          setPassword();
          setPortNumber();
        })
        .catch((err) => {
          toast.error("SomeThing Went Wrong");
        });
    } else {
      toast.warn("Please fill all the fields");
    }
  };

  // useEffect(() => {
  //   if (userData !== undefined) {
  //     setEmail(userData.email);
  //   } else {
  //     null;
  //   }
  // }, [userData]);

  return (
    <div className="grow">
      {/* Panel body */}
      <div className="p-6 space-y-6">
        <h2 className="text-2xl text-slate-800 font-bold mb-5">
          Email Configration
        </h2>
        {/* Picture */}
        {/* <section>
          <div className="flex items-center">
            <div className="mr-4">
              <img className="w-20 h-20 rounded-full" src={Image} width="80" height="80" alt="User upload" />
            </div>
            <button className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">Change</button>
          </div>
        </section> */}
        {/* Business Profile */}
        <section>
          {/* <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">Business Profile</h2> */}
          <div className="text-sm">
            Please configure your email .Enter a port number and password{" "}
          </div>
          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
            <div className="sm:w-1/3">
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Email
              </label>
              <input
                id="email"
                className="form-input w-full"
                type="email"
                value={email}
                disabled
                // onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="sm:w-1/3">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="business-id"
              >
                Password
              </label>
              <input
                id="business-id"
                className="form-input w-full"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="sm:w-1/3">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="location"
              >
                Port Number
              </label>
              <input
                id="port-number"
                className="form-input w-full"
                type="text"
                value={portNumber}
                onChange={(e) => setPortNumber(e.target.value)}
              />
            </div>
          </div>
        </section>
        {/* Email */}
        {/* <section>
          <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">Email</h2>
          <div className="text-sm">Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia.</div>
          <div className="flex flex-wrap mt-5">
            <div className="mr-2">
              <label className="sr-only" htmlFor="email">Business email</label>
              <input id="email" className="form-input" type="email" />
            </div>
            <button className="btn border-slate-200 hover:border-slate-300 shadow-sm text-indigo-500">Change</button>
          </div>
        </section> */}
        {/* Password */}
        {/* <section>
          <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">Password</h2>
          <div className="text-sm">You can set a permanent password if you don't want to use temporary login codes.</div>
          <div className="mt-5">
            <button className="btn border-slate-200 shadow-sm text-indigo-500">Set New Password</button>
          </div>
        </section> */}
        {/* Smart Sync */}
        {/* <section>
          <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">Smart Sync update for Mac</h2>
          <div className="text-sm">With this update, online-only files will no longer appear to take up hard drive space.</div>
          <div className="flex items-center mt-5">
            <div className="form-switch">
              <input type="checkbox" id="toggle" className="sr-only" checked={sync} onChange={() => setSync(!sync)} />
              <label className="bg-slate-400" htmlFor="toggle">
                <span className="bg-white shadow-sm" aria-hidden="true"></span>
                <span className="sr-only">Enable smart sync</span>
              </label>
            </div>
            <div className="text-sm text-slate-400 italic ml-2">{sync ? 'On' : 'Off'}</div>
          </div>
        </section> */}
      </div>
      {/* Panel footer */}
      <footer>
        <div className="flex flex-col px-6 py-5 border-t border-slate-200">
          <div className="flex self-end">
            <button
              className="btn border-slate-200 hover:border-slate-300 text-slate-600"
              onClick={CancleHandle}
            >
              Cancel
            </button>
            <button
              className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3"
              onClick={SaveChanges}
            >
              Save Changes
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default EmailConfigPanel;
