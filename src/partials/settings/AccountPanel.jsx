import React, { useState } from "react";

import Image from "../../images/user-avatar-80.png";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { toast } from "react-hot-toast";

function AccountPanel() {
  const [sync, setSync] = useState(false);
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const { userData } = useContext(AuthContext);

  useEffect(() => {
    if (userData !== undefined) {
      axios
        .get(
          `${
            import.meta.env.VITE_REACT_APP_SERVER_URL
          }/user_management/getImage/${userData._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          response.data.image &&
            setImageURL(
              `${import.meta.env.VITE_REACT_APP_IMAGE_URL}/${
                response.data.image
              }`
            );
        })
        .catch((err) => {
          toast.error("Something Went Wrong");
        });
    } else {
      null;
    }
  }, [userData]);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_SERVER_URL
        }/user_management/uploadImage/${userData._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      setImageURL(
        `${import.meta.env.VITE_REACT_APP_IMAGE_URL}/${response.data.file}`
      );
    } catch (error) {
      console.log(error);
    }
  };
  const ChangeData = async () => {
    try {
      const response = await axios.put(
        `${
          import.meta.env.VITE_REACT_APP_SERVER_URL
        }/user_management/updateMe/${userData._id}`,
        {
          name,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      setName("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grow">
      {/* Panel body */}
      <div className="p-6 space-y-6">
        <h2 className="text-2xl text-slate-800 font-bold mb-5">My Account</h2>
        {/* Picture */}
        <section>
          {/* className="flex items-center" */}
          <div>
            <div className="mr-4">
              <img
                className="w-20 h-20 rounded-full"
                src={imageURL === null ? Image : imageURL}
                // src={Image}
                width="80"
                height="80"
                alt="Image"
              />
              <input
                className="mt-4"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <button
              className=" mt-4 btn-sm bg-indigo-500 hover:bg-indigo-600 text-white"
              onClick={handleSubmit}
            >
              Change
            </button>
          </div>
        </section>
        {/* Business Profile */}
        <section>
          {/* <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1"></h2> */}
          {/* <div className="text-sm">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.</div> */}
          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
            <div className="sm:w-1/3">
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Change Name
              </label>
              <input
                id="name"
                className="form-input w-full"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="sm:w-1/3">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="business-id"
              >
                Change Password
              </label>
              <input
                id="business-id"
                className="form-input w-full"
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            <button className="btn border-slate-200 hover:border-slate-300 text-slate-600">
              Cancel
            </button>
            <button
              className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3"
              onClick={ChangeData}
            >
              Save Changes
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AccountPanel;
