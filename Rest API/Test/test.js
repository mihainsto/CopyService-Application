const fetch = require("node-fetch");
const from1 = "de_copiat.txt";
const to1 = "cacat.txt";

const testCreateJob = () => {
  let url = "http://127.0.0.1:5000/copy";
  fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: JSON.stringify({
      from: from1,
      to: to1,
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      console.log("parsed json", json);
    });
};

const testStatus = () => {
  let url = "http://127.0.0.1:5000/status";
  fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: JSON.stringify({
      id: '0',
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      console.log("parsed json", json);
    });
};

const testResume = () => {
  let url = "http://127.0.0.1:5000/resume";
  fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: JSON.stringify({
      id: '0',
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      console.log("parsed json", json);
    });
};

const testStop = () => {
  let url = "http://127.0.0.1:5000/stop";
  fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: JSON.stringify({
      id: '0',
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      console.log("parsed json", json);
    });
};

const testSuspend= () => {
  let url = "http://127.0.0.1:5000/suspend";
  fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: JSON.stringify({
      id: '0',
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      console.log("parsed json", json);
    });
};

