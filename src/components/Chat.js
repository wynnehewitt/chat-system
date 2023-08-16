import React, {useState, useEffect, useRef, useContext, createContext} from 'react'
import {db} from "../firebase"
import { query, collection, doc, onSnapshot, orderBy, QuerySnapshot} from 'firebase/firestore';
import Message from './Message';
import SendMessage from './SendMessage';


const style = {
    main: 'flex flex-col p-[10px]'
}
function Chat() {
    const [messages, setMessages] = useState([]);
    const scroll = useRef();


    useEffect(() => {
        const q = query(collection(db, 'messages'), orderBy('timestamp'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let messages = [];
            querySnapshot.forEach((doc) => {
                messages.push({...doc.data(), id: doc.id});
            });
            console.log('Messages: ', messages);
            
            setMessages(messages);
            
        });
        return () => unsubscribe();
    }, []);

  return (
    <>
        <main className={style.main}>
            {messages && messages.map((msg) => (
                <Message key = {messages.id} message = {msg}/>
                
            ))}
        </main>
        <SendMessage/>
        <span ref = {scroll}></span>
        </>
    
  )
}

export default Chat