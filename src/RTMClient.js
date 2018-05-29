/** RTM Client class for connecting to the YellowAnt RTM server */
const socketio = require("socket.io-client");

import events from "./events";


// POST request options
const postOptions = {
  method: "POST",
  uri: process.env.APPLICATION_API_URL,
  json: true
};

class RTMClient {
  constructor(CLIENT_ID, RTM_TOKEN, RTM_SERVER_URL="") {
    // inline rtm_token and client_id of application as GET params in the server uri
    const URL = RTM_SERVER_URL + "?rtm_token=" + RTM_TOKEN + "&client_id=" + CLIENT_ID;

    // connect to RTM server
    this.socketIOClient = socketio(URL);

    // bind methods to class member
    this.bindClientEvents.bind(this);

    // bind websocket events to socketio client
    this.bindClientEvents();
  }

  bindClientEvents() {
    this.socketIOClient.on("connection", () => {console.log("woohoo")});

    // handle YellowAnt commands on socketio event: "yellowant_command"
    this.socketIOClient.on(events.YELLOWANT_COMMAND, (eventData) => {
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
          this.socketIOClient.emit(events.YELLOWANT_MESSAGE, { id, message });
        })
        .catch((error) => {
          // emit error back to RTM server
          this.socketIOClient.emit(events.YELLOWANT_MESSAGE, { id, message: error });
        });
    });
  }
}

export default RTMClient;