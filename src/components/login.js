import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { BrowserRouter as Redirect } from "react-router-dom";

export default function Login(props) {
  const [stateUsername, setStateUsername] = useState("");
  const [statePassword, setStatePassword] = useState("");
  const [error, setError] = useState("");

  const setFetch = (event, props) => {
    event.preventDefault();
    console.log("setFetch");
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      credentials: "include",
      body: JSON.stringify({
        user: {
          username: stateUsername,
          password: statePassword,
        },
      }),
    })
      .then((resp) => {
        if (resp.status === 401) throw resp;
        return resp.json();
      })
      .then((user) => {
        props.setLogin("true");
        localStorage.setItem("login", "true");
        console.log(
          "If it works, it works, buddy. + login: " +
            localStorage.getItem("login") +
            " username: " +
            user.user
        );
        console.log(user);
        // localStorage.setItem("username", user.user);
        props.setUsername(user.user);
        // props.setUsername(localStorage.getItem("username"));
        localStorage.setItem("userId", user.uid);
        props.setUserId(localStorage.getItem("userId"));
        console.log("I thought it all set!");
        <Redirect to="/citizen" />;
        return;
      })
      .catch((err) => {
        setError(err.statusText);
        return;
      });
  };

  return (
    <div>
      <form onSubmit={(event) => setFetch(event, props)}>
        {error ? (
          <Alert severity="error">
            {" "}
            Sorry, something went wrong: <br />
            {error}
          </Alert>
        ) : null}
        <TextField
          type="text"
          placeholder="username"
          value={stateUsername}
          onChange={(e) => setStateUsername(e.target.value)}
        />
        &nbsp; &nbsp;
        <TextField
          type="text"
          placeholder="password"
          value={statePassword}
          type="password"
          onChange={(e) => setStatePassword(e.target.value)}
        />
        <TextField type="submit" />
      </form>
      <br />
    </div>
  );
}
