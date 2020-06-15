import React, { useState, useEffect, useRef } from "react";
import "./layout.scss";
import {
  createCopyJob,
  resumeCopyJob,
  pauseCopyJob,
  cancelCopyJob,
  updateAllJobsFull,
} from "./api";
import Job from "../job/job";
const Layout = () => {
  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }
  useInterval(() => {
    updateAllJobsFull(jobs, setJobs);
  }, 1000);

  const [jobs, setJobs] = useState({
    list: [],
  });
  const [switchStatus, setSwitchStatus] = useState("true");
  const [pathFrom, setPathFrom] = useState("");
  const [pathTo, setPathTo] = useState("");
  const useForceUpdate = () => useState()[1];

  const cancelClicked = (value, id, index) => {
    cancelCopyJob(id, jobs, setJobs);
  };

  const swichClicked = (value, id, index) => {
    setSwitchStatus(false);
    console.log(index);
    const oldList = jobs.list;
    const curent_status = oldList[index].switchStatus;
    if (curent_status === false) {
      oldList[index].switchStatus = true;
      oldList[index].status = "working";
      resumeCopyJob(oldList[index].id);
    } else {
      oldList[index].switchStatus = false;
      oldList[index].status = "paused";
      pauseCopyJob(oldList[index].id);
    }

    setJobs({ list: oldList });
  };
  const addJobClicked = () => {
    createCopyJob(pathFrom, pathTo, jobs, setJobs);
  };
  const pathFromChangedValue = (value) => {
    setPathFrom(document.getElementById("pathFrom").value);
  };
  const pathToChangedValue = (value) => {
    setPathTo(document.getElementById("pathTo").value);
  };
  return (
    <div className="layout">
      <div className="title">Copy Service</div>
      <div className="buttonContainer">
        {/*<button>Select Input File Path</button>*/}
        <input
          id="pathFrom"
          type="text"
          class="form-control"
          placeholder="Input Path"
          value={pathFrom}
          onChange={pathFromChangedValue}
        />

        {/*<button>Select Output File Path</button>*/}
        <input
          id="pathTo"
          type="text"
          class="form-control"
          placeholder="Output path"
          value={pathTo}
          onChange={pathToChangedValue}
        />
        <button onClick={addJobClicked}>Add Copy Job</button>
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
