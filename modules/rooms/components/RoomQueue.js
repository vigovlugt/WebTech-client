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
      <div class="room-queue-tracks">
        ${queue
          .map(
            ({ track, userId }) => html`<room-queue-track
              id="${track.id}"
              name="${track.name}"
              imageUrl="${track.album.imageUrl}"
              artist="${track.artist.name}"
              userId="${userId}"
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
