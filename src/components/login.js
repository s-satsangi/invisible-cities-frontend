import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
// import UserForm from "../containers/UserForm";
export default function Login(props) {
  // const initialUsername = () => window.localStorage.getItem("username");
  // const [username, setUsername] = useState(initialUsername);
  const [stateUsername, setStateUsername] = useState("");
  // const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const setFetch = (event, props) => {
    event.preventDefault();
    // props.setLogin(true);
    // props.setUser(23);
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
          // password,
        },
      }),
    })
      .then((resp) => {
        if (resp.status === 401) throw resp;
        return resp.json();
      })
      .then((user) => {
        console.log("I thought it all set!");
        // props.setLogin(true);
        localStorage.setItem("login", true);

        // props.setUsername(user.user[0].username);
        localStorage.setItem("username", user.user[0].username);

        // props.setUserId(user.user[0].id);
        window.localStorage.setItem("userId", user.user[0].id);

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
        &nbsp;
        {/* <TextField
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /> */}
        &nbsp;
        <TextField type="submit" />
      </form>
      <br />
      {/* <UserForm /> */}
    </div>
  );
  // return <div></div>;
}
