import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { db } from "../firebase";
import Message from "./Message";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(UserContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatID), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatID]);

  console.log(messages)

  return (
    <div className="messages">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;