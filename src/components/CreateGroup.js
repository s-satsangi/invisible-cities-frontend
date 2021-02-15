import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// const names = [
//   "Oliver Hansen",
//   "Van Henry",
//   "April Tucker",
//   "Ralph Hubbard",
//   "Omar Alexander",
//   "Carlos Abbott",
//   "Miriam Wagner",
//   "Bradley Wilkerson",
//   "Virginia Andrews",
//   "Kelly Snyder",
// ];

export default function MultipleSelect(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [friends, setFriends] = React.useState(
    localStorage.getItem("friendsFetch")
  );
  const [names, setNames] = React.useState(props.names);
  const userId = JSON.parse(localStorage.getItem("userId"));
  // JSON.parse(localStorage.getItem("friendsFetch")).followers[0].username
  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  const handleChangeMulti = (event) => {
    setPersonName(...personName, [event.target.value]);
  };
  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  const handleChangeMultiple = (event) => {
    debugger;
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setPersonName(value);
  };

  const newGroup = (event) => {
    event.preventDefault();
    console.log("OOOOOOYYYYYYYYY" + personName);
    // debugger;
    let bodyIds = personName.map((name) => name[0]);
    bodyIds.push(userId);
    // debugger;
    fetch("http://localhost:3000/groups", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      credentials: "include",
      body: JSON.stringify({
        user_group: bodyIds,
      }),
    })
      .then((resp) => {
        if (resp.status === 401) throw resp;
        return resp.json();
      })
      .then((resp) => {
        console.log("New group server response: " + resp);
      });
  };

  return (
    <div>
      <form onSubmit={(event) => newGroup(event, props)}>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-mutiple-name-label">Name</InputLabel>
          <Select
            labelId="demo-mutiple-name-label"
            id="demo-mutiple-name"
            multiple
            value={personName}
            onChange={handleChange}
            input={<Input />}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, personName, theme)}
              >
                {name[1]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField type="submit" />
      </form>
    </div>
  );
}
