import { html } from "../../../utils/utils.js";

export default class RoomQueueTrack extends HTMLElement {
  constructor() {
    super();

    this.render();
  }

  render() {
    const imageUrl = this.getAttribute("imageUrl");
    const name = this.getAttribute("name");
    const id = this.getAttribute("id");
    const artist = this.getAttribute("artist");
    const userId = this.getAttribute("userId");

    this.innerHTML = html`<div class="queue-track">
      <img class="queue-track-image" src="${imageUrl}" />
      <div class="queue-track-info">
        <a class="queue-track-name">${name}</a>
        <a class="queue-track-artist">${artist}</a>
      </div>
      <img
        class="queue-track-user"
        src="https://agile114.science.uva.nl/api/users/image.php?id=${userId}"
      />
    </div>`;
  }
}

window.customElements.define("room-queue-track", RoomQueueTrack);
