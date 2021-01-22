import RoomService from "../../../services/RoomService.js";
import { html } from "../../../utils/utils.js";
import AuthService from "../../../services/AuthService.js"

export default class RoomChatMessage extends HTMLElement {
  constructor() {
    super();

    const userId = AuthService.instance.getUserId();

    const messageUserId = +this.getAttribute("userId");
    const content = this.getAttribute("content");

    const isOwnMessage = userId === messageUserId;

    this.innerHTML = html`
      <div class="chat-message-row ${isOwnMessage ? "chat-message-self" : null}">
        <img class="chat-message-user-image" src="https://agile114.science.uva.nl/api/users/image.php?id=${messageUserId}">
        <div class="chat-message-container">
          <p class="chat-message-content">
          ${content}
        </p>
        </div>
      </div>`;
  }
}

window.customElements.define("room-chat-message", RoomChatMessage);
