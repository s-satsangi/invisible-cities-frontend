import "./App.css";
import React, { useEffect, useState } from "react";
import Login from "./components/login";
import UserContainer from "./containers/UserContainer";
import UserForm from "./components/UserForm";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

function App() {
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [login, setLogin] = useState(false);
  // const [newUser, setNewUser] = useState(false);

  useEffect(() => {
    localStorage.setItem("username", username);
    localStorage.setItem("userId", userId);
    localStorage.setItem("login", login);
    // localStorage.setItem("newUser", newUser);
  }, [username, userId, login]);

  return (
    <div className="App">
      <Router>
        {/* link area is one of two conditions */}

        {/* links that should always be available go here */}
        <Link to="/">
          <h3>Home</h3>
        </Link>

        {/* if login is false, prompt for new user or login */}
        {/* if login is true, render the user container */}
        {/* */}
        {/* {localStorage.getItem("login") ? ( */}
        <>
          <Link to="/login" hidden={login}>
            <h3> Log In Here </h3>
          </Link>
          <Link to="/signup" hidden={login}>
            <h3> New User? Sign Up Here </h3>
          </Link>
        </>
        {/* ) : ( */}
        <Link to="/citizen" hidden={!login}>
          <h3>
            Welcome to Invisible Cities, {localStorage.getItem("username")}.
            Click here to enter.
          </h3>
        </Link>
        {/* )} */}

        {/* the render div.  what the user clicks, they'll see in this div */}
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
            render={() => <UserContainer />}
          />
        </div>
      </Router>
    </div>
  );
}

export default App;
