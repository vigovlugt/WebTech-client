import RoomService from "../../../services/RoomService.js";
import { html } from "../../../utils/utils.js";

export default class RoomChat extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = html`
    <div class="chat-room">
      <div class="chat-room-output">
        <room-chat-message></room-chat-message>
      </div>
      <div class="chat-room-input">
          <form class="room-chat-form">
            <input class="chat-message-input", placeholder="Send a message"/>
          </form>
        </div>
    </div>`;
  }
}

window.customElements.define("room-chat", RoomChat);
