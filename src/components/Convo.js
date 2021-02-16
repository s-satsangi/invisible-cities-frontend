import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import Message from "./Message";

export default function Convo(props) {
  // state vars
  const [parentId, setParentId] = useState(0);
  const [messageObject, setMessageObject] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [message, setMessage] = useState(
    JSON.parse(localStorage.getItem("messages"))
  );

  useEffect(() => {
    displayMessages(props);
  }, [props]);

  const displayMessages = (props) => {
    //find relevant message object

    for (let i = 0; i < props.messages.length; i++) {
      // debugger;

      if (props.messages[i][0] === props.group_id) {
        console.log(
          "Ayoooo I found dat grooup! It's " +
            message[i][0] +
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
    setNewMessage("");
  };

  const returnMembers = () => {
    let ret_arr = props.members.map((member) => member.username);
    return ret_arr.join(", ");
  };

  const makeMessages = (messageObject) => {
    if (messageObject[2]) {
      let author = "";
      return messageObject[2].map((msg) => {
        author = props.members.filter((mem) => mem.id === msg.creator_id);
        return <Message key={msg.id} content={msg} author={author} />;
      });
    } else {
      return null;
    }
  };

  const debuggo = () => {
    debugger;
  };

  return (
    <>
      <button onClick={debuggo}>DEBUG</button>
      {makeMessages(messageObject)}
      {/* <ChatUI messageObject={messageObject} /> */}
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
