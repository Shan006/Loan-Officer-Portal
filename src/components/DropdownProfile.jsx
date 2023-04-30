import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Transition from "../utils/Transition";
import { toast } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import UserAvatar from "../images/user-avatar-32.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function DropdownProfile({ align }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);
  const { userData } = useContext(AuthContext);
  const Navigate = useNavigate();

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const SignOut = (e) => {
    e.preventDefault();
    try {
      axios
        .get(
          `${import.meta.env.VITE_REACT_APP_SERVER_URL}/user_management/logout`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          localStorage.removeItem("token");
          Navigate("/signin/unauthorized");
          toast.success(
            "Session Expired Please Join Again Through Refferal Link"
          );
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong!");
        });
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="inline-flex justify-center items-center group"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <img
          className="w-8 h-8 rounded-full"
          src={
            userData
              ? `${import.meta.env.VITE_REACT_APP_IMAGE_URL}/${userData.image}`
              : UserAvatar
          }
          width="32"
          height="32"
          alt="User"
        />
        <div className="flex items-center truncate">
          <span className="truncate ml-2 text-sm font-medium group-hover:text-slate-800">
            {/* Acme Inc. */}
            {userData ? userData.name.toUpperCase() : null}
          </span>
          <svg
            className="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400"
            viewBox="0 0 12 12"
          >
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div>
      </button>

      <Transition
        className={`origin-top-right z-10 absolute top-full min-w-44 bg-white border border-slate-200 py-1.5 rounded shadow-lg overflow-hidden mt-1 ${
          align === "right" ? "right-0" : "left-0"
        }`}
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-slate-200">
            <div className="font-medium text-slate-800">
              {userData ? userData.name.toUpperCase() : null}
            </div>
            <div className="text-xs text-slate-500">
              {userData ? userData.role.toUpperCase() : null}
            </div>
          </div>
          <ul>
            <li>
              <Link
                className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                to="/settings/account"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Settings
              </Link>
            </li>
            <li onClick={SignOut}>
              <Link
                className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                to="/signin"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Sign Out
              </Link>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  );
}

export default DropdownProfile;
