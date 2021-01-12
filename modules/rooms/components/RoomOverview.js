import MessageType from "../../../constants/MessageType.js";
import RoomService from "../../../services/RoomService.js";
import { html } from "../../../utils/utils.js";

export default class RoomOverview extends HTMLElement {
  eventListener = null;

  constructor() {
    super();

    this.onRoomListSync = this.onRoomListSync.bind(this);
    this.onCreateRoom = this.onCreateRoom.bind(this);
  }

  render() {
    const rooms = RoomService.instance.rooms;

    this.innerHTML = html`<div
      class="room-overview"
      style="${this.getAttribute("style")}"
    >
      <div class="room-overview-header">
        <h2>Rooms</h1>
        <button class="room-overview-create-btn">Create new room</button>
      </div>
      <div class="room-container">
      ${rooms
        .map(
          (room) =>
            html`<room-card
              style="margin-right:1rem;margin-bottom:1rem;"
              id="${room.id}"
              name="${room.name}"
              ownerId="${room.ownerId}"
            ></room-card>`
        )
        .join("")}
      </div>
    </div>`;

    const createRoomBtn = this.querySelector(".room-overview-create-btn");

    createRoomBtn.addEventListener("click", this.onCreateRoom);
  }

  connectedCallback() {
    this.render();

    this.eventListener = RoomService.instance.addEventListener(
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
    RoomService.instance.createRoom(prompt("Room name?"));
  }
}

window.customElements.define("room-overview", RoomOverview);
