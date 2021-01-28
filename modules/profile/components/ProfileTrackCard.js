import RoomService from "../../../services/RoomService.js";
import { html } from "../../../utils/utils.js";

export default class ProfileTrackCard extends HTMLElement {
  constructor() {
    super();

    const id = this.getAttribute("id");
    const imageSrc = this.getAttribute("imageSrc");
    const name = this.getAttribute("name");
    const artist = this.getAttribute("artist");
    const url = this.getAttribute("url");
    const number = +this.getAttribute("number");

    this.innerHTML = html` <div class="profile-track-card">
      <span class="profile-track-number">${number}</span>
      <a href="${url}"
        ><img class="profile-track-image" src="${imageSrc}" alt="Track"
      /></a>
      <div class="profile-track-info">
        <a href="${url}" class="profile-track-name">${name}</a>
        <a class="profile-track-artist">${artist}</a>
      </div>
      ${(RoomService.instance.room != null) ? '<button class="add_button">+</button>': ''}
    </div>`;

    const addButton = this.querySelector(".add_button");
    addButton.addEventListener(
      "click",
      function () {
        if (RoomService.instance.room != null) {
          RoomService.instance.addToQueue(id);
        }
      },
      false
    );
  }
}

window.customElements.define("profile-track-card", ProfileTrackCard);
