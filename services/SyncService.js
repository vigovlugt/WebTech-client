import MessageType from "../constants/MessageType.js";
import ActiveDeviceService from "../modules/active-device/services/ActiveDeviceService.js";
import AuthService from "./AuthService.js";
import RoomService from "./RoomService.js";

export default class SyncService extends EventTarget {
  /**
   * @type SyncService
   */
  static instance;

  /**
   * @type WebSocket
   */
  socket = null;

  isAuthenticated = false;

  constructor() {
    super();

    SyncService.instance = this;
  }

  init() {
    this.socket = new WebSocket("wss://agile114.science.uva.nl/wss");

    this.socket.addEventListener("open", (e) => this.onConnected(e));
    this.socket.addEventListener("message", (e) => this.onMessage(e));
  }

  onConnected(e) {
    console.log("WEBSOCKET CONNECTED");

    this.sendMessage(MessageType.AUTHENTICATE, {
      accessToken: AuthService.instance.accessToken,
    });
  }

  onMessage(e) {
    const { type, data } = JSON.parse(e.data);

    switch (type) {
      case MessageType.AUTHENTICATED:
        this.onAuthenticated();
        break;
      case MessageType.ROOM_LIST_SYNC:
        RoomService.instance.onRoomListSync(data);
        break;
      case MessageType.ROOM_SYNC:
        RoomService.instance.onSyncRoom(data);
        break;
      case MessageType.AVAILABLE_DEVICES:
        ActiveDeviceService.instance.openActiveDeviceModal(data);
        break;
    }
  }

  onAuthenticated() {
    this.isAuthenticated = true;
    this.dispatchEvent(new Event(MessageType.AUTHENTICATED));

    console.log("WEBSOCKET AUTHENTICATED");
  }

  sendMessage(type, data = null) {
    const json = JSON.stringify({ type, data });

    this.socket.send(json);
  }
}
