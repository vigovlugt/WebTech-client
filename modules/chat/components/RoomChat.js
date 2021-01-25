import RoomService from "../../../services/RoomService.js";
import { html } from "../../../utils/utils.js";
import MessageType from "../../../constants/MessageType.js";

export default class RoomChat extends HTMLElement {
  constructor() {
    super();

    this.onRoomSync = this.onRoomSync.bind(this);

    this.innerHTML = html`<div class="chat-room">
      <div class="chat-room-messages"></div>
      <div class="chat-room-input">
        <form class="room-chat-form">
          <input class="chat-message-input" placeholder="Send a message" />
        </form>
      </div>
    </div>`;
  }

  render() {
    const messages = RoomService.instance.room
      ? RoomService.instance.room.chat
      : [];

    const chatRoomMessages = this.querySelector(".chat-room-messages");

    chatRoomMessages.innerHTML = messages
      .map(
        (m) =>
          html`<room-chat-message
            userId="${m.userId}"
            content="${m.content}"
          ></room-chat-message>`
      )
      .join("");

    chatRoomMessages.scrollTop = chatRoomMessages.scrollHeight;
  }

  onRoomSync() {
    this.render();
  }

  connectedCallback() {
    this.render();

    this.querySelector(".room-chat-form").addEventListener(
      "submit",
      (event) => {
        event.preventDefault();
        const message = this.querySelector(".chat-message-input").value;
        this.querySelector(".chat-message-input").value = "";

        RoomService.instance.sendChatMessage(message);
      }
    );

    RoomService.instance.addEventListener(
      MessageType.ROOM_SYNC,
      this.onRoomSync
    );
  }

  disconnectedCallback() {
    RoomService.instance.removeEventListener(
      MessageType.ROOM_SYNC,
      this.onRoomSync
    );
  }
}

window.customElements.define("room-chat", RoomChat);
