import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import StarBorder from "@material-ui/icons/StarBorder";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const ListComponent = ({ comment, classes }) => {
  const nestedComments = (comment.children || []).map((comment) => {
    return (
      <ListComponent
        key={comment.id}
        comment={comment}
        type="child"
        classes={classes}
      />
    );
  });

  return (
    <div className={classes.nested}>
      <Collapse in={true} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary={comment.text} />
          </ListItem>
        </List>
      </Collapse>
      {nestedComments}
    </div>
  );
};

export default function NestedtestComments({ comments }) {
  const classes = useStyles();
  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Иерархическая структура комментариев
        </ListSubheader>
      }
      className={classes.root}
    >
      {comments.length > 0 ? (
        comments.map((comment) => {
          return (
            <ListComponent
              key={comment.id}
              comment={comment}
              classes={classes}
            />
          );
        })
      ) : (
        <p>Комментарии не найдены</p>
      )}
    </List>
  );
}
