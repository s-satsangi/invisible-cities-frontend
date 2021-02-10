import React, { useEffect } from "react";
import YourProfile from "../components/YourProfile";
import YourFriends from "../components/YourFriends";
import YourConvos from "../components/YourConvos";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

export default function UserContainer(props) {
  // --------------------------------------------
  // Fetch block
  // Here I'm fetching friends, friend requests rec'd and sent
  // And throwing them in localstorage & persisting using useEffect
  // So's they can be available to the rest of the app.
  // I think I can probs read & write these through localstorage
  // calls in the child components
  // --------------------------------------------
  const getFriends = () => {
    const data = {
      user: {
        username: localStorage.getItem("username"),
      },
    };

    fetch("http://localhost:3000/friends", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        // debugger;
        props.setFriendsFetch(JSON.stringify(json));
        props.setFriends(JSON.stringify(json.followers));
        // localStorage.setItem("friends", json.followers);
        // debugger;
        props.setRequestingYou(JSON.stringify(json.requests));
        props.setYouRequested(JSON.stringify(json.sent_requests));
        if (json.status) throw json;
      })
      .catch((err) => alert(`${err.message}`));
  };
  useEffect(() => {
    // getUsers();
    // debugger;
    getFriends();
  }, []);

  // --------------------------------------------
  // End fetches
  // --------------------------------------------

  return (
    <div>
      <h1>Ayyy User Container Let's Go!</h1>
      <Router>
        <Link to="/profile">Your Profile</Link>
        <Link to="/friends">Your Friends Stuff</Link>
        <Link to="/convos">Your Convos</Link>
        <div>
          <Route path="/profile" render={() => <YourProfile />} />
          <Route
            path="/friends"
            render={() => (
              <YourFriends
                setUserLookup={props.setUserLookup}
                setFriends={props.setFriends}
                setYouRequested={props.setYouRequested}
                setRequestingYou={props.setRequestingYou}
              />
            )}
          />
          <Route path="/convos" render={() => <YourConvos />} />
        </div>
      </Router>

      {/* <YourProfile /> */}

      {/* <YourFriends
        setUserLookup={props.setUserLookup}
        setFriends={props.setFriends}
        setYouRequested={props.setYouRequested}
        setRequestingYou={props.setRequestingYou}
      /> */}

      {/* <YourConvos /> */}
    </div>
  );
}
