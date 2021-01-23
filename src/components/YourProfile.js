import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ProfileModal from "./ProfileModal";

export default function YourProfile() {
  return (
    <div>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2">
            This is your profile, {localStorage.getItem("username")}
          </Typography>
          Clicking here, will take you to{" "}
          <Typography variant="h5" color="red" component="h2">
            your profile view / edit modal
          </Typography>
          , where you will able to see your name, and if there's time, your bio
          and avatar ... and the ability to edit your profile Also, you should
          be able to see how many friends how many blocked contacts & users
          blocking you
          <ProfileModal />
        </CardContent>
      </Card>
    </div>
  );
}
