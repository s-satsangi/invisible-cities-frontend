import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FriendModal from "./FriendModal";

export default function YourFriends(props) {
  return (
    <div>
      <Card variant="outlined">
        <CardContent>
          <Typography>
            {localStorage.getItem("username")}, this is your{" "}
            <Typography variant="h5" component="h2">
              Friends Container
            </Typography>
            clicking here will open up the{" "}
            <Typography variant="h5" component="h2">
              Friends find and accept modal
            </Typography>
            , where you will be able to view a list of friends, search for and
            add new friends, and block trouble buddies
          </Typography>
          <FriendModal
            setUserLookup={props.setUserLookup}
            setFriends={props.setFriends}
            setYouRequested={props.setYouRequested}
            setRequestingYou={props.setRequestingYou}
          />
        </CardContent>
      </Card>
    </div>
  );
}
