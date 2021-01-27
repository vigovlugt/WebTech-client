import RoomService from "../../../services/RoomService.js";
import { html } from "../../../utils/utils.js";

export default class ProfileTrackCard extends HTMLElement {
  constructor() {
    super();

    const imageSrc = this.getAttribute("imageSrc");
    const id = this.getAttribute("id");
    const name = this.getAttribute("name");
    const artist = this.getAttribute("artist");
    const number = +this.getAttribute("number");

    this.innerHTML = html` <div class="profile-track-card">
      <span class="profile-track-number">${number}</span>
      <img class="profile-track-image" src="${imageSrc}" alt="Track" />
      <div class="profile-track-info">
        <a class="profile-track-name">${name}</a>
        <a class="profile-track-artist">${artist}</a>
      </div>
    </div>`;
  }
}

window.customElements.define("profile-track-card", ProfileTrackCard);
