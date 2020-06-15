const lodash = require("lodash");
const url = "http://127.0.0.1:5000/";

const findJobIndex = (jobList, id) => {
  for (let i = 0; i < jobList.length; i++) {
    if (jobList[i].id === id.toString()) {
      return i;
    }
  }
  return -1;
};
export const alterCopyJob = (
  id,
  state,
  setState,
  progress = null,
  status = null
) => {
  const curentJobs = lodash.cloneDeep(state);
  let jobIndex = findJobIndex(curentJobs.list, id);
  console.log(jobIndex);
  if (jobIndex === -1) {
    curentJobs.list.push({
      id: id,
      progress: 0,
      status: "working",
      switchStatus: true,
    });
  }
  jobIndex = findJobIndex(curentJobs.list, id);
  if (progress != null) {
    curentJobs.list[jobIndex].progress = progress;
  }
  if (status != null) {
    curentJobs.list[jobIndex].status = status;
  }
  setState(curentJobs);
};

export const createCopyJob = async (from, to, state, setState) => {
  const response = await apiCreateJob(from, to);
  var json = await response.json();
  console.log(json);
  const id = json.id;

};
export const pauseCopyJob = async (id) => {
  console.log(id);
  const response = await apiPauseJob(id);
  const json = await response.json();
  console.log(json);
};
export const resumeCopyJob = async (id) => {
  const response = await apiResumeJob(id);
  const json = await response.json();
  console.log(json);
};
export const updateCopyJob = async (id, state, setState) => {
  const curentJobs = lodash.cloneDeep(state);
  const response = await apiStatus(id);
  const json = await response.json();
  const progress = parseInt(parseFloat(json.data) * 100); // TODO: API request
  alterCopyJob(id, state, setState, progress);
};
export const cancelCopyJob = async (id, state, setState) => {
  const response = await apiCancelJob(id);
  const json = await response.json();
  console.log(json);

  const curentJobs = lodash.cloneDeep(state);
  let jobIndex = findJobIndex(curentJobs.list, id);
  console.log(jobIndex);
  if (jobIndex === -1) {
    return -1
  }
  curentJobs.list.splice(jobIndex, 1)
  setState(curentJobs);
};
export const updateAllJobsFull = async (state, setState) => {
  const response = await apiAllJobs();
  const json = await response.json();
  const jobsAr = json["data"];
  const curentJobs = lodash.cloneDeep(state);
  for (let i = 0; i < jobsAr.length; i++) {
    console.log(state)
    const status = null
    let id = jobsAr[i];
    const response = await apiStatus(id);
    const json = await response.json();
    const progress = parseInt(parseFloat(json.data) * 100); // TODO: API request
    let jobIndex = findJobIndex(curentJobs.list, id);
    if (jobIndex === -1) {
      curentJobs.list.push({
        id: id,
        progress: 0,
        status: "working",
        switchStatus: true,
      });
    }
    jobIndex = findJobIndex(curentJobs.list, id);
    if (progress != null) {
      curentJobs.list[jobIndex].progress = progress;
    }
    if (status != null) {
      curentJobs.list[jobIndex].status = status;
    }
  }
  setState(curentJobs);
};

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


const apiCreateJob = async (from, to) => {
  const response = await fetch(url + "copy", {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: JSON.stringify({
      from: from,
      to: to,
    }),
  });
  return response;
};

const apiPauseJob = async (id) => {
  const response = await fetch(url + "suspend", {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: JSON.stringify({
      id: id,
    }),
  });
  return response;
};

const apiCancelJob = async (id) => {
  const response = await fetch(url + "stop", {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: JSON.stringify({
      id: id,
    }),
  });
  return response;
};

const apiResumeJob = async (id) => {
  const response = await fetch(url + "resume", {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: JSON.stringify({
      id: id,
    }),
  });
  return response;
};

const apiAllJobs = async () => {
  const response = await fetch(url + "allJobs", {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: JSON.stringify({}),
  });
  return response;
};

const apiStatus = async (id) => {
  const response = await fetch(url + "status", {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: JSON.stringify({
      id: id,
    }),
  });
  return response;
};
