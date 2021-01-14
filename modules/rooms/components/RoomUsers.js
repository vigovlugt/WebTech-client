import MessageType from "../../../constants/MessageType.js";
import RoomService from "../../../services/RoomService.js";
import { html } from "../../../utils/utils.js";

export default class RoomUsers extends HTMLElement {
  eventListener = null;

  constructor() {
    super();

    this.onRoomSync = this.onRoomSync.bind(this);
  }

  render() {
    const users = RoomService.instance.room
      ? RoomService.instance.room.users
      : [];

    this.innerHTML = html`<div class="room-users">
      <h2 class="room-section-header">Users</h2>
      ${users.map(
        (u) => html`
          <div class="room-user">
            <img
              class="room-user-image"
              src="https://agile114.science.uva.nl/api/users/image.php?id=${u.id}"
            />
            <div>
              <h4>${u.name}</h4>
            </div>
          </div>
        `
      )}
    </div>`;
  }

  onRoomSync() {
    this.render();
  }

  connectedCallback() {
    this.render();

    this.eventListener = RoomService.instance.addEventListener(
      MessageType.ROOM_SYNC,
      this.onRoomSync
    );
  }

  disconnectedCallback() {
    RoomService.instance.removeEventListener(
      MessageType.ROOM_SYNC,
      this.onRoomSync
    );
  }
}

window.customElements.define("room-users", RoomUsers);
