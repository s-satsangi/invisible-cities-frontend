import React from "react";
import YourProfile from "../components/YourProfile";
import YourFriends from "../components/YourFriends";
import YourConvos from "../components/YourConvos";
export default function UserContainer() {
  return (
    <div>
      <h1>Ayyy User Container Let's Go!</h1>
      <YourProfile />

      <YourFriends />

      <YourConvos />
    </div>
  );
}
