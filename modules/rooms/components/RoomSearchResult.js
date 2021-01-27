import RoomService from "../../../services/RoomService.js";
import { html } from "../../../utils/utils.js";
export default class RoomSearchResult extends HTMLElement {
  constructor() {
    super();

    this.render();
  }

  render() {
    const imageUrl = this.getAttribute("imageUrl");
    const name = this.getAttribute("name");
    const id = this.getAttribute("id");
    const artist = this.getAttribute("artist");

    this.innerHTML = html`<div class="search-result">
      <img class="search-result-image" src="${imageUrl}" alt="Search result" />
      <div class="search-result-info">
        <a class="search-result-name">${name}</a>
        <a class="search-result-artist">${artist}</a>
      </div>
      <button class="search-result-add">+</button>
    </div>`;

    this.setEventListeners(id);
  }

  setEventListeners(id) {
    this.querySelector(".search-result-add").addEventListener("click", () => {
      RoomService.instance.addToQueue(id);
    });
  }
}

window.customElements.define("room-search-result", RoomSearchResult);
