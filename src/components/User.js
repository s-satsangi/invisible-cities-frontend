import React from "react";

export default function User(props) {
  console.log("User");
  // if the user isn't a friend, we should have
  // a button that says add friend here.
  // maybe that happens in the AllUsers container?
  // yeah, maybe we start by building the friendlist?
  return <div>{props.user} howdy</div>;
}
