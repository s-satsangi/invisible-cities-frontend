import React from "react";

export default function Message(props) {
  console.log("I am a message component and my props is " + props);
  return (
    <div>
      <div>{props.content}</div>
    </div>
  );
}
