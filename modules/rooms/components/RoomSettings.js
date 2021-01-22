import MessageType from "../../../constants/MessageType.js";
import AuthService from "../../../services/AuthService.js";
import RoomService from "../../../services/RoomService.js";
import { html } from "../../../utils/utils.js";

export default class RoomSettings extends HTMLElement {
  eventListener = null;

  constructor() {
    super();

    this.onRoomSync = this.onRoomSync.bind(this);
  }

  render() {
    const room = RoomService.instance.room;

    // const currentUserId = AuthService.instance.getUserId();

    this.innerHTML = html`<div class="room-settings">
      <label>Room color</label>
      <div class="room-settings-color-container">
        <input type="color" class="room-settings-color" value="${room.color}" />
        <button class="room-settings-color-apply">Apply</button>
      </div>

      <button class="room-settings-delete">Delete room</button>
    </div>`;

    this.querySelector(".room-settings-delete").addEventListener("click", () =>
      RoomService.instance.deleteRoom()
    );

    this.querySelector(".room-settings-color-apply").addEventListener(
      "click",
      () => {
        const value = this.querySelector(".room-settings-color").value;
        RoomService.instance.setRoomColor(value);
      }
    );
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

window.customElements.define("room-settings", RoomSettings);
