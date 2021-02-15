import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Group from "./Group";
import CreateGroup from "./CreateGroup";

export default function YourConvos() {
  const displayGroups = () => {
    console.log("we displayin groups");
    let groups = JSON.parse(localStorage.getItem("groups"));

    return groups[0].map((val) => (
      <Group key={val[0]} members={val[1]} group_id={val[0]} />
    ));
  };

  const [names, setNames] = useState(
    JSON.parse(localStorage.getItem("friendsFetch")).followers.map((follow) => [
      follow.id,
      follow.username,
    ])
  );

  return (
    <div>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2">
            {localStorage.getItem("username")}, here are your Conversations.
            <br />
            {displayGroups()}
          </Typography>

          <Typography variant="h5" component="h2">
            Create a chat group from your friends:
            <CreateGroup names={names} />
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
