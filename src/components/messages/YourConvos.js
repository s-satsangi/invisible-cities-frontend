import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Group from "../groups/Group";
import CreateGroup from "../groups/CreateGroup";

export default function YourConvos() {
  const displayGroups = (localGroups) => {
    console.log("we displayin groups");

    return localGroups[0].map((val) => (
      <Group key={val[0]} members={val[1]} group_id={val[0]} />
    ));
  };

  const [groups, setGroups] = useState(
    JSON.parse(localStorage.getItem("groups"))
  );
  const [names, setNames] = useState(
    JSON.parse(localStorage.getItem("friendsFetch")).followers.map((follow) => [
      follow.id,
      follow.username,
    ])
  );

  useEffect(() => {
    setGroups(JSON.parse(localStorage.getItem("groups")));
    displayGroups(groups);
    setNames(
      JSON.parse(
        localStorage.getItem("friendsFetch")
      ).followers.map((follow) => [follow.id, follow.username])
    );

    const interval = setInterval(() => {
      setGroups(JSON.parse(localStorage.getItem("groups")));
      displayGroups(groups);
      setNames(
        JSON.parse(
          localStorage.getItem("friendsFetch")
        ).followers.map((follow) => [follow.id, follow.username])
      );
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2">
            {localStorage.getItem("username")}, here are your Conversations.
            <br />
            {displayGroups(groups)}
          </Typography>

          <Typography variant="h5" component="h2">
            Create a chat group from your friends:
            <CreateGroup names={names} grouptype={"new"} group_id={0} />
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
