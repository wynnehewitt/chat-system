import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";
import { db } from "../firebase";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(UserContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data() || {});
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="chats overflow-y-scroll h-60 pt-3 pl-3 pr-3 pb-3 mb-5">
      <h3 className="text-xl mb-3">My Chats</h3>
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <div
          className="userChat pt-3"
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}>
          <div className="userChatInfo">
            <div className="flex mb-3">
            <div className="flex-none mr-3">
            <AccountCircleIcon></AccountCircleIcon>
            </div>
            <div className="flex-none">
            <span>{chat[1].userInfo.name}</span>
            <p className="text-gray-400 text-xs">{chat[1].lastMessage?.text}</p>
            </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;