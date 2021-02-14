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
  console.log("I am a message component and my props is " + props);
  return (
    <div>
      <div>{props.content}</div>
    </div>
  );
}
