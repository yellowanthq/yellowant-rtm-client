/** A client for YellowAnt RTM to relay YellowAnt commands from websocket to the http application */
const express = require("express");
const request = require("request-promise");
const socketio = require("socket.io-client");

import events from "./events";


const app = express();

// POST request options
const postOptions = {
  method: "POST",
  uri: process.env.APPLICATION_API_URL,
  json: true
};

// inline rtm_token and client_id of application as GET params in the server uri
const RTM_SERVER_URL = process.env.RTM_SERVER_URL + "?rtm_token=" + process.env.RTM_TOKEN + "&client_id=" + process.env.CLIENT_ID;

// connect to RTM server
const socketIOClient = socketio(RTM_SERVER_URL);

// handle YellowAnt commands on socketio event: "yellowant_command"
socketIOClient.on(events.YELLOWANT_COMMAND, (eventData) => {
  // eventData JSON contains two keys,
  // "id" - random event id
  // "data" - exactly same data sent from yellowant to application
  const { id, data } = eventData;
  // call the application API endpoint through POST request.
  // if application itself is listening to socketio server,
  // no need to send a POST request and explicitly call the
  // view handling the request
  request({ ...postOptions, body: { data } })
    .then((message) => {
      // emit yellowant message JSON back to RTM server
      socketIOClient.emit(events.YELLOWANT_MESSAGE, { id, message });
    })
    .catch((error) => {
      // emit error back to RTM server
      socketIOClient.emit(events.YELLOWANT_MESSAGE, { id, message: error });
    });
});

// dummy endpoint for healthcheck
app.get("/", (req, res) => res.send("OK"));

// run server
app.listen(3001);