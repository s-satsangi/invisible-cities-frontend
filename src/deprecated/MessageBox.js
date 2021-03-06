// this component should take a user as a prop, and display
// the messages for that user where parent_id = 0
// when we click that message, maybe we pass all the necessary
// info to a conversation component?

import React, { useState, useEffect } from "react";
import Message from "../components/Message";

export default function MessageBox(props) {
  // set state vars here using useState
  const [messages, setmessages] = useState([]);
  const [user, setUser] = useState(2);

  // fetch the messages
  const setFetch = () => {
    // event.preventDefault();
    console.log("setFetch for getting messages for a user");
    let user = {
      userId: props.userId,
    };
    fetch("http://localhost:3000/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      credentials: "include",
      body: JSON.stringify({ user }),
    })
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

  return (
    <>
      <h1> Your Messages </h1>
      <div>{displayMessage()}</div>
    </>
  );
}
