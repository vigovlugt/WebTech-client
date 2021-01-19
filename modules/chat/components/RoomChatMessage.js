import RoomService from "../../../services/RoomService.js";
import { html } from "../../../utils/utils.js";

export default class RoomChatMessage extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = html`
    <div class="room-chat-message">
    </div>`;
  }
}

window.customElements.define("room-chat-message", RoomChatMessage);
