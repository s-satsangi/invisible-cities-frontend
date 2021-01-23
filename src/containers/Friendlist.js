import React, { useState, useEffect } from "react";
import Friend from "../components/Friend";

export default function Friendlist(props) {
  const [friends, setFriends] = useState([]);

  const setFetch = () => {
    console.log("Hol Up. Getting your friends");
    fetch("http://localhost:3000/friends", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      credentials: "include",
      body: JSON.stringify({
        follow: {
          userId: props.userId,
          // password,
        },
      }),
    })
      .then((resp) => resp.json())
      .then((buds) => {
        localStorage.setItem("friends", buds.friends);
        setFriends(buds.friends);
      });
  };

  useEffect(() => {
    setFetch();
  }, []);

  const listBuds = () => {
    return friends.map((bud) => {
      return <Friend key={bud.id} username={bud.username} />;
    });
  };

  return (
    <div>
      <h1> Friendlist </h1>
      <div>{listBuds()}</div>
    </div>
  );
}

// import React, { useState, useEffect } from "react";
// import Message from "../components/Message";

// export default function MessageBox() {
//   // set state vars here using useState
//   const [messages, setmessages] = useState([]);
//   const [user, setUser] = useState(2);

//   // fetch the messages
//   const setFetch = () => {
//     // event.preventDefault();
//     console.log("setFetch for getting messages for a user");
//     fetch("http://localhost:3000/message", { method: "GET" })
//       .then((res) => res.json())
//       .catch((err) => console.log(err))
//       .then((msgs) => {
//         let localMsgArr = msgs.messages;
//         setmessages(localMsgArr);
//         // debugger;
//       });
//   };

//   useEffect(() => {
//     console.log("setFetch from useEffect");
//     setFetch();
//   }, []);

//   //make messages readable
//   const displayMessage = () => {
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
