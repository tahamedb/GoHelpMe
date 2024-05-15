import { useContext, useEffect, useRef, useState } from "react";
import "./chat.scss";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { format } from "timeago.js";
import { SocketContext } from "../../context/SocketContext";
import { useParams } from "react-router-dom";
// import { SocketContext } from "../../context/SocketContext";
function Chat({ chats }) {
  const [chat, setChat] = useState({ messages: [] });
  const [Currentchat, setCurrentChat] = useState(null);
  const chatId = useParams().chatId;
  useEffect(() => {
    console.log(chatId === undefined);

    if (chatId) {
      // Check if the chatId from the URL is in the list of chats
      const foundChat = chats.find((chat) => chat.id === chatId);
      if (!foundChat) {
        // If no chat matches the chatId, handle it appropriately
        console.error("No chat found with the given ID.");
        // Redirect to an error page or home
      } else {
        setChat(foundChat);
      }
    } else {
      setChat(null);
    }
  }, [chatId, chats]);
  const messageEndRef = useRef();
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);
  // console.log("h");
  // console.log(chats);
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const text = formData.get("text");

    if (!text) return;
    try {
      const res = await apiRequest.post("/messages/" + chat.id, { text });
      setChat((prev) => ({
        ...prev,
        messages: Array.isArray(prev.messages)
          ? [...prev.messages, res.data]
          : [res.data],
      }));
      e.target.reset();
      console.log(chat.receiver.id);
      socket.emit("sendMessage", {
        receiverId: chat.receiver.id,
        data: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleOpenChat = async (id, receiver) => {
    try {
      console.log("dkhlt");
      const res = await apiRequest.get("/chats/" + id);
      setChat({ ...res.data, receiver });
      console.log("API Response:", res.data);
      console.log("Receiver Data:", receiver);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const read = async () => {
      try {
        await apiRequest.put("/chats/read/" + chat.id);
      } catch (err) {
        console.log(err);
      }
    };

    if (chat && socket) {
      socket.on("getMessage", (data) => {
        if (chat.id === data.chatId) {
          setChat((prev) => ({ ...prev, messages: [...prev.messages, data] }));
          read();
        }
      });
    }
    return () => {
      socket.off("getMessage");
    };
  }, [socket, chat]);

  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>
        {chats?.map((c) => (
          <div
            className="message"
            key={c.id}
            style={{
              backgroundColor:
                c.seenBy.includes(currentUser.id) || chat?.id === c.id
                  ? "white"
                  : "#fecd514e",
            }}
            onClick={() => handleOpenChat(c.id, c.receiver)}
          >
            <img src={c.receiver.avatar || "/noavatar.jpg"} alt="" />
            <span>{c.receiver.username}</span>
            <p>{c.lastMessage}</p>
          </div>
        ))}
      </div>
      {chat && chat.receiver && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img src={chat.receiver.avatar || "/noavatar.jpg"} alt="" />
              {chat.receiver.username}
            </div>
            <span className="close" onClick={() => setChat(null)}>
              X
            </span>
          </div>
          <div className="center">
            {chat.messages &&
              chat.messages.map((message) => (
                <div
                  className="chatMessage"
                  key={message.id}
                  style={{
                    alignSelf:
                      message.userId === currentUser.id
                        ? "flex-end"
                        : "flex-start",

                    textAlign:
                      message.userId === currentUser.id ? "right" : "left",
                  }}
                >
                  <p>{message.text}</p>
                  <span>{format(message.createdAt)}</span>
                </div>
              ))}
            <div ref={messageEndRef}></div>
          </div>
          <form onSubmit={handleSubmit} className="bottom">
            <textarea name="text"></textarea>
            <button>Send</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chat;
