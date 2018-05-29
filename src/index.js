/** A client for YellowAnt RTM to relay YellowAnt commands from websocket to the http application */
const express = require("express");

import RTMClient from "./RTMClient.js";

const app = express();

// initialize RTM client
new RTMClient(process.env.CLIENT_ID, process.env.RTM_TOKEN, process.env.RTM_SERVER_URL);

// dummy endpoint for healthcheck
app.get("/", (req, res) => res.send("OK"));

// run server
app.listen(3001);