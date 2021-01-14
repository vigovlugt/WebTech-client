import MessageType from "../../../constants/MessageType.js";
import RoomService from "../../../services/RoomService.js";
import { html } from "../../../utils/utils.js";

export default class RoomQueue extends HTMLElement {
  eventListener = null;

  constructor() {
    super();

    this.onRoomSync = this.onRoomSync.bind(this);
  }

  render() {
    const queue = RoomService.instance.room
      ? RoomService.instance.room.playerState.queue
      : [];

    this.innerHTML = html`<div class="room-queue">
      <h2 class="room-section-header">Queue</h2>
      <div class="room-queue-tracks">
        ${queue
          .map(
            (t) => html`<room-queue-track
              id="${t.id}"
              name="${t.name}"
              imageUrl="${t.album.imageUrl}"
              artist="${t.artist.name}"
            ></room-queue-track>`
          )
          .join("")}
      </div>
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

window.customElements.define("room-queue", RoomQueue);
