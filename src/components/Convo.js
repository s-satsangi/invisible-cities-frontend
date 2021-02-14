import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import ChatUI from "./ChatUI";

export default function Convo(props) {
  // state vars
  const [parentId, setParentId] = useState(0);
  const [messageObject, setMessageObject] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    localStorage.setItem(`hmm${props.group_id}`, JSON.stringify(props.members));
    displayMessages(props);
  }, [props.messages]);

  const displayMessages = (props) => {
    // let messages = JSON.parse(localStorage.getItem("messages"));
    //find relevant message object
    for (let i = 0; i < props.messages.length; i++) {
      // debugger;

      if (props.messages[i][0] === props.group_id) {
        console.log(
          "Ayoooo I found dat grooup! It's " +
            props.messages[i][0] +
            " in array and: " +
            props.group_id +
            " in da props!"
        );

        setMessageObject(props.messages[i]);
        // debugger;
        break;
      }
    }
    console.log("and mo: " + messageObject);
  };

  // const getMessage = () => {};

  const postMessage = (event, props) => {
    event.preventDefault();
    const data = {
      message: {
        message_body: newMessage,
        // user2: JSON.stringify(props.members),
        user_groups: props.group_id,
        parent_id: parentId,
      },
    };

    fetch("http://localhost:3000/create-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);

        if (json.status) throw json;
      })
      .then(displayMessages(props))
      .catch((err) => alert(`${err.message}`));
  };

  const returnMembers = () => {
    let ret_arr = props.members.map((member) => member.username);
    return ret_arr.join(", ");
  };

  return (
    <>
      <div>Squee</div>
      {messageObject[2]
        ? messageObject[2].map((msg) => msg.message_body)
        : null}
      <ChatUI messageObject={messageObject} />
      <form onSubmit={(event) => postMessage(event, props)}>
        <TextField
          multiline
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          placeholder={`Type a message to ${returnMembers()}`}
        />
        <TextField type="submit" />
      </form>
    </>
  );
}