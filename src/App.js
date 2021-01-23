import "./App.css";
import React, { useEffect, useState } from "react";
import Login from "./components/login";
import UserForm from "./containers/UserForm";
import ComposeMessage from "./components/ComposeMessage";
import MessageBox from "./containers/MessageBox";
import AllUsers from "./containers/AllUsers";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

function App() {
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [login, setLogin] = useState(false);

  useEffect(() => {
    localStorage.setItem("username", username);
    localStorage.setItem("userId", userId);
    localStorage.setItem("login", login);
  }, [username, userId, login]);

  return (
    <div className="App">
      <Router>
        <Link to="/">
          <h3>Home</h3>
        </Link>
        <Link to="/login">
          <h3> Log In Here </h3>
        </Link>
        <Link to="/signup">
          <h3> New User Here </h3>
        </Link>
        <Link to="/all-users">
          <h3> See all users </h3>
        </Link>
        <Link to="/newMessage">
          <h3> Write a Message Here </h3>
        </Link>
        <Link to="/your-chats">
          <h3>
            Messages for{" "}
            {localStorage.getItem("username") === ""
              ? "you"
              : `${localStorage.getItem("username")}`}
          </h3>
        </Link>
        <div>
          <Route
            path="/newMessage"
            render={() => (
              <ComposeMessage
                userId={localStorage.getItem("userId")}
                username={localStorage.getItem("username")}
              />
            )}
          />
          <Route
            path="/"
            exact={true}
            render={() => <h1> Welcome to Invisible Cities </h1>}
          />
          <Route
            path="/login"
            render={() => (
              <Login
              // setUserId={setUserId}
              // setLogin={setLogin}
              // setUsername={setUsername}
              />
            )}
          />
          <Route path="/signup" render={() => <UserForm />} />

          <Route
            path="/all-users"
            render={() => (
              <AllUsers
              // userId={localStorage.getItem("userId")}
              // username={username}
              // login={login}
              />
            )}
          />
          {/* <Route
            path="/friends"
            render={() => (
              <Friendlist userId={userId} username={username} login={login} />
            )}
          /> */}
          <Route
            path="/your-chats"
            render={() => (
              <MessageBox
              // username={username} userId={userId}
              />
            )}
          />
        </div>
      </Router>
    </div>
  );
}

export default App;
