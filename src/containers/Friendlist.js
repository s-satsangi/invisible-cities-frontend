import React, { useState, useEffect } from "react";

export default function Friendlist() {
  const [friends, setFriends] = useState([]);

  const setFetch = () => {
    event.preventDefault();
  };

  return (
    <div>
      <h1> Friendlist </h1>
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
