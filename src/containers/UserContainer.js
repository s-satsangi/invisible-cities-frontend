import React, { useEffect } from "react";
import YourProfile from "../components/YourProfile";
import YourFriends from "../components/YourFriends";
import YourConvos from "../components/YourConvos";
// import YourGroups from "../components/YourGroups";
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

  const getGroups = () => {
    fetch("http://localhost:3000/groups", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        // debugger;
        props.setGroups(JSON.stringify(json.user_groups));
        // localStorage.setItem("friends", json.followers);
        // debugger;
        if (json.status) throw json;
      })
      .catch((err) => alert(`${err.message}`));
  };

  //post to endpoint to get messages?
  const getMessages = () => {
    fetch("http://localhost:3000/message", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        // debugger;
        props.setMessages(JSON.stringify(json.messages));
        // localStorage.setItem("friends", json.followers);
        // debugger;
        if (json.status) throw json;
      })
      .catch((err) => alert(`${err.message}`));
  };

  useEffect(() => {
    // getUsers();
    // debugger;
    getFriends();
    getGroups();
    getMessages();

    const interval = setInterval(() => {
      getFriends();
      getGroups();
      getMessages();
    }, 10000);
    return () => {
      clearInterval(interval);
    };
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
        {/* <Link to="/groups">Your Groups</Link> */}
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
          {/* <Route path="/groups" render={() => <YourGroups />} /> */}
        </div>
      </Router>
    </div>
  );
}
