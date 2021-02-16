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

  const [friends, setFriends] = useState(
    JSON.parse(localStorage.getItem("friends"))
  );
  const [requestingYou, setRequestingYou] = useState(
    JSON.parse(localStorage.getItem("requestingYou"))
  );
  const [youRequested, setYouRequested] = useState(
    JSON.parse(localStorage.getItem("youRequested"))
  );
  const [blocked, setBlocked] = useState(
    JSON.parse(localStorage.getItem("blocked"))
  );

  useEffect(() => {
    setFriends(JSON.parse(localStorage.getItem("friends")));
    setRequestingYou(JSON.parse(localStorage.getItem("requestingYou")));
    setYouRequested(JSON.parse(localStorage.getItem("youRequested")));
    setBlocked(JSON.parse(localStorage.getItem("blocked")));
    const interval = setInterval(() => {
      setFriends(JSON.parse(localStorage.getItem("friends")));
      setRequestingYou(JSON.parse(localStorage.getItem("requestingYou")));
      setYouRequested(JSON.parse(localStorage.getItem("youRequested")));
      setBlocked(JSON.parse(localStorage.getItem("blocked")));
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

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
        {friends.map((friend) => (
          <Friend key={friend.id} friend={friend} status={"friend"} />
        ))}
      </p>
      <p id="simple-modal-description">
        People who wanna be one of Your Friends:
        {requestingYou.map((request) => (
          <Friend key={request.id} friend={request} status={"request"} />
        ))}
      </p>
      <p id="simple-modal-description">
        People You're Tryna be Friends with:
        {youRequested.map((yourRequest) => (
          <Friend
            key={yourRequest.id}
            friend={yourRequest}
            status={"youRequested"}
          />
        ))}
      </p>
      <p id="simple-modal-description">
        People you've blocked:
        {blocked.map((blockee) => (
          <>
            <Friend key={blockee.id} friend={blockee} status={"blocked"} />
          </>
        ))}
      </p>
      {/* <FriendModal /> */}
    </div>
  );

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Open Friends
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
