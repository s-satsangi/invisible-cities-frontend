import React, { useState, useEffect } from "react";
import { Container, TextField } from "@material-ui/core";
import SearchResults from "./SearchResults";
import Friend from "./Friend";

const SearchFriends = () => {
  const [searchname, setSearchname] = useState([]);

  const [resultsAvatar, setResultsAvatar] = useState([]);
  const [resultsBio, setResultsBio] = useState([]);
  const [resultsId, setResultsId] = useState([]);
  const [resultsUsername, setResultsUsername] = useState([]);
  const [resultsFriend, setResultsFriend] = useState([]);
  const [resultsStatus, setResultsStatus] = useState("");
  const [friendIds, setFriendIds] = useState(
    JSON.parse(localStorage.getItem("friends")).map((friend) => friend.id)
  );
  const [youRequestedIds, setYouRequestedIds] = useState(
    JSON.parse(localStorage.getItem("youRequested")).map((friend) => friend.id)
  );
  const [requestingYouIds, setRequestingYouIds] = useState(
    JSON.parse(localStorage.getItem("requestingYou")).map((friend) => friend.id)
  );

  const performSearch = (event) => {
    event.preventDefault();
    const data = {
      user: {
        username: searchname,
      },
    };
    fetch("http://localhost:3000/finduser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => {
        // debugger;
        console.log(json);
        // debugger;
        if (json.user) {
          if (friendIds.includes(json.user.id)) {
            setResultsStatus("friend");
          } else if (youRequestedIds.includes(json.user.id)) {
            setResultsStatus("youRequested");
          } else if (requestingYouIds.includes(json.user.id)) {
            setResultsStatus("request");
          } else {
            setResultsStatus("none");
          }
          setResultsAvatar(json.user.avatar);
          setResultsBio(json.user.bio);
          setResultsId(json.user.id);
          setResultsUsername(json.user.username);
          setResultsFriend(json.user);
        } else {
          setResultsAvatar("");
          setResultsBio("");
          setResultsId("");
          setResultsUsername("");
          setResultsFriend("");
        }
      });
  };

  return (
    <Container>
      <div>Search for a friend here:</div>;
      <form onSubmit={performSearch}>
        <TextField
          label="Username"
          className="searchform"
          onChange={(event) => setSearchname(event.target.value)}
        />
        <br />
        <TextField type="submit" />
      </form>
      <div>Results Begin</div>
      <Friend friend={resultsFriend} status={resultsStatus} />
      <div>Results UnBegin</div>
    </Container>
  );
};

export default SearchFriends;
