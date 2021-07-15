import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CheckBoxOutlineBlankRoundedIcon from "@material-ui/icons/CheckBoxOutlineBlankRounded";

const useStyles = makeStyles({
  list: {
    width: 75
  },
  fullList: {
    width: "auto"
  },
  red: {
    fill: "red"
  },
  green: {
    fill: "green"
  },
  blue: {
    fill: "blue"
  },
  purple: {
    fill: "purple"
  }
});

export default function ColorPicker() {
  const classes = useStyles();
  const [isOpen, setOpen] = React.useState(false);

  const toggleDrawer = () => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(!isOpen);
  };

  const list = (anchor) => (
    <div
      className={classes.list}
      // role="presentation"
      onClick={toggleDrawer()}
      onKeyDown={toggleDrawer()}
    >
      <List>
        {["red", "green", "blue", "purple"].map((text, index) => (
          <>
            <ListItem button key={text}>
              <ListItemIcon>
                <CheckBoxOutlineBlankRoundedIcon
                  className={classes[text]}
                  fontSize="large"
                />
              </ListItemIcon>
              <br />
              <br />
              <br />
            </ListItem>
            <Divider varient="middle" light />
          </>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <Button onClick={toggleDrawer()}>{"left"}</Button>
      <SwipeableDrawer
        anchor={"left"}
        open={isOpen}
        onClose={toggleDrawer()}
        onOpen={toggleDrawer()}
      >
        {list("left")}
      </SwipeableDrawer>
    </div>
  );
}
