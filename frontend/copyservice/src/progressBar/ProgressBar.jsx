import React from "react";
import "./progressbar.scss";
const max_width = 500;

const getWidthFromProgress = (progress) => (progress * max_width) / 100;
// const getColor = (canceled) => {
//   if (canceled === true) {
//     return "#f46c6c";
//   }
//   return "#36a784";
// };
const getColor = (status) => {
  if (status == "canceled"){
    return "#f46c6c";
  }
  if (status == "working"){
    return "#36a784";
  }
  return "#FFAE42"

}
const getStatus = (canceled) => {
  if (canceled === true) {
    return "Canceled";
  }
  return "";
};
const ProgressBar = (props) => {
  return (
    <div>
      <div className="progressBarBG"></div>
      <div
        className="progressBar"
        style={{
          width: getWidthFromProgress(props.progress),
          backgroundColor: getColor(props.status),
        }}
      >
        <span className="infoText">{props.status}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
