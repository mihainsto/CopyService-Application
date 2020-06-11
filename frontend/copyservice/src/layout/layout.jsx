import React, { useState } from "react";
import "./layout.scss";

import Job from "../job/job";

const Layout = () => {
  const [jobs, setJobs] = useState({
    list: [
      { id: "1", progress: 60, status: "working" },
      { id: "2", progress: 100, status: "canceled" },
      { id: "3", progress: 30, status: "paused" },
    ],
  });
  const [switchStatus, setSwitchStatus] = useState("true");
  const cancelClicked = (value, id) => {
    console.log(id)
  };
  const swichClicked = (value) => {
    setSwitchStatus("false")
  }
  return (
    <div className="layout">
      <div className="title">Copy Service</div>
      <div className="buttonContainer">
        <button>Select Input File Path</button>

        <button>Select Output File Path</button>

        <button>Add Copy Job</button>
      </div>
      <div className="jobsContainer">
        {jobs.list.map((item) => (
          <Job
            id={item.id}
            status={item.status}
            progress={item.progress}
            onClickCancel={cancelClicked}
            onSwitchClick={swichClicked}
            switchChecked={switchStatus}
            className="job"
          ></Job>
        ))}
      </div>
    </div>
  );
};

export default Layout;
