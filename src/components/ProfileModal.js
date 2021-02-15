import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

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

export default function ProfileModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const [numFriends, setNumFriends] = useState(-1);
  const [numBlocked, setNumBlocked] = useState(-1);

  const delUser = () => {
    fetch("http://localhost:3000/deluser", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => res.json)
      .then((json) => console.log(json));
  };

  const getNumberFollows = () => {
    fetch("http://localhost:3000/numfriends", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
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
        <br></br>
        <button className="ui mini green button" onClick={() => delUser()}>
          1-click delete your account
        </button>
      </p>
      {/* <ProfileModal /> */}
    </div>
  );

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Open Profile
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
