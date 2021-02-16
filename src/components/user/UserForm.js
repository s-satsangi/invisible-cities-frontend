import React, { Component } from "react";
import { Container, TextField } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

export default class UserForm extends Component {
  state = {
    username: "",
    password: "",
    submit: false,
    error: "",
  };

  createUser = (event) => {
    event.preventDefault();
    const data = {
      user: {
        username: this.state.username,
        password: this.state.password,
        bio:
          "This is the automagically generated bio for my profile!  I should personalize this!",
      },
    };
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((res) => res.json())
      .catch((err) => {
        this.setState({ error: err.message });
        console.log("WE CAUGHT IT");
      })
      .then((json) => {
        console.log("this is the error? " + json.error);
        this.setState({ error: json.error });
      });
    event.target.reset();
  };

  inputHandler = (event, keyname) => {
    this.setState({
      [keyname]: event.target.value,
    });
  };

  render() {
    return (
      <Container>
        {this.state.error ? (
          <Alert severity="error">
            {" "}
            Sorry, something went wrong: <br />
            {this.state.error}
          </Alert>
        ) : null}

        <form onSubmit={this.createUser}>
          <br />
          <TextField
            required
            label="Username"
            className="userform"
            onChange={(event) => this.inputHandler(event, "username")}
          />
          <br />
          <TextField
            required
            label="Password"
            type="password"
            className="userform"
            onChange={(event) => this.inputHandler(event, "password")}
          />
          <br />
          <br />
          {/* {this.state.submit ? ( */}
          <TextField type="submit" />
          {/* // ) : ( */}
          {/* <TextField type="submit" disabled /> */}
          {/* // )} */}
        </form>
      </Container>
    );
  }
}
