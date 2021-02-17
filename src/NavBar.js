import React, { useState, useEffect } from "react";
import clsx from "clsx";
import Axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import TableSkeleton from "./TableSkeleton";
import NestedComments from "./NestedComments";
import _ from "lodash";
import AppBarComponent from "./AppBarComponent";
import DrawerComponent from "./DrawerComponent";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: "#ffd400",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    color: "black",
    flexGrow: 1,
  },
  hide: {
    display: "none",
  },
  drawer: {
    color: "black",
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));

export default function NavBar() {
  const classes = useStyles();

  const [notification, setNotification] = useState(0);
  const [messages, setMessages] = useState([]);
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [areCommentsLoading, setCommentsLoading] = useState(false);

  useEffect(() => {
    getNotifications();
    getComments();
  }, []);

  const getNotifications = () => {
    Axios.get("https://5ca2fedc190b430014edbb83.mockapi.io/tasks")
      .then((res) => res.data)
      .then((res) => {
        setMessages(res);
        setNotification(res.length);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getComments = () => {
    setCommentsLoading(true);
    Axios.get("https://5ca2fedc190b430014edbb83.mockapi.io/comments")
      .then((res) => res.data)
      .then((res) => {
        setCommentsLoading(false);
        //lodash используется в данном случае для изменения входящих данных в иерархическую структуру
        function transformToTree(res) {
          var nodes = {};
          return res.filter(function (obj) {
            var id = obj["id"],
              parentId = obj["parentId"];

            nodes[id] = _.defaults(obj, nodes[id], { children: [] });
            parentId &&
              (nodes[parentId] = nodes[parentId] || { children: [] })[
                "children"
              ].push(obj);

            return !parentId;
          });
        }

        var result = transformToTree(res);
        setComments([...result]);
      })
      .catch((err) => {
        setCommentsLoading(false);
        console.error(err);
      });
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBarComponent
        classes={classes}
        handleDrawerOpen={handleDrawerOpen}
        open={open}
        notification={notification}
      />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {areCommentsLoading ? (
          <TableSkeleton />
        ) : (
          <NestedComments comments={comments} />
        )}
      </main>
      <DrawerComponent
        classes={classes}
        open={open}
        handleDrawerClose={handleDrawerClose}
        messages={messages}
      />
    </div>
  );
}
