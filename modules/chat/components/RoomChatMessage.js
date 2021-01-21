import RoomService from "../../../services/RoomService.js";
import { html } from "../../../utils/utils.js";

export default class RoomChatMessage extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = html`
    <div class="messages">
      <div class="messages-me">
        <blockquote>Test</blockquote>
      </div>
      <div class="messages-them">
        <blockquote>Hi!</blockquote>
      </div>
    </div>`;
  }
}

window.customElements.define("room-chat-message", RoomChatMessage);
