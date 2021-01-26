import RoomService from "../../../services/RoomService.js";
import { html } from "../../../utils/utils.js";

export default class ProfileHistorySection extends HTMLElement {
  isExpanded = false;

  constructor() {
    super();

    this.render();
  }

  render() {
    const name = this.getAttribute("name");
    const tracks = document.querySelector("profile-page").stats[
      this.getAttribute("tracks")
    ].items;

    this.innerHTML = html` <div class="profile-history-section">
      <h2>${name}</h2>
      <div class="profile-history-section-tracks">
        ${tracks
          .slice(0, this.isExpanded ? undefined : 3)
          .map(
            (t, i) =>
              html`<a href="${t.track.external_urls.spotify}"
                ><profile-track-card
                  id="${t.track.id}"
                  number="${i + 1}"
                  name="${t.track.name}"
                  artist="${t.track.artists[0].name}"
                  imageSrc="${t.track.album.images[
                    t.track.album.images.length - 1
                  ].url}"
                ></profile-track-card
              ></a>`
          )
          .join("")}
      </div>
      <button class="profile-track-section-expand">
        ${this.isExpanded ? "Collapse" : "Expand"}
      </button>
    </div>`;

    this.querySelector(".profile-track-section-expand").addEventListener(
      "click",
      () => {
        this.isExpanded = !this.isExpanded;
        this.render();
      }
    );
  }
}
window.customElements.define("profile-history-section", ProfileHistorySection);
