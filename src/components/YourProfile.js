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
            Open your profile by clicking here,{" "}
            {localStorage.getItem("username")}
          </Typography>

          <Typography variant="h5" component="h2">
            your profile view / edit modal
          </Typography>
          <ProfileModal />
        </CardContent>
      </Card>
    </div>
  );
}
