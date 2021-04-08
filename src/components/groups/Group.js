import React, { useState, useEffect } from "react";
import Convo from "../messages/Convo";
import CreateGroup from "./CreateGroup";

export default function Group(props) {
  const [seeConvo, setSeeConvo] = useState("false");
  const [names, setNames] = useState(
    props.members.map((member) => [member.id, member.username])
  );
  const [friendsMinusNames, setFriendsMinusNames] = useState(
    JSON.parse(localStorage.getItem("friends"))
      .filter((friend) => !names.map((name) => name[0]).includes(friend.id))
      .map((output) => [output.id, output.username])
  );
  const [message, setMessage] = useState(
    JSON.parse(localStorage.getItem("messages"))
  );

  const renderMembers = () => {
    let memberString = props.members.map((member) => member.username);
    return memberString.join(", ");
  };

  const toggleConvo = (props) => {
    seeConvo === "false" ? setSeeConvo("true") : setSeeConvo("false");
  };

  const delConvo = () => {
    console.log("ahyup");
    fetch("http://localhost:3000/delgroup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      credentials: "include",
      body: JSON.stringify({
        user_group: [[0], props.group_id],
      }),
    })
      .then((resp) => {
        if (resp.status === 401) throw resp;
        return resp.json();
      })
      .then((resp) => {
        console.log("Del group server response: ");
        console.log(resp);
      });
    return;
  };

  useEffect(() => {
    setMessage(JSON.parse(localStorage.getItem("messages")));
    setNames(props.members.map((member) => [member.id, member.username]));
    const interval = setInterval(() => {
      setMessage(JSON.parse(localStorage.getItem("messages")));
      setNames(props.members.map((member) => [member.id, member.username]));
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  // const debuggo = () => {
  //   debugger;
  // };

  return (
    <div id={props.group_id}>
      {seeConvo === "true" && (
        <Convo
          group_id={props.group_id}
          members={props.members}
          messages={JSON.parse(localStorage.getItem("messages"))}
        />
      )}
      <button onClick={toggleConvo}>
        Click here for your conversation with: {renderMembers()}
      </button>
      {/* <button onClick={debuggo}>Click here to debug</button> */}
      <br />
      Add a friend to this chat
      <CreateGroup
        names={friendsMinusNames}
        grouptype={"add"}
        group_id={props.group_id}
      />
      Boot a friend from this chat
      <CreateGroup
        names={names.filter(
          (name) => name[0] !== JSON.parse(localStorage.getItem("userId"))
        )}
        grouptype={"boot"}
        group_id={props.group_id}
      />
      <br />
      <button onClick={delConvo}>DELETE THIS GROUP</button>
    </div>
  );
}
