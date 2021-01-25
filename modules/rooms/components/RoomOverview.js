import MessageType from "../../../constants/MessageType.js";
import AuthService from "../../../services/AuthService.js";
import RoomService from "../../../services/RoomService.js";
import { html } from "../../../utils/utils.js";

const roomCard = (room) =>
  html`<room-card
    style="margin-right:1rem;margin-bottom:1rem;"
    id="${room.id}"
    name="${room.name}"
    ownerId="${room.ownerId}"
  ></room-card>`;

export default class RoomOverview extends HTMLElement {
  constructor() {
    super();

    this.onRoomListSync = this.onRoomListSync.bind(this);
    this.onCreateRoom = this.onCreateRoom.bind(this);
  }

  render() {
    const rooms = RoomService.instance.rooms;
    const userId = AuthService.instance.getUserId();
    const myRooms = rooms.filter((r) => r.ownerId === userId);
    const otherRooms = rooms.filter((r) => r.ownerId !== userId);

    this.innerHTML = html`<div
      class="room-overview"
      style="${this.getAttribute("style")}"
    >
      <div class="room-overview-header">
        <h2>My Rooms</h1>
        <button class="room-overview-create-btn">Create new room</button>
      </div>
      <div class="room-container">
      ${myRooms.map(roomCard).join("")}
      </div>
      <div class="room-overview-header">
        <h2>Public Rooms</h1>
      </div>
      <div class="room-container">
      ${otherRooms.map(roomCard).join("")}
      </div>
    </div>`;

    const createRoomBtn = this.querySelector(".room-overview-create-btn");

    createRoomBtn.addEventListener("click", this.onCreateRoom);
  }

  connectedCallback() {
    this.render();

    RoomService.instance.addEventListener(
      MessageType.ROOM_LIST_SYNC,
      this.onRoomListSync
    );
  }

  disconnectedCallback() {
    RoomService.instance.removeEventListener(
      MessageType.ROOM_LIST_SYNC,
      this.onRoomListSync
    );
  }

  onRoomListSync() {
    this.render();
  }

  onCreateRoom() {
    const name = prompt("Room name");
    if (name === null) {
      return;
    }

    RoomService.instance.createRoom(name);
  }
}

window.customElements.define("room-overview", RoomOverview);
