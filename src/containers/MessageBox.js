// this component should take a user as a prop, and display
// the messages for that user where parent_id = 0
// when we click that message, maybe we pass all the necessary
// info to a conversation component?

import React, { useState, useEffect } from "react";
import Message from "../components/Message";

export default function MessageBox() {
  // set state vars here using useState
  const [messages, setmessages] = useState([]);
  const [user, setUser] = useState(2);

  // fetch the messages
  const setFetch = () => {
    // event.preventDefault();
    console.log("setFetch for getting messages for a user");
    fetch("http://localhost:3000/message", { method: "GET" })
      .then((res) => res.json())
      .catch((err) => console.log(err))
      .then((msgs) => {
        let localMsgArr = msgs.messages;
        setmessages(localMsgArr);
        // debugger;
      });
  };

  useEffect(() => {
    console.log("setFetch from useEffect");
    setFetch();
  }, []);

  //make messages readable
  const displayMessage = () => {
    console.log("Aaaaaayyyyy!");
    // debugger;
    console.log(messages);
    return messages?.map((msg, index) => (
      <Message key={index} content={msg.message_body} user={user} />
    ));
  };

  return <div>{displayMessage()}</div>;
}
