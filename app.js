const express = require("express");
const os = require("os");

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Server Monitoring Dashboard",
    hostname: os.hostname(),
    cpuLoad: os.loadavg()[0],
    totalMemory: os.totalmem(),
    freeMemory: os.freemem(),
    uptime: os.uptime()
  });
});

app.listen(3000, () => {
  console.log("Monitoring app running on port 3000");
});

