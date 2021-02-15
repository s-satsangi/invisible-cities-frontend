import "./App.css";
import React, { useEffect, useState } from "react";
import Login from "./components/login";
import UserContainer from "./containers/UserContainer";
import UserForm from "./components/UserForm";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

function App() {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [login, setLogin] = useState("false");
  const [userLookup, setUserLookup] = useState(
    localStorage.getItem("userLookup")
  );
  const [friendsFetch, setFriendsFetch] = useState([]);
  const [friends, setFriends] = useState([]);
  const [requestingYou, setRequestingYou] = useState([]);
  const [youRequested, setYouRequested] = useState([]);
  const [groups, setGroups] = useState();
  const [messages, setMessages] = useState();

  useEffect(() => {
    localStorage.setItem("username", username);
    localStorage.setItem("userId", userId);
    localStorage.setItem("login", login);
    localStorage.setItem("userLookup", userLookup);
    localStorage.setItem("requestingYou", requestingYou);
    localStorage.setItem("youRequested", youRequested);
    localStorage.setItem("friends", friends);
    localStorage.setItem("friendsFetch", friendsFetch);
    localStorage.setItem("groups", groups);
    localStorage.setItem("messages", messages);
  }, [
    username,
    userId,
    localStorage.getItem("login"),
    userLookup,
    requestingYou,
    youRequested,
    friends,
    friendsFetch,
    groups,
    messages,
  ]);

  const logout = () => {
    fetch("http://localhost:3000/logout", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        // debugger;
        if (json.status) throw json;
      })
      .catch((err) => alert(`${err.message}`));
    setLogin("");
    setUserId("");
    setUsername("");
    setUserLookup("");
    // setFriendsFetch([]);
    // setFriends([]);
    // setRequestingYou([]);
    // setYouRequested([]);
    // setGroups([]);
    setLogin("false");
  };

  return (
    <div className="App">
      <Router>
        <Link to="/">
          <h3>Home</h3>
        </Link>

        {login === "false" && (
          <>
            <Link to="/login">
              <h3> Log In Here </h3>
            </Link>
            <Link to="/signup">
              <h3> New User? Sign Up Here </h3>
            </Link>
          </>
        )}

        {login === "true" && (
          <>
            <Link to="/citizen">
              <h3>
                Welcome to Invisible Cities, {username}. Click here to enter.
              </h3>
            </Link>
            <Link to="/logout">
              <h3>Logout here</h3>
            </Link>
          </>
        )}

        <div>
          <Route
            path="/login"
            render={() => (
              <Login
                setUserId={setUserId}
                setUsername={setUsername}
                setLogin={setLogin}
              />
            )}
          />
          <Route path="/signup" render={() => <UserForm />} />

          <Route
            path="/citizen"
            exact={true}
            render={() => (
              <UserContainer
                setUserLookup={setUserLookup}
                setFriendsFetch={setFriendsFetch}
                setFriends={setFriends}
                setRequestingYou={setRequestingYou}
                setYouRequested={setYouRequested}
                setGroups={setGroups}
                setMessages={setMessages}
              />
            )}
          />
          <Route path="/logout" render={() => logout()} />
        </div>
      </Router>
    </div>
  );
}

export default App;
