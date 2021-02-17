import React from "react";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import Drawer from "@material-ui/core/Drawer";
import { useTheme } from "@material-ui/core/styles";

export default function DrawerComponent({
  classes,
  open,
  handleDrawerClose,
  messages,
}) {
  const theme = useTheme();
  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="right"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <List>
        {messages.map((text, index) => (
          <ListItem button key={text.id + index}>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary={text.title.substr(0, 10) + "..."} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
