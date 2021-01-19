import RoomService from "../../../services/RoomService.js";
import { html } from "../../../utils/utils.js";

export default class RoomChatMessage extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = html`<h1>HI from chat message</h1>`;
  }
}

window.customElements.define("room-chat-message", RoomChatMessage);
