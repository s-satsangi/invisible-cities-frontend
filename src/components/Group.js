import React, { useState } from "react";
import Convo from "./Convo";
export default function Group(props) {
  const [seeConvo, setSeeConvo] = useState("false");

  const renderMembers = () => {
    let memberString = props.members.map((member) => member.username);
    return memberString.join(", ");
  };

  const toggleConvo = (props) => {
    seeConvo === "false" ? setSeeConvo("true") : setSeeConvo("false");
  };

  const openConvo = () => {
    console.log("ahyup");
    // document.getElementById(props.group_id).append({<Convo />});
    return;
  };

  return (
    <div id={props.group_id}>
      <button onClick={toggleConvo}>
        Click here for your conversation with: {renderMembers()}
      </button>
      {seeConvo === "true" && (
        <Convo
          group_id={props.group_id}
          members={props.members}
          messages={JSON.parse(localStorage.getItem("messages"))}
        />
      )}
    </div>
  );
}
