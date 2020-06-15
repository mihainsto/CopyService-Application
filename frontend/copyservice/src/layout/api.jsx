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
  console.log(progress);
  console.log(curentJobs);
  const jobIndex = findJobIndex(curentJobs.list, id);
  if (jobIndex === -1) {
    return -1;
  }
  console.log(jobIndex);
  if (progress != null) {
    curentJobs.list[jobIndex].progress = progress;
  }
  if (status != null) {
    curentJobs.list[jobIndex].status = status;
  }
  setState(curentJobs);
};

export const createCopyJob = async (from, to, state, setState) => {
  //console.log({from: from, to: to})
  const response = await apiCreateJob(from, to);
  var json = await response.json();
  console.log(json)
  const id = json.id;
  //console.log(id)
//   const curentJobs = lodash.cloneDeep(state);
//   const status = "working";
//   const progress = 1;

//   curentJobs.list.push({
//     id: id,
//     progress: progress,
//     status: status,
//     switchStatus: true,
//   });

//   setState(curentJobs);
};
export const pauseCopyJob = async (id) => {
    console.log(id)
    //console.log({from: from, to: to})
    const response = await apiPauseJob(id);
    const json = await response.json();
    console.log(json)
}
export const resumeCopyJob = async (id) => {
    //console.log({from: from, to: to})
    const response = await apiResumeJob(id);
    const json = await response.json();
    console.log(json)
}
export const updateCopyJob = (id, state, setState) => {
  const curentJobs = lodash.cloneDeep(state);
  const progress = 40; // TODO: API request
  alterCopyJob(id, state, setState, progress);
};
export const cancelCopyJob = async (id) =>{
    const response = await apiCancelJob(id);
    const json = await response.json();
    console.log(json)
}

// const apiCreateJob =  async (from, to) => {

//     fetch(url + "copy", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//       },
//       body: JSON.stringify({
//         from: from,
//         to: to,
//       }),
//     })
//       .then((response) => response.json())
//       .then((json) => {
//         //console.log("parsed json", json);
//         return json
//       });
//   };
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
}

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
}

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
}