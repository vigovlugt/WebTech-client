import { html } from "../../../utils/utils.js";

export default class RoomCard extends HTMLElement {
  constructor() {
    super();

    const id = this.getAttribute("id");
    const name = this.getAttribute("name");
    const ownerId = this.getAttribute("ownerId");
    const style = this.getAttribute("style");

    this.innerHTML = html`<div class="room-card" style="${style}">
      <h3>${name}</h3>
    </div>`;
    this.onclick = () => {
      window.Router.goto("/rooms/" + id);
    };
  }
}

window.customElements.define("room-card", RoomCard);
