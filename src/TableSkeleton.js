import React, { Fragment } from "react";
import Avatar from "@material-ui/core/Avatar";
import Skeleton from "@material-ui/lab/Skeleton";

export default function SkeletonTable() {
  return (
    <Fragment>
      <Skeleton variant="circle">
        <Avatar />
      </Skeleton>
      <Skeleton variant="rect" width="100%">
        <div style={{ paddingTop: "16%" }}></div>
      </Skeleton>
    </Fragment>
  );
}
