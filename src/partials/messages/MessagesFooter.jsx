import React, { useEffect, useState, useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-hot-toast";
import audioFile from "../../assets/notification.mp3";

function MessagesFooter({
  setMessageList,
  msgId,
  socket,
  messageList,
  setSenderId,
}) {
  const [currentMessage, setCurrentMessage] = useState("");
  const { userData } = useContext(AuthContext);

  const SendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        senderId: userData._id,
        recieverId: msgId,
        text: currentMessage,
        timestamp: new Date(Date.now()).toISOString(),
      };

      await socket.emit("sendMessage", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("getMessage", (data) => {
      console.log("Data", data);
      setMessageList((list) => [...list, data]);
      const audio = new Audio(audioFile);
      audio.play();
      alert("A Message Is Received");
      setSenderId(data.senderId);
    });

    console.log("Recieving", messageList);
  }, [socket]);

  return (
    <div className="sticky bottom-0">
      <div className="flex items-center justify-between bg-white border-t border-slate-200 px-4 sm:px-6 md:px-5 h-16">
        {/* Plus button */}
        <button className="shrink-0 text-slate-400 hover:text-slate-500 mr-3">
          <span className="sr-only">Add</span>
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12C23.98 5.38 18.62.02 12 0zm6 13h-5v5h-2v-5H6v-2h5V6h2v5h5v2z" />
          </svg>
        </button>
        {/* Message input */}
        <div className="grow mr-3">
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
          className="btn bg-indigo-500 hover:bg-indigo-600 text-white whitespace-nowrap"
          onClick={SendMessage}
        >
          Send -&gt;
        </button>
      </div>
    </div>
  );
}

export default MessagesFooter;
