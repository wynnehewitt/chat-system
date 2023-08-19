import React, { useContext, useState } from "react";
import {collection, query, where, getDocs, setDoc, doc, updateDoc, serverTimestamp, getDoc} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("name", "==", username)
    );

    console.log(q);

    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.size === 0) {
        setErr(true);
      } else {
          setErr(false); // Clear the error if user data is found
      }
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
      console.log(err);
    }
  };



  const handleKey = (e) => {
    if(e.code === "Enter"){
      handleSearch();
      console.log("Searching...")
    }
  };


  const handleSelect = async () => {
    // check if the private chat exists
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      const currentUserData = await getDoc(doc(db, "users", currentUser.uid));
      const currentUserName = currentUserData.data()?.name;

      if (!res.exists()) {
        // add new data to the chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        // update information of the current user
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            name: user.name,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        // update information for the user that is being sent the messages
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            name: currentUserName,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      console.log(err)
    }

    setUser(null);
    setUsername("")
  };
  return (
    <div className="search">
      <div className="searchForm">
        <input className="inputBox mb-3 pl-3 "
          type="text"
          placeholder="Search a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>User not found!</span>}
      {user && (
        <div className="userChatSearch mt-3" onClick={handleSelect}>
          <div className="flex searchUserInfo">
          <div className="flex-none mr-3 mb-3">
            <AccountCircleIcon></AccountCircleIcon>
          </div>
            <div className="flex-none">
              <span>{user.name}</span>
            </div>
  
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;