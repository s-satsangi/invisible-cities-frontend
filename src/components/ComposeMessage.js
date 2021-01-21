import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

export default function ComposeMessage(props) {
  const [body, setbody] = useState("");
  const [user1, setuser1] = useState("");
  const [user2, setuser2] = useState("");
  const [error, setError] = useState("");

  const setFetch = (event) => {
    event.preventDefault();
    console.log("setFetch for posting a brand new message");
    // set body before clobbering state
    //let fetchBod = JSON.stringify(
    let message = {
      body: body,
      user1: user1,
      user2: user2,
    };

    setbody("");
    setuser1("");
    setuser2("");
    fetch("http://localhost:3000/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      credentials: "include",
      body: JSON.stringify({ message }),
    })
      .then((resp) => {
        if (resp.status === 401) throw resp;
        return resp.json();
      })
      .then((resp) => {
        console.log(resp);
        return;
      })
      .catch((err) => {
        setError(err.statusText);
        // setTimeout(() => setError(""), 5000);
        return;
      });
  };

  return (
    <div>
      <h1>Write a Message Here!</h1>
      <form id="new-message" onSubmit={(event) => setFetch(event)}>
        {error ? (
          <Alert severity="error">
            {" "}
            Sorry, something went wrong: <br />
            {error}
          </Alert>
        ) : null}
        <TextField
          type="text"
          placeholder="body"
          value={body}
          onChange={(e) => setbody(e.target.value)}
        />
        &nbsp;
        <TextField
          type="text"
          placeholder="User1"
          value={user1}
          onChange={(e) => setuser1(e.target.value)}
        />
        &nbsp;
        <TextField
          type="text"
          placeholder="User2"
          value={user2}
          onChange={(e) => setuser2(e.target.value)}
        />
        &nbsp;
        <TextField type="submit" />
      </form>
      <br />
    </div>
  );
}
