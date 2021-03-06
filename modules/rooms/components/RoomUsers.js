import MessageType from "../../../constants/MessageType.js";
import RoomService from "../../../services/RoomService.js";
import { html } from "../../../utils/utils.js";

export default class RoomUsers extends HTMLElement {
  constructor() {
    super();

    this.onRoomSync = this.onRoomSync.bind(this);
  }

  render() {
    const users = RoomService.instance.room
      ? RoomService.instance.room.users
      : [];

    this.innerHTML = html`<div class="room-users">
      ${users
        .map(
          (u) => html`
            <div class="room-user" data-id="${u.id}">
              <img
                class="room-user-image"
                src="https://agile114.science.uva.nl/api/users/image.php?id=${u.id}"
                alt="Room user"
              />
              <div>
                <h4>${u.name}</h4>
              </div>
            </div>
          `
        )
        .join("")}
    </div>`;

    [...document.querySelectorAll(".room-user")].forEach((el) => {
      el.addEventListener("click", () => {
        window.Router.goto(`/profile/${el.dataset.id}`);
      });
    });
  }

  onRoomSync() {
    this.render();
  }

  connectedCallback() {
    this.render();

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

window.customElements.define("room-users", RoomUsers);
