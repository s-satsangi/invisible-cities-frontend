import Friendlist from "./Friendlist";
import User from "../components/User";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function AllUsers(props) {
  const [users, setUsers] = useState([]);
  const setFetch = () => {
    fetch("http://localhost:3000/users", { method: "GET" })
      .then((resp) => resp.json())
      .then((usrs) => {
        // debugger;
        setUsers(usrs.users);
      });
  };

  useEffect(() => {
    setFetch();
  }, []);

  const displayUsers = () => {
    return users.map((user) => {
      return <User key={user.id} user={user.username} />;
    });
  };

  return (
    <div>
      <h1>All Users</h1>
      <div>{displayUsers()}</div>
      <Router>
        <Link to="/friends">
          <h3> Friendlist </h3>
        </Link>
        <Route
          path="/friends"
          render={() => (
            <Friendlist
              username={props.username}
              userId={props.userId}
              login={props.login}
            />
          )}
        />
      </Router>
    </div>
  );
}

// //make messages readable
// const displayMessage = () => {
//     console.log("Aaaaaayyyyy!");
//     // debugger;
//     console.log(messages);
//     return messages?.map((msg, index) => (
//       <Message key={index} content={msg.message_body} user={user} />
//     ));
//   };

//   return (
//     <>
//       <h1> Your Messages </h1>
//       <div>{displayMessage()}</div>
//     </>
//   );
// }
