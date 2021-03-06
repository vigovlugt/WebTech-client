import RoomService from "../../../services/RoomService.js";
import { html } from "../../../utils/utils.js";

export default class RoomCard extends HTMLElement {
  constructor() {
    super();

    const id = this.getAttribute("id");

    const room = RoomService.instance.getRoom(id);

    const currentTrack = room.playerState.currentTrack
      ? room.playerState.currentTrack.track
      : null;

    this.innerHTML = html`<div
      class="room-card"
      style="background-color:${room.color};"
    >
      <h3>${room.name}</h3>
      <div class="room-card-profile-images">
        ${room.users
          .map(
            (u) =>
              html`<img
                class="room-card-profile-image"
                src="https://agile114.science.uva.nl/api/users/image.php?id=${u.id}"
                alt="${u.name}"
              />`
          )
          .join("")}
      </div>
      <div class="room-card-track">
        <img
          class="room-card-track-image"
          src="${currentTrack
            ? currentTrack.album.imageUrl
            : "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="}"
          alt="Room Track"
        />
        <div class="room-card-track-info">
          <a class="room-card-track-name"
            >${currentTrack ? currentTrack.name : ""}</a
          >
          <a class="room-card-track-artist"
            >${currentTrack ? currentTrack.artist.name : ""}</a
          >
        </div>
      </div>
    </div>`;
    this.onclick = () => {
      window.Router.goto("/rooms/" + id);
    };
  }
}

window.customElements.define("room-card", RoomCard);
