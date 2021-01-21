import "./App.css";
import React, { useState } from "react";
import Login from "./components/login";
import UserForm from "./containers/UserForm";
import ComposeMessage from "./components/ComposeMessage";
import MessageBox from "./containers/MessageBox";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

function App() {
  const [user, setUser] = useState(1);
  const [login, setLogin] = useState(false);

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
        <Link to="/newMessage">
          <h3> Write a Message Here </h3>
        </Link>
        <Link to="/your-chats">
          <h3>Messages for you</h3>
        </Link>
        <div>
          <Route path="/newMessage" render={() => <ComposeMessage />} />
          <Route
            path="/"
            exact={true}
            render={() => <h1> Welcome to Invisible Cities </h1>}
          />
          <Route
            path="/login"
            render={() => <Login setUser={setUser} setLogin={setLogin} />}
          />
          <Route path="/signup" render={() => <UserForm />} />
          <Route path="/your-chats" render={() => <MessageBox />} />
        </div>
      </Router>
    </div>
  );
}

export default App;
