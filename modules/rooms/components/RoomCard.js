import RoomService from "../../../services/RoomService.js";
import { html } from "../../../utils/utils.js";

export default class RoomCard extends HTMLElement {
  constructor() {
    super();

    const id = this.getAttribute("id");
    const style = this.getAttribute("style");

    const room = RoomService.instance.getRoom(id);

    const currentTrack = room.playerState.currentTrack
      ? room.playerState.currentTrack.track
      : null;

    this.innerHTML = html`<div
      class="room-card"
      style="${style};background-color:${room.color};"
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
          src="${currentTrack ? currentTrack.album.imageUrl : ""}"
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
      RoomService.instance.joinRoom(id);
      window.Router.goto("/rooms/" + id);
    };
  }
}

window.customElements.define("room-card", RoomCard);
