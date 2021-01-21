import RoomService from "../../../services/RoomService.js";
import { html } from "../../../utils/utils.js";

export default class RoomChatMessage extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = html`
    <div class="messages">
      <div class="messages-me-container">
        <div class="messages-me-layout">
          <h1>Text:me</h1>
        </div>
      </div>
      <div class="messages-them-container">
        <div class="messages-them-layout">
          <h1>Text:them</h1>
        </div>
      </div>
    </div>`;
  }
}

window.customElements.define("room-chat-message", RoomChatMessage);
