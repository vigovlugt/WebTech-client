import RoomService from "../../../services/RoomService.js";
import { html } from "../../../utils/utils.js";

export default class ProfileArtistSection extends HTMLElement {
  isExpanded = false;

  constructor() {
    super();

    this.render();
  }

  render(){
    const name = this.getAttribute("name");
    const artists = document.querySelector("profile-page").stats[this.getAttribute("artists")].items;

    this.innerHTML = html` <div class="profile-artist-section">
      <h2>${name}</h2>
      <div class="profile-artist-section-artists">
        ${artists.slice(0, this.isExpanded ? undefined : 3).map(
          (t, i) =>
            html`<a href="${t.external_urls.spotify}"><profile-artist-card
              id="${t.id}"
              number="${i + 1}"
              name="${t.name}"
              imageSrc="${t.images[t.images.length - 1].url}"
            ></profile-artist-card></a>`
        ).join("")}
      </div>
      <button class="profile-artist-section-expand">${this.isExpanded ? 'Collapse': 'Expand'}</button>
    </div>`;

    this.querySelector(".profile-artist-section-expand").addEventListener("click", () => {
      this.isExpanded = !this.isExpanded;
      this.render();
    })
  }
}
window.customElements.define("profile-artist-section", ProfileArtistSection);
