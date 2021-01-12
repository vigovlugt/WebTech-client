import AuthService from "../services/AuthService.js";
import RoomService from "../services/RoomService.js";
import { html } from "../utils/utils.js";

export default class RoomPage extends HTMLElement {
  static pageName = "room-page";

  static style = html`<style>
    .room-name {
      background-color: var(--bg-semi-light);
      padding: 1rem;
      padding-top: 0.5rem;
      text-align: center;
    }
  </style>`;

  render() {
    const roomId = window.Router.currentMatch[1];
    const room = RoomService.instance.getRoom(roomId);

    this.innerHTML = html`
      <div class="room-page">
        <h2 class="room-name">
          <div class="container">${room.name}</div>
        </h2>
        <div class="container"></div>
      </div>
    `;
  }

  connectedCallback() {
    this.render();
    this.getUsers();
  }

  async getUsers() {
    const res = await fetch("https://agile114.science.uva.nl/api/users.php", {
      headers: AuthService.instance.getFetchHeaders(),
    });
    const json = await res.json();

    this.users = json;
    this.render();
  }
}

customElements.define(RoomPage.pageName, RoomPage);
