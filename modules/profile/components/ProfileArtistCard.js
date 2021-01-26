import RoomService from "../../../services/RoomService.js";
import { html } from "../../../utils/utils.js";

export default class ProfileArtistCard extends HTMLElement {
  constructor() {
    super();

    const imageSrc = this.getAttribute("imageSrc");
    const id = this.getAttribute("id");
    const name = this.getAttribute("name");
    const number = +this.getAttribute("number");

    this.innerHTML = html`
    <div class="profile-artist-card">
      <span class="profile-artist-number">${number}</span>
      <img class="profile-artist-image" src="${imageSrc}"/>
      <div class="profile-artist-info">
        <a class="profile-artist-name">${name}</a>
      </div>
    </div>`;
  }
}

window.customElements.define("profile-artist-card", ProfileArtistCard);
