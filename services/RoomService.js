import MessageType from "../constants/MessageType.js";
import SyncService from "./SyncService.js";

export default class RoomService extends EventTarget {
  /**
   * @type RoomService
   */
  static instance;

  rooms = [];

  room = null;

  constructor() {
    super();
    RoomService.instance = this;
  }

  init() {}

  getRoom(id) {
    return this.rooms.find((r) => r.id == id);
  }

  joinRoom(id) {
    SyncService.instance.sendMessage(MessageType.ROOM_JOIN, { id: +id });
  }

  pause() {
    SyncService.instance.sendMessage(MessageType.ROOM_PAUSE);
  }

  play() {
    SyncService.instance.sendMessage(MessageType.ROOM_PLAY);
  }

  playNext() {
    SyncService.instance.sendMessage(MessageType.ROOM_PLAY_NEXT);
  }

  addToQueue(id) {
    SyncService.instance.sendMessage(MessageType.ROOM_ADD_QUEUE, { id });
  }

  upvoteTrack(id) {
    SyncService.instance.sendMessage(MessageType.ROOM_TRACK_UPVOTE, { id });
  }

  downvoteTrack(id) {
    SyncService.instance.sendMessage(MessageType.ROOM_TRACK_DOWNVOTE, { id });
  }

  onRoomListSync(rooms) {
    this.rooms = rooms;
    this.dispatchEvent(new Event(MessageType.ROOM_LIST_SYNC));
  }

  onSyncRoom(room) {
    if (room === null) {
      window.Router.goto("/");
      return;
    }

    this.room = room;
    this.dispatchEvent(new Event(MessageType.ROOM_SYNC));
  }

  createRoom(name) {
    SyncService.instance.sendMessage(MessageType.ROOM_CREATE, { name });
  }

  deleteRoom() {
    SyncService.instance.sendMessage(MessageType.ROOM_DELETE);
  }
}
window.RoomService = RoomService;
