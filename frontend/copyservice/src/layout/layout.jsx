import React, { useState } from "react";
import "./layout.scss";

import Job from "../job/job";

const Layout = () => {
  const [jobs, setJobs] = useState({
    list: [
      { id: "1", progress: 60, status: "working", switchStatus: true },
      { id: "2", progress: 100, status: "canceled", switchStatus: true },
      { id: "3", progress: 30, status: "paused", switchStatus: true },
    ],
  });
  const [switchStatus, setSwitchStatus] = useState("true");
  const [pathFrom, setPathFrom] = useState("");
  const [pathTo, setPathTo] = useState("");
  const cancelClicked = (value, id, index) => {
    console.log(index);
  };
  const swichClicked = (value, id, index) => {
    setSwitchStatus(false);
    console.log(index);
    const oldList = jobs.list;
    const curent_status = oldList[index].switchStatus;
    if (curent_status === false) {
      oldList[index].switchStatus = true;
    } else oldList[index].switchStatus = false;

    setJobs({ list: oldList });
  };
  const inputChangedValue = (value, stateSet) =>{
    stateSet(value.text)
  }
  return (
    <div className="layout">
      <div className="title">Copy Service</div>
      <div className="buttonContainer">
        {/*<button>Select Input File Path</button>*/}
        <input
          type="text"
          class="form-control"
          placeholder="Input Path"
          value={pathFrom}
          onChange={(value) => inputChangedValue(value, setPathFrom)}
        />

        {/*<button>Select Output File Path</button>*/}
        <input
          type="text"
          class="form-control"
          placeholder="Output path"
          value={pathTo}
          onChange={(value) => inputChangedValue(value, setPathTo)}
        />
        <button>Add Copy Job</button>
      </div>
      <div className="jobsContainer">
        {jobs.list.map((item, index) => (
          <Job
            id={item.id}
            status={item.status}
            progress={item.progress}
            onClickCancel={cancelClicked}
            onSwitchClick={swichClicked}
            switchChecked={item.switchStatus}
            index={index}
            className="job"
          ></Job>
        ))}
      </div>
    </div>
  );
};

export default Layout;
