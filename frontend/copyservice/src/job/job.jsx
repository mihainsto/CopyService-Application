import React from "react";
import "./job.scss";
import FadeLoader from "react-spinners/FadeLoader";
import { css } from "@emotion/core";
import ProgressBar from "../progressBar/ProgressBar";

import { withStyles } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      transform: "translateX(16px)",
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: "#36a784",
        opacity: 1,
        border: "none",
      },
    },
    "&$focusVisible $thumb": {
      color: "#52d869",
      border: "6px solid #fff",
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"]),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

const getLoaderStatus = (status) => {
  if (status==="working"){
    return true
  }
  return false
}
const getLoaderPadding = (status) => {
  if (status==="working"){
    return 0
  }
  return 60
}
const Job = (props) => {
  return (
    <div className="job">
      <div className="jobContents">
        <div className="text">JOB #1</div>
        <div className="loader" style={{paddingRight: getLoaderPadding(props.status)}}>
          <FadeLoader
            css={override}
            size={150}
            color={"#36D7B7"}
            loading={getLoaderStatus(props.status)}
          />
        </div>
        <div className="progressbar">
          <ProgressBar
            progress={props.progress}
            canceled={props.canceled}
            status={props.status}
          ></ProgressBar>
        </div>
        <div className="switch">
          <IOSSwitch checked={props.switchChecked} onChange={props.onSwitchClick}></IOSSwitch>
        </div>
        <button
          className="btn"
          onClick={(value) => props.onClickCancel(value, props.id)}
        >
          {" "}
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Job;
