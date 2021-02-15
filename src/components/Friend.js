import React from "react";

export default function Friend(props) {
  const data = {
    follow: {
      user2: props.friend.id,
    },
  };

  const reply_pos = () => {
    fetch("http://localhost:3000/reply_pos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((res) => res.json())
      .then(console.log);
  };

  const reply_neg = () => {
    fetch("http://localhost:3000/reply_neg", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((res) => res.json())
      .then(console.log);
  };

  const add_friend = () => {
    fetch("http://localhost:3000/add_friend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((res) => res.json())
      .then(console.log);
  };

  const block = () => {
    fetch("http://localhost:3000/block", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((res) => res.json())
      .then(console.log);
  };

  const friendOptions = () => {
    if (props.status === "friend") {
      return (
        <button className="ui mini red button" onClick={() => block()}>
          BLOCK!
        </button>
      );
    } else if (props.status === "request") {
      return (
        <>
          <button className="ui mini green button" onClick={() => reply_pos()}>
            YES!
          </button>
          <button className="ui mini red button" onClick={() => reply_neg()}>
            NOPE!
          </button>
        </>
      );
    } else if (props.status === "youRequested") {
      return;
    } else if (props.status === "none") {
      return (
        <>
          You don't know this user yet! Request them!{" "}
          <button className="ui mini green button" onClick={() => add_friend()}>
            ADD!
          </button>{" "}
        </>
      );
    }
  };

  return (
    <div>
      <div id={props.friend.id}>
        {props.friend.username}
        {friendOptions()}
      </div>
    </div>
  );
}
