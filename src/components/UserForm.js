import React, { Component } from "react";
import { Container, TextField } from "@material-ui/core";

export default class UserForm extends Component {
  state = {
    username: "",
    password: "",
    submit: false,
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
      .then((json) => {
        if (json.status) throw json;
        alert("change to redirect later");
      })
      .catch((err) => alert(`${err.message}`));
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
