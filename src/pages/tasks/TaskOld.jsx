import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import Button from "@mui/material/Button";
import UserImage05 from "../../images/user-32-05.jpg";
import UserImage07 from "../../images/user-32-07.jpg";
import UserImage08 from "../../images/user-32-08.jpg";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function TasksList() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTask, setCompletedTask] = useState([]);
  const myRef = useRef(false);
  const Navigate = useNavigate();

  useEffect(() => {
    if (myRef.current) return;
    myRef.current = true;

    axios
      .get(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/task/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        const data = response?.data;
        const tasks = data?.tasks;
        if (tasks !== undefined) {
          const completedTasks = tasks.filter(
            (task) => task.status === "completed"
          );
          const pendingTasks = tasks.filter(
            (task) => task.status === "pending"
          );
          setCompletedTask(completedTasks);
          setPendingTasks(pendingTasks);
        } else {
          toast.error("No Task Found");
        }
      })
      .catch((error) => {
        console.log("error:", error);
        toast.error("Something Went Wrong");
      });
  }, []);

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
            {/* Smaller container */}
            <div className="max-w-3xl mx-auto">
              {/* Page header */}
              <div className="sm:flex sm:justify-between sm:items-center mb-8">
                {/* Left: Title */}
                <div className="mb-4 sm:mb-0">
                  <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
                    MSF LENDING Inc. Tasks ✨
                  </h1>
                </div>

                {/* Right: Actions */}
                <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-4">
                  {/* Avatars */}
                  <div className="flex shrink-0 -space-x-3 -ml-px">
                    {/* <a className="block" href="#0">
                      <img
                        className="rounded-full border-2 border-slate-100 box-content"
                        src={UserImage08}
                        width="32"
                        height="32"
                        alt="User 08"
                      />
                    </a>
                    <a className="block" href="#0">
                      <img
                        className="rounded-full border-2 border-slate-100 box-content"
                        src={UserImage07}
                        width="32"
                        height="32"
                        alt="User 07"
                      />
                    </a>
                    <a className="block" href="#0">
                      <img
                        className="rounded-full border-2 border-slate-100 box-content"
                        src={UserImage05}
                        width="32"
                        height="32"
                        alt="User 05"
                      />
                    </a> */}
                    {/* <button className="flex justify-center items-center w-9 h-9 rounded-full bg-white border border-slate-200 hover:border-slate-300 text-indigo-500 shadow-sm transition duration-150 ml-2">
                      <span className="sr-only">Add new user</span>
                      <svg className="w-3 h-3 fill-current" viewBox="0 0 12 12">
                        <path d="M11 5H7V1a1 1 0 0 0-2 0v4H1a1 1 0 0 0 0 2h4v4a1 1 0 0 0 2 0V7h4a1 1 0 0 0 0-2Z" />
                      </svg>
                    </button> */}
                  </div>

                  {/* Add taks button */}
                  {/* <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                    <svg
                      className="w-4 h-4 fill-current opacity-50 shrink-0"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                    </svg>
                    <span className="ml-2">Add Task</span>
                  </button> */}
                </div>
              </div>

              {/* Tasks */}
              <div className="space-y-6">
                {/* Group 2 */}
                <div>
                  <h2 className="grow font-semibold text-slate-800 truncate mb-4">
                    In Progress ✌️
                  </h2>
                  <div className="space-y-2">
                    {/* Task */}
                    {pendingTasks.length > 0 ? (
                      pendingTasks.map((task, index) => {
                        return (
                          <>
                            <div
                              key={index}
                              className="bg-white shadow-lg rounded-sm border border-slate-200 p-4"
                              draggable="true"
                            >
                              <div className="sm:flex sm:justify-between sm:items-start">
                                {/* Left side */}
                                <div className="grow mt-0.5 mb-3 sm:mb-0 space-y-3">
                                  <div className="flex items-center">
                                    {/* Checkbox button */}
                                    <label className="flex items-center">
                                      <input
                                        type="checkbox"
                                        className="peer focus:ring-0 focus-visible:ring w-5 h-5 bg-white border border-slate-200 text-indigo-500 rounded-full"
                                      />
                                      <span className="font-medium text-slate-800 peer-checked:line-through ml-2">
                                        {/* Managing teams (book) */}
                                        {task.title}
                                      </span>
                                    </label>
                                  </div>
                                  {/* Nested checkboxes */}
                                  <ul className="pl-12 space-y-3">
                                    <li>
                                      <label className="flex items-center">
                                        <input
                                          type="checkbox"
                                          className="peer focus:ring-0 focus-visible:ring w-5 h-5 bg-white border border-slate-200 text-indigo-500 rounded-full"
                                          defaultChecked
                                        />
                                        <span className="text-sm text-slate-800 peer-checked:line-through ml-3">
                                          {/* Finish the presentation */}
                                          {task.description}
                                        </span>
                                      </label>
                                    </li>
                                    <div className="mt-4">
                                      <li className="text-sm">
                                        <b>Assigned To </b> :{" "}
                                        {task.assigned_to.name}
                                      </li>
                                      <li className="text-sm">
                                        <b>Deadline </b> :{" "}
                                        {moment(task.deadline).format(
                                          "MMMM Do YYYY, h:mm:ss a"
                                        )}
                                      </li>
                                    </div>
                                  </ul>
                                </div>
                                {/* Right side */}
                                <div className="flex items-center justify-end space-x-3 mt-8">
                                  {/* Avatars */}
                                  <div className="flex shrink-0 -space-x-3 -ml-px">
                                    <a className="block" href="#0">
                                      <img
                                        className="rounded-full border-2 border-white box-content"
                                        src={UserImage05}
                                        width="24"
                                        height="24"
                                        alt="User 05"
                                      />
                                    </a>
                                  </div>
                                  <div className="text-sm text-slate-500">
                                    {index + 1}
                                  </div>
                                  <Button
                                    variant="contained"
                                    onClick={() => {
                                      axios
                                        .put(
                                          `${
                                            import.meta.env
                                              .VITE_REACT_APP_SERVER_URL
                                          }/task/update/user_status/${
                                            task._id
                                          }`,
                                          {
                                            status: "Completed",
                                          },
                                          {
                                            headers: {
                                              Authorization: `Bearer ${localStorage.getItem(
                                                "token"
                                              )}`,
                                            },
                                          }
                                        )
                                        .then((response) => {
                                          console.log(response.data);
                                          delete pendingTasks[index];
                                          setCompletedTask([
                                            ...completedTask,
                                            task,
                                          ]);
                                          toast.success(
                                            "Status Updated Successfully"
                                          );
                                        })
                                        .catch((error) => {
                                          toast.error("SomeThing Went Wrong!");
                                          console.log("error:", error);
                                        });
                                    }}
                                  >
                                    Mark Completed
                                  </Button>

                                  {/* Attach button */}
                                  {/* <button className="text-slate-400 hover:text-indigo-500">
                                  <svg
                                    className="w-4 h-4 shrink-0 fill-current mr-1.5"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M11 0c1.3 0 2.6.5 3.5 1.5 1 .9 1.5 2.2 1.5 3.5 0 1.3-.5 2.6-1.4 3.5l-1.2 1.2c-.2.2-.5.3-.7.3-.2 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l1.1-1.2c.6-.5.9-1.3.9-2.1s-.3-1.6-.9-2.2C12 1.7 10 1.7 8.9 2.8L7.7 4c-.4.4-1 .4-1.4 0-.4-.4-.4-1 0-1.4l1.2-1.1C8.4.5 9.7 0 11 0zM8.3 12c.4-.4 1-.5 1.4-.1.4.4.4 1 0 1.4l-1.2 1.2C7.6 15.5 6.3 16 5 16c-1.3 0-2.6-.5-3.5-1.5C.5 13.6 0 12.3 0 11c0-1.3.5-2.6 1.5-3.5l1.1-1.2c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4L2.9 8.9c-.6.5-.9 1.3-.9 2.1s.3 1.6.9 2.2c1.1 1.1 3.1 1.1 4.2 0L8.3 12zm1.1-6.8c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-4.2 4.2c-.2.2-.5.3-.7.3-.2 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l4.2-4.2z" />
                                  </svg>
                                </button> */}
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })
                    ) : (
                      <h1>
                        <b>NO PENDING TASKS</b>
                      </h1>
                    )}
                  </div>
                </div>

                {/* Group 3 */}
                <div>
                  <h2 className="grow font-semibold text-slate-800 truncate mb-4">
                    Completed 🎉
                  </h2>
                  <div className="space-y-2">
                    {completedTask.length > 0 ? (
                      completedTask.map((items, index) => {
                        return (
                          <>
                            {/* Task */}
                            <div
                              key={index}
                              className="bg-white shadow-lg rounded-sm border border-slate-200 p-4 opacity-60"
                              draggable="true"
                            >
                              <div className="sm:flex sm:justify-between sm:items-start">
                                {/* Left side */}
                                <div className="grow mt-0.5 mb-3 sm:mb-0 space-y-3">
                                  <div className="flex items-center">
                                    {/* Drag button */}
                                    {/* <button className="cursor-move mr-2">
                                    <span className="sr-only">Drag</span>
                                    <svg
                                      className="w-3 h-3 fill-slate-500"
                                      viexbox="0 0 12 12"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M0 1h12v2H0V1Zm0 4h12v2H0V5Zm0 4h12v2H0V9Z"
                                        fill="#CBD5E1"
                                        fillRule="evenodd"
                                      />
                                    </svg>
                                  </button> */}
                                    {/* Checkbox button */}
                                    <label className="flex items-center">
                                      <input
                                        type="checkbox"
                                        className="peer focus:ring-0 focus-visible:ring w-5 h-5 bg-white border border-slate-200 text-indigo-500 rounded-full"
                                        defaultChecked
                                      />
                                      <span className="font-medium text-slate-800 peer-checked:line-through ml-2">
                                        {/* Design new diagrams */}
                                        {items.title}
                                      </span>
                                    </label>
                                  </div>
                                  <div>
                                    <b>Completed By :</b>{" "}
                                    {items.assigned_to.name}
                                  </div>
                                </div>
                                {/* Right side */}
                                <div className="flex items-center justify-end space-x-3">
                                  {/* Avatars */}
                                  <div className="flex shrink-0 -space-x-3 -ml-px">
                                    <a className="block" href="#0">
                                      <img
                                        className="rounded-full border-2 border-white box-content"
                                        src={UserImage08}
                                        width="24"
                                        height="24"
                                        alt="User 08"
                                      />
                                    </a>
                                  </div>
                                  {/* To-do info */}
                                  <div className="flex items-center text-slate-400 ml-3">
                                    <svg
                                      className="w-4 h-4 shrink-0 fill-current mr-1.5"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M6.974 14c-.3 0-.7-.2-.9-.5l-2.2-3.7-2.1 2.8c-.3.4-1 .5-1.4.2-.4-.3-.5-1-.2-1.4l3-4c.2-.3.5-.4.9-.4.3 0 .6.2.8.5l2 3.3 3.3-8.1c0-.4.4-.7.8-.7s.8.2.9.6l4 8c.2.5 0 1.1-.4 1.3-.5.2-1.1 0-1.3-.4l-3-6-3.2 7.9c-.2.4-.6.6-1 .6z" />
                                    </svg>
                                    <div className="text-sm text-slate-500">
                                      {index + 1}
                                    </div>
                                  </div>
                                  {/* Attach button */}
                                  {/* <button className="text-slate-400 hover:text-indigo-500">
                                  <svg
                                    className="w-4 h-4 shrink-0 fill-current mr-1.5"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M11 0c1.3 0 2.6.5 3.5 1.5 1 .9 1.5 2.2 1.5 3.5 0 1.3-.5 2.6-1.4 3.5l-1.2 1.2c-.2.2-.5.3-.7.3-.2 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l1.1-1.2c.6-.5.9-1.3.9-2.1s-.3-1.6-.9-2.2C12 1.7 10 1.7 8.9 2.8L7.7 4c-.4.4-1 .4-1.4 0-.4-.4-.4-1 0-1.4l1.2-1.1C8.4.5 9.7 0 11 0zM8.3 12c.4-.4 1-.5 1.4-.1.4.4.4 1 0 1.4l-1.2 1.2C7.6 15.5 6.3 16 5 16c-1.3 0-2.6-.5-3.5-1.5C.5 13.6 0 12.3 0 11c0-1.3.5-2.6 1.5-3.5l1.1-1.2c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4L2.9 8.9c-.6.5-.9 1.3-.9 2.1s.3 1.6.9 2.2c1.1 1.1 3.1 1.1 4.2 0L8.3 12zm1.1-6.8c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-4.2 4.2c-.2.2-.5.3-.7.3-.2 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l4.2-4.2z" />
                                  </svg>
                                </button> */}
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })
                    ) : (
                      <h1>
                        <b>NO COMPLETED TASKS</b>
                      </h1>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default TasksList;
