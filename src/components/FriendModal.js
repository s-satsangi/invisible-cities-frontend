import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Friend from "./Friend";
import SearchFriends from "./SearchFriends";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    height: 300,
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflow: "scroll",
  },
}));

export default function FriendModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const [friends, setFriends] = useState(localStorage.getItem("friends"));
  const [requestingYou, setRequestingYou] = useState(
    localStorage.getItem("requestingYou")
  );
  const [youRequested, setYouRequested] = useState(
    localStorage.getItem("youRequested")
  );
  // const getUsers = () => {
  //   fetch("http://localhost:3000/users", {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json" },
  //     credentials: "include",
  //   })
  //     .then((res) => res.json())
  //     .then((json) => {
  //       debugger;
  //       console.log("THIS IS THE GET USERS FETCH IN THE FRIEND MODAL" + json);
  //       props.setUserLookup(json);
  //       // setUsers(json.followers);
  //       // localStorage.setItem("friends", json.followers);
  //       // debugger;
  //       if (json.status) throw json;
  //     })
  //     .catch((err) => alert(`${err.message}`));
  // };

  // const getFriends = () => {
  //   const data = {
  //     user: {
  //       username: localStorage.getItem("username"),
  //     },
  //   };

  //   fetch("http://localhost:3000/friends", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(data),
  //     credentials: "include",
  //   })
  //     .then((res) => res.json())
  //     .then((json) => {
  //       console.log(json);
  //       props.setFriends(json.followers);
  //       // localStorage.setItem("friends", json.followers);
  //       // debugger;
  //       props.setRequestingYou(json.requests);
  //       props.setYouRequested(json.sent_requests);
  //       if (json.status) throw json;
  //     })
  //     .catch((err) => alert(`${err.message}`));
  // };
  // useEffect(() => {
  //   // getUsers();
  //   // debugger;
  //   getFriends();
  // }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Friends</h2>
      <p id="simple-modal-description">
        <SearchFriends />
      </p>
      <p id="simple-modal-description">
        Your Friends:
        {JSON.parse(friends).map((friend) => (
          <Friend key={friend.id} friend={friend} status={"friend"} />
        ))}
      </p>
      <p id="simple-modal-description">
        People who wanna be one of Your Friends:
        {JSON.parse(requestingYou).map((request) => (
          <Friend key={request.id} friend={request} status={"request"} />
        ))}
      </p>
      <p id="simple-modal-description">
        People You're Tryna be Friends with:
        {JSON.parse(youRequested).map((yourRequest) => (
          <Friend
            key={yourRequest.id}
            friend={yourRequest}
            status={"youRequested"}
          />
        ))}
      </p>
      <FriendModal />
    </div>
  );

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Open Modal
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
