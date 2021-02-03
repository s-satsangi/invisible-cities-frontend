import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

export default function YourConvos() {
  return (
    <div>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2">
            {localStorage.getItem("username")}, here you will find previews of
            your Conversations
          </Typography>
          Clicking here, will take you to the
          <Typography variant="h5" color="red" component="h2">
            your conversation modal
          </Typography>
          , where you will able to access conversation cards, which in turn will
          let you continue active conversations.
        </CardContent>
      </Card>
    </div>
  );
}
