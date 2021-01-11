import AuthService from "./AuthService.js";

export default class SyncService {
  static instance;

  /**
   * @type WebSocket;
   */
  socket = null;

  constructor() {
    SyncService.instance = this;
  }

  init() {
    this.socket = new WebSocket("wss://agile114.science.uva.nl/wss");

    this.socket.addEventListener("open", (e) => this.onConnected(e));
    this.socket.addEventListener("message", (e) => this.onMessage(e));
  }

  onConnected(e) {
    console.log("WEBSOCKET CONNECTED");

    this.sendMessage("AUTHENTICATE", {
      accessToken: AuthService.instance.accessToken,
    });
  }

  onMessage(e) {
    const { type, data } = JSON.parse(e.data);

    switch (type) {
      case "AUTHENTICATED":
        this.onAuthenticated();
        break;
    }
  }

  onAuthenticated() {
    console.log("WEBSOCKET AUTHENTICATED");

    this.sendMessage("PAUSE", null);
  }

  sendMessage(type, data) {
    const json = JSON.stringify({ type, data });

    this.socket.send(json);
  }
}
