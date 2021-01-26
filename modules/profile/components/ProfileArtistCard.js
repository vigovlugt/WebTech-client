import RoomService from "../../../services/RoomService.js";
import { html } from "../../../utils/utils.js";

export default class ProfileArtistCard extends HTMLElement {
  constructor() {
    super();

    const imageSrc = this.getAttribute("imageSrc");
    const name = this.getAttribute("name");
    const url = this.getAttribute("url");
    const number = +this.getAttribute("number");

    this.innerHTML = html`
    <div class="profile-artist-card">
        <span class="profile-artist-number">${number}</span>
        <a href="${url}"><img class="profile-artist-image" src="${imageSrc}"/></a>
        <div class="profile-artist-info">
          <a href="${url}" class="profile-artist-name">${name}</a>
        </div>
    </div>`;
  }
}

window.customElements.define("profile-artist-card", ProfileArtistCard);
