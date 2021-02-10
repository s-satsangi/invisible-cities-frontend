import "./App.css";
import React, { useEffect, useState } from "react";
import Login from "./components/login";
import UserContainer from "./containers/UserContainer";
import UserForm from "./components/UserForm";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

function App() {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [login, setLogin] = useState(localStorage.getItem("login"));
  const [userLookup, setUserLookup] = useState(
    localStorage.getItem("userLookup")
  );
  const [friendsFetch, setFriendsFetch] = useState([]);
  const [friends, setFriends] = useState([]);
  const [requestingYou, setRequestingYou] = useState([]);
  const [youRequested, setYouRequested] = useState([]);

  useEffect(() => {
    localStorage.setItem("username", username);
    localStorage.setItem("userId", userId);
    localStorage.setItem("login", login);
    localStorage.setItem("userLookup", userLookup);
    localStorage.setItem("requestingYou", requestingYou);
    localStorage.setItem("youRequested", youRequested);
    localStorage.setItem("friends", friends);
    localStorage.setItem("friendsFetch", friendsFetch);
  }, [
    username,
    userId,
    login,
    userLookup,
    requestingYou,
    youRequested,
    friends,
    friendsFetch,
  ]);

  return (
    <div className="App">
      <Router>
        {/* link area is one of two conditions */}

        {/* links that should always be available go here */}
        <Link to="/">
          <h3>Home</h3>
        </Link>

        <>
          <Link to="/login" hidden={login === "true"}>
            <h3> Log In Here </h3>
          </Link>
          <Link to="/signup" hidden={login === "true"}>
            <h3> New User? Sign Up Here </h3>
          </Link>
        </>

        <Link to="/citizen" hidden={login === "false"}>
          <h3>Welcome to Invisible Cities, {username}. Click here to enter.</h3>
        </Link>

        <div>
          {/* no options selected, render nothing */}
          {/* <Route path="/" render={<></>} /> */}

          {/* the components that render when login is false */}
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

          {/* User has logged in and clicked enter.  Render the User Container here */}
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
              />
            )}
          />
        </div>
      </Router>
    </div>
  );
}

export default App;
