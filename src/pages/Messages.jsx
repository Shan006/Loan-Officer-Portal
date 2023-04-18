import React, { useState, useEffect, useRef } from "react";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import MessagesSidebar from "../partials/messages/MessagesSidebar";
import MessagesHeader from "../partials/messages/MessagesHeader";
import MessagesBody from "../partials/messages/MessagesBody";
import MessagesFooter from "../partials/messages/MessagesFooter";

function Messages({ socket, activeUsers, notifyCount }) {
  const contentArea = useRef(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [msgSidebarOpen, setMsgSidebarOpen] = useState(true);
  const [msgUserId, setMsgUserId] = useState();
  const [messageList, setMessageList] = useState([]);
  const [username, setUsername] = useState();
  const [openChat, setOpenChat] = useState(false);

  useEffect(() => {
    contentArea.current.scrollTop = 99999999;
  }, [msgSidebarOpen]); // automatically scroll the chat and make the most recent message visible

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div
        className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden"
        ref={contentArea}
      >
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="relative flex">
            {/* Messages sidebar */}
            <MessagesSidebar
              msgSidebarOpen={msgSidebarOpen}
              setMsgSidebarOpen={setMsgSidebarOpen}
              id={setMsgUserId}
              user={setUsername}
              chat={setOpenChat}
              notifyCount={notifyCount}
              activeUsers={activeUsers}
            />

            {/* Messages body */}
            <div
              className={`grow flex flex-col md:translate-x-0 transition-transform duration-300 ease-in-out ${
                msgSidebarOpen ? "translate-x-1/3" : "translate-x-0"
              }`}
            >
              <MessagesHeader
                msgSidebarOpen={msgSidebarOpen}
                setMsgSidebarOpen={setMsgSidebarOpen}
              />
              {openChat ? (
                <>
                  <MessagesBody
                    msgId={msgUserId}
                    messageList={messageList}
                    setMessageList={setMessageList}
                  />
                  <MessagesFooter
                    setMessageList={setMessageList}
                    msgId={msgUserId}
                    username={username}
                    socket={socket}
                    messageList={messageList}
                  />
                </>
              ) : (
                <h1 className="m-5">Start Conversation</h1>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Messages;
