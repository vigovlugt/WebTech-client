import MessageType from "../constants/MessageType.js";
import AuthService from "../services/AuthService.js";
import RoomService from "../services/RoomService.js";
import SyncService from "../services/SyncService.js";
import { html } from "../utils/utils.js";

const roomTabs = (tabs, flex) => html`<room-tabs
  flex="${flex}"
  tabs=${`'
${JSON.stringify(tabs)}'`}
></room-tabs>`;

export default class RoomPage extends HTMLElement {
  static pageName = "room-page";

  static style = html`<style>
    .room-page {
      display: flex;
      flex-direction: column;
      height: calc(100vh - 84px);
    }

    .room-header-container {
      background-color: var(--bg-semi-light);
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
    }

    .room-header-left {
      width: 20%;
    }

    .room-header-right {
      width: 20%;
      display: flex;
      justify-content: flex-end;
    }

    .room-share-btn {
      font-size: 1rem;
      padding: 0.4rem;
    }

    .app {
      background-color: var(--bg-light);
    }

    .room-page-player {
      background-color: var(--bg);
    }

    .room-page-main {
      display: flex;
      height: calc(100vh - 237px);
    }
  </style>`;

  constructor() {
    super();

    this.onRoomSync = this.onRoomSync.bind(this);
  }

  render() {
    const roomId = window.Router.currentMatch[1];
    const room = RoomService.instance.getRoom(roomId);
    if (room == null) {
      this.innerHTML = "";
      return;
    }

    const userId = AuthService.instance.getUserId();

    const isOwner = room.ownerId === userId;

    const tabs = [
      [
        {
          name: "Search",
          component: "room-search",
        },
      ],
      [
        {
          name: "Queue",
          component: "room-queue",
        },
      ],
      [
        {
          name: "Users",
          component: "room-users",
        },
        {
          name: "Chat",
          component: "room-chat",
        },
      ],
    ];

    if (isOwner) {
      tabs[0].push({
        name: "Settings",
        component: "room-settings",
      });
    }

    console.log(
      roomTabs(
        tabs.reduce((list, tab) => [...list, tab], []),
        1
      )
    );

    this.innerHTML = html`
      <div class="room-page">
        <div class="room-header-container">
          <div class="room-header-left"></div>
          <div class="room-header-middle">
            <h2 class="room-name">${room.name}</h2>
          </div>
          <div class="room-header-right">
            <button class="room-share-btn">Share</button>
          </div>
        </div>

        <div class="room-page-main">
          ${window.innerWidth > 1000
            ? tabs
                .map((tabList, i) => roomTabs(tabList, i === 1 ? 2 : 1))
                .join("")
            : roomTabs(
                tabs.reduce((list, tabList) => [...list, ...tabList], []),
                1
              )}
        </div>
        <room-player></room-player>
      </div>
    `;

    const shareBtn = this.querySelector(".room-share-btn");
    shareBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(window.location.href);
      shareBtn.innerHTML = "Share link copied to clipboard.";

      setTimeout(() => {
        shareBtn.innerHTML = "Share";
      }, 3000);
    });
  }

  connectedCallback() {
    const roomId = +window.Router.currentMatch[1];
    const isInRoom =
      RoomService.instance.room !== null &&
      roomId === RoomService.instance.room.id;

    if (!isInRoom) {
      if (SyncService.instance.isAuthenticated) {
        RoomService.instance.joinRoom(roomId);
      } else {
        SyncService.instance.addEventListener(MessageType.AUTHENTICATED, () => {
          RoomService.instance.joinRoom(roomId);
        });
      }
    }

    RoomService.instance.addEventListener(
      MessageType.ROOM_SYNC,
      this.onRoomSync
    );

    this.render();
  }

  onRoomSync() {
    this.render();
    RoomService.instance.removeEventListener(
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

customElements.define(RoomPage.pageName, RoomPage);
