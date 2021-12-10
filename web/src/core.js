const dev = "http://localhost:2000";
const baseURL =
  window.location.hostname.split(":")[0] === "localhost" ? dev : "";

module.exports = baseURL;
