import MessageType from "../../../constants/MessageType.js";
import AuthService from "../../../services/AuthService.js";
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

    const currentUserId = AuthService.instance.getUserId();

    this.innerHTML = html`<div class="room-queue">
      <div class="room-queue-tracks">
        ${queue
          .map(
            ({
              track,
              userId,
              upvotes,
              downvotes,
              id,
            }) => html`<room-queue-track
              id="${id}"
              name="${track.name}"
              imageUrl="${track.album.imageUrl}"
              artist="${track.artist.name}"
              userId="${userId}"
              votes="${upvotes.length - downvotes.length}"
              hasUpvoted="${upvotes.includes(currentUserId)}"
              hasDownvoted="${downvotes.includes(currentUserId)}"
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
