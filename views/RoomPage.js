import AuthService from "../services/AuthService.js";
import RoomService from "../services/RoomService.js";
import { html } from "../utils/utils.js";

export default class RoomPage extends HTMLElement {
  static pageName = "room-page";

  static style = html`<style>
    .room-page {
      display: flex;
      flex-direction: column;
      height: calc(100vh - 84px);
    }

    .room-name {
      background-color: var(--bg-semi-light);
      padding: 1rem;
      padding-top: 0.5rem;
      text-align: center;
    }

    .app {
      background-color: var(--bg-light);
    }

    .room-page-player {
      background-color: var(--bg);
    }

    .room-page-main {
      display: flex;
      height: calc(100vh - 226px);
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
        <div class="room-page-main">
          <room-tabs
            tabs=${`'
            ${JSON.stringify([
              {
                name: "Search",
                component: "room-search",
              },
            ])}'`}
          ></room-tabs>
          <room-tabs
            flex="2"
            tabs=${`'
            ${JSON.stringify([
              {
                name: "Queue",
                component: "room-queue",
              },
            ])}'`}
          ></room-tabs>
          <room-tabs
            tabs=${`'
            ${JSON.stringify([
              {
                name: "Users",
                component: "room-users",
              },
              {
                name: "Chat",
                component: "room-chat",
              },
            ])}'`}
          ></room-tabs>
        </div>
        <room-player></room-player>
      </div>
    `;
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define(RoomPage.pageName, RoomPage);
