import RoomService from "../../../services/RoomService.js";
import { html } from "../../../utils/utils.js";

export default class RoomChat extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = html`<div>
      <h1>HI</h1>
      <room-chat-message></room-chat-message>
    </div>`;
  }
}

window.customElements.define("room-chat", RoomChat);
