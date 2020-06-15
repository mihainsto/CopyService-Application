const fetch = require("node-fetch");
const url = "http://127.0.0.1:5000/";
const { exec } = require("child_process");

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

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const textTest = async () => {
  const from1 = "copyText.txt";
  const to1 = "copyTextCopied.txt";
  fs = require("fs");
  fs = require("fs");
  fs.readFile(from1, "utf8", async function (err, data1) {
    if (err) {
      return console.log(err);
    }
    const response = await apiCreateJob(from1, to1);
    const json = await response.json();
    console.log(json);
    await sleep(5000);
    exec("chmod +777 " + to1, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    });
    await sleep(1000);
    fs.readFile(to1, "utf8", async function (err, data2) {
      if (err) {
        return console.log(err);
      }
      const response = await apiCreateJob(from1, to1);
      const json = await response.json();
      if (data1 === data2) {
        console.log("***TEST#1 Text test Passed - Can copy text files***");
      }
    });
  });
};

const ImageTest = async () => {
  await sleep(2000);
  const from1 = "smallImage.png";
  const to1 = "smallImageCopy.png";
  fs = require("fs");
  fs.readFile(from1, "utf8", async function (err, data1) {
    if (err) {
      return console.log(err);
    }
    const response = await apiCreateJob(from1, to1);
    const json = await response.json();
    console.log(json);
    await sleep(5000);
    exec("chmod +777 " + to1, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    });
    await sleep(1000);
    fs.readFile(to1, "utf8", async function (err, data2) {
      if (err) {
        return console.log(err);
      }
      const response = await apiCreateJob(from1, to1);
      const json = await response.json();
      if (data1 === data2) {
        console.log("***TEST#2 Image test Passed - Can copy image files***");
      }
    });
  });
};

const pauseResumeTest = async () => {
  await sleep(10000);
  const from1 = "smallImage.png";
  const to1 = "smallImagePR.png";
  fs = require("fs");
  fs.readFile(from1, "utf8", async function (err, data1) {
    if (err) {
      return console.log(err);
    }
    const response = await apiCreateJob(from1, to1);
    const json = await response.json();
    console.log(json);
    const id = json.id;
    apiPauseJob(id);
    await sleep(1000);
    apiResumeJob(id);
    await sleep(5000);
    exec("chmod +777 " + to1, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    });
    await sleep(1000);
    fs.readFile(to1, "utf8", async function (err, data2) {
      if (err) {
        return console.log(err);
      }
      const response = await apiCreateJob(from1, to1);
      const json = await response.json();
      if (data1 === data2) {
        console.log("***TEST#4  Passed - Can pause and resume copy jobs***");
      }
    });
  });
};

const statusTest = async () => {
  await sleep(5000);
  const from1 = "smallImage.png";
  const to1 = "smallImageCopyStatus.png";
  const response = await apiCreateJob(from1, to1);
  const json = await response.json();
  const id = json.id;
  const response2 = await apiStatus(id);
  const json2 = await response2.json();
  console.log(json2);
  if (json2.status === "OK") {
    console.log("***TEST#3 Passed - Can request status***");
  }
};

const allJobsTest = async () => {
  await sleep(14000);
  const from1 = "smallImage.png";
  const to1 = "smallImageCopyAllJobsTest.png";
  const response = await apiCreateJob(from1, to1);
  const json = await response.json();
  const id = json.id;
  const response2 = await apiAllJobs(id);
  const json2 = await response2.json();
  console.log(json2);
  if (json2.status === "OK") {
    console.log("***TEST#5 Passed - Can request all jobs***");
  }
};

const runTests = async () => {
  console.log("Starting unit testing...");
  await textTest();
  await sleep(2000);
  await ImageTest();
  await sleep(2000);
  await statusTest();
  await sleep(2000);
  await pauseResumeTest();
  await sleep(2000);
  await allJobsTest();
};

runTests();
