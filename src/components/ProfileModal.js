import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

//fetch number friends
//fetch number blocked

export default function SimpleModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [numFriends, setNumFriends] = useState(-1);
  const [numBlocked, setNumBlocked] = useState(-1);

  const getNumberFollows = () => {
    const data = {
      user: {
        username: localStorage.getItem("username"),
      },
    };
    fetch("http://localhost:3000/numfriends", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setNumFriends(json.followers);
        setNumBlocked(json.blocked);
        localStorage.setItem("numFriends", json.followers);
        localStorage.setItem("numBlocked", json.blocked);
        // debugger;
        if (json.status) throw json;
      })
      .catch((err) => alert(`${err.message}`));
  };

  useEffect(() => {
    getNumberFollows();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">
        <em>profile for {localStorage.getItem("username")}</em>
      </h2>
      <p id="simple-modal-description">
        <br></br>
        <em>You have {localStorage.getItem("numFriends")} friends</em>
        <br></br>
        <em>
          You have been blocked by {localStorage.getItem("numBlocked")} users
        </em>
      </p>
      <SimpleModal />
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
