import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Group from "./Group";

export default function YourConvos() {
  const displayGroups = () => {
    console.log("we displayin groups");
    let groups = JSON.parse(localStorage.getItem("groups"));
    // for each key, map through each object and return username?
    // Some bullshit.  Pay no mind
    // Arr = Object.values(groups[0]).map(val=>( val)).map((val,index)=> console.log(index))
    // Arr = Object.values(groups[0]).map(val=>( val))

    // debugger;
    // console.log(groups.map((val) => val.map((usr) => usr)));
    // debugger;
    return groups[0].map((val) => (
      <Group key={val[0]} members={val[1]} group_id={val[0]} />
    ));
    // let result = Object.values(groups[0]).map((val, key) => {
    //   console.log("rendering a group");

    //   <Group group={val} key={key} />;
    // });
    // debugger;
    // return groups;  groups =>  [{3: [{},{}]}]
  };

  return (
    <div>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2">
            {localStorage.getItem("username")}, here are your Conversations.
            They are organized by group so I guess we need to make a group
            object?
            <br />
            {displayGroups()}
          </Typography>
          Clicking here, will take you to the
          <Typography variant="h5" component="h2">
            your conversation modal
          </Typography>
          , where you will able to access conversation cards, which in turn will
          let you continue active conversations.
        </CardContent>
      </Card>
    </div>
  );
}
