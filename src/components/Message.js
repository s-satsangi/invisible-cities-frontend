import React from "react";

// -------------------------------------------
// I guess this is what I'm using for
// the message object
// From YourConvos.js, it will expect:
// -message_body
// -user_groups
// -recipient_ids & sender_id
// ... but what if I'm coming here from
// my friends?  I need to check localStorage

// -------------------------------------------
export default function Message(props) {
  console.log("I am a message component and my props is " + props.content);
  // debugger;
  return (
    <div>
      <div>
        On {props.content.created_at.split("T")[0]} at
        {props.content.created_at.split("T")[1].split(".")[0]},{" "}
        {props.author[0].username} said: {props.content.message_body}
      </div>
    </div>
  );
}
