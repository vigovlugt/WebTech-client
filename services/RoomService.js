import MessageType from "../constants/MessageType.js";
import SyncService from "./SyncService.js";

export default class RoomService extends EventTarget {
  /**
   * @type RoomService
   */
  static instance;

  rooms = [];

  constructor() {
    super();
    RoomService.instance = this;
  }

  init() {}

  getRoom(id) {
    return this.rooms.find((r) => r.id == id);
  }

  joinRoom(id) {
    console.log("JOINING ROOM:", id);
    SyncService.instance.sendMessage(MessageType.JOIN_ROOM, { id: +id });
  }

  onRoomSync(rooms) {
    this.rooms = rooms;
    this.dispatchEvent(new Event(MessageType.ROOM_LIST_SYNC));
  }

  createRoom(name) {
    SyncService.instance.sendMessage(MessageType.CREATE_ROOM, { name });
  }
}