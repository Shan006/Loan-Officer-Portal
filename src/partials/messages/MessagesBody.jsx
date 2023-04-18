import React, { useEffect, useState, useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import User01 from "../../images/user-40-11.jpg";
import User02 from "../../images/user-40-12.jpg";
import ChatImage from "../../images/chat-image.jpg";
import uuid from "react-uuid";
import axios from "axios";
import { toast } from "react-hot-toast";
import moment from "moment";

function MessagesBody({ messageList, msgId, setMessageList }) {
  const { userData } = useContext(AuthContext);

  useEffect(() => {
    if (msgId !== undefined) {
      axios
        .post(
          `${import.meta.env.VITE_REACT_APP_SERVER_URL}/chat/getMessages`,
          {
            senderId: userData._id,
            receiverId: msgId,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          if (res.data.chatMessages.length === 0) {
            setMessageList([]);
          } else {
            setMessageList(res.data.chatMessages[0]?.messages);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something Went Wrong");
        });
    } else {
      null;
    }
  }, [msgId]);

  return (
    <div className="grow px-4 sm:px-6 md:px-5 py-6">
      {/* Chat msg */}
      {messageList &&
        messageList.map((messageContent) => {
          return (
            <>
              <div className="flex items-start mb-4 last:mb-0" key={uuid()}>
                <img
                  className="rounded-full mr-4"
                  src={User01}
                  width="40"
                  height="40"
                  alt="User 01"
                />
                <div>
                  <div
                    className={
                      userData._id === messageContent.senderId
                        ? "text-sm bg-indigo-500 text-white p-3 rounded-lg rounded-tl-none border border-transparent shadow-md mb-1"
                        : "text-sm bg-white text-slate-800 p-3 rounded-lg rounded-tl-none border border-slate-200 shadow-md mb-1"
                    }
                  >
                    {messageContent.text}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-slate-500 font-medium">
                      {moment(messageContent.timestamp).format("hh:mm: a")}
                      {/* {messageContent.timestamp} */}
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}

      {/* Useless */}
      {/* Chat msg */}
      {/* <div className="flex items-start mb-4 last:mb-0">
        <img
          className="rounded-full mr-4"
          src={User02}
          width="40"
          height="40"
          alt="User 02"
        />
        <div>
          <div className="text-sm bg-indigo-500 text-white p-3 rounded-lg rounded-tl-none border border-transparent shadow-md mb-1">
            Hey Dominik Lamakani 👋
            <br />
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est 🙌
          </div> */}
      {/* <div className="flex items-center justify-between">
            <div className="text-xs text-slate-500 font-medium">2:40 PM</div>
            <svg
              className="w-5 h-3 shrink-0 fill-current text-emerald-500"
              viewBox="0 0 20 12"
            >
              <path d="M10.402 6.988l1.586 1.586L18.28 2.28a1 1 0 011.414 1.414l-7 7a1 1 0 01-1.414 0L8.988 8.402l-2.293 2.293a1 1 0 01-1.414 0l-3-3A1 1 0 013.695 6.28l2.293 2.293L12.28 2.28a1 1 0 011.414 1.414l-3.293 3.293z" />
            </svg>
          </div> */}
      {/* </div> */}
      {/* // </div> */}
      {/* Chat msg */}
      {/* <div className="flex items-start mb-4 last:mb-0">
        <img
          className="rounded-full mr-4"
          src={User01}
          width="40"
          height="40"
          alt="User 01"
        />
        <div>
          <div className="flex items-center">
            <img
              className="rounded-lg shadow-md mb-1"
              src={ChatImage}
              width="240"
              height="180"
              alt="Chat"
            />
            <button className="p-1.5 rounded-full border border-slate-200 ml-4 hover:bg-white transition duration-150">
              <span className="sr-only">Download</span>
              <svg
                className="w-4 h-4 shrink-0 fill-current text-slate-400"
                viewBox="0 0 16 16"
              >
                <path d="M15 15H1a1 1 0 01-1-1V2a1 1 0 011-1h4v2H2v10h12V3h-3V1h4a1 1 0 011 1v12a1 1 0 01-1 1zM9 7h3l-4 4-4-4h3V1h2v6z" />
              </svg>
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-xs text-slate-500 font-medium">2:48 PM</div>
          </div>
        </div>
      </div> */}
      {/* Chat msg */}
      {/* <div className="flex items-start mb-4 last:mb-0">
        <img
          className="rounded-full mr-4"
          src={User01}
          width="40"
          height="40"
          alt="User 01"
        />
        <div>
          <div className="text-sm bg-white text-slate-800 p-3 rounded-lg rounded-tl-none border border-slate-200 shadow-md mb-1">
            What do you think? Duis aute irure dolor in reprehenderit 🔥
          </div>
          <div className="flex items-center justify-between">
            <div className="text-xs text-slate-500 font-medium">2:48 PM</div>
          </div>
        </div>
      </div> */}
      {/* Chat msg */}
      {/* <div className="flex items-start mb-4 last:mb-0">
        <img
          className="rounded-full mr-4"
          src={User02}
          width="40"
          height="40"
          alt="User 02"
        />
        <div>
          <div className="text-sm bg-indigo-500 text-white p-3 rounded-lg rounded-tl-none border border-transparent shadow-md mb-1">
            Sed euismod nisi porta lorem mollis. Tellus elementum sagittis vitae
            et leo duis. Viverra justo nec ultrices dui.
            <br />
            Sed lectus vestibulum mattis ullamcorper velit sed. Ut sem nulla
            pharetra diam sit amet 🎁
          </div>
          <div className="flex items-center justify-between">
            <div className="text-xs text-slate-500 font-medium">2:55 PM</div>
            <svg
              className="w-3 h-3 shrink-0 fill-current text-slate-400"
              viewBox="0 0 12 12"
            >
              <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
            </svg>
          </div>
        </div>
      </div> */}
      {/* Date separator */}
      {/* <div className="flex justify-center">
        <div className="inline-flex items-center justify-center text-xs font-medium px-2.5 py-1 bg-white border border-slate-200 rounded-full my-5">
          Tuesday, 20 January
        </div>
      </div> */}
      {/* Chat msg */}
      {/* <div className="flex items-start mb-4 last:mb-0">
        <img
          className="rounded-full mr-4"
          src={User02}
          width="40"
          height="40"
          alt="User 02"
        />
        <div>
          <div className="text-sm bg-indigo-500 text-white p-3 rounded-lg rounded-tl-none border border-transparent shadow-md mb-1">
            Can you join{" "}
            <a className="font-medium" href="#0">
              @dominik
            </a>
            ?{" "}
            <a className="underline" href="#0">
              https://meet.google.com/haz-r3gt-idj
            </a>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-xs text-slate-500 font-medium">10:15 AM</div>
            <svg
              className="w-3 h-3 shrink-0 fill-current text-slate-400"
              viewBox="0 0 12 12"
            >
              <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
            </svg>
          </div>
        </div>
      </div> */}
      {/* Chat msg */}
      {/* <div className="flex items-start mb-4 last:mb-0">
        <img className="rounded-full mr-4" src={User01} width="40" height="40" alt="User 01" />
        <div>
          <div className="text-sm bg-white text-slate-800 p-3 rounded-lg rounded-tl-none border border-slate-200 shadow-md mb-1">
            <svg className="fill-current text-slate-400" viewBox="0 0 15 3" width="15" height="3">
              <circle cx="1.5" cy="1.5" r="1.5">
                <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.1" />
              </circle>
              <circle cx="7.5" cy="1.5" r="1.5">
                <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.2" />
              </circle>
              <circle cx="13.5" cy="1.5" r="1.5">
                <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.3" />
              </circle>
            </svg>
          </div>
        </div>
      </div> */}
      {/* // Footer */}
      {/* <div className="sticky bottom-0 mt-5 mb-0">
        <div className="flex items-center justify-between bg-white border-t border-slate-200 px-4 sm:px-6 md:px-5 h-16"> */}
      {/* Plus button */}
      {/* <button className="shrink-0 text-slate-400 hover:text-slate-500 mr-3">
            <span className="sr-only">Add</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12C23.98 5.38 18.62.02 12 0zm6 13h-5v5h-2v-5H6v-2h5V6h2v5h5v2z" />
            </svg>
          </button> */}
      {/* Message input */}
      {/* <form className="grow flex"> */}
      {/* <div className="grow mr-3">
            <label htmlFor="message-input" className="sr-only">
              Type a message
            </label>
            <input
              id="message-input"
              className="form-input w-full bg-slate-100 border-transparent focus:bg-white focus:border-slate-300"
              type="text"
              placeholder="Aa"
              value={currentMessage}
              onChange={(event) => {
                setCurrentMessage(event.target.value);
              }}
            />
          </div>
          <button
            type="submit"
            className="btn bg-indigo-500 hover:bg-indigo-600 text-white whitespace-nowrap"
            onClick={SendMessage}
          >
            Send -&gt;
          </button> */}
      {/* </form> */}
      {/* </div>
      </div> */}
    </div>
  );
}

export default MessagesBody;
