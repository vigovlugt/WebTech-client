import RoomService from "../../../services/RoomService.js";
import { html } from "../../../utils/utils.js";

export default class RoomChat extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = html`<h1>HI</h1>`;
  }
}

window.customElements.define("room-chat", RoomChat);
