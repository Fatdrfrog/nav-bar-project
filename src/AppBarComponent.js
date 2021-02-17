import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

export default function AppBarComponent({
  classes,
  handleDrawerOpen,
  open,
  notification,
}) {
  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar>
        <Typography variant="h6" noWrap className={classes.title}>
          Навигационная панель
        </Typography>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={handleDrawerOpen}
          className={clsx(open && classes.hide)}
        >
          <StyledBadge
            badgeContent={notification > 0 ? notification : 0}
            color="secondary"
          >
            <NotificationsActiveIcon />
          </StyledBadge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
