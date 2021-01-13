import MessageType from "../../../constants/MessageType.js";
import RoomService from "../../../services/RoomService.js";
import { html } from "../../../utils/utils.js";

const pauseSvg = html`<svg
  height="16"
  width="16"
  viewBox="0 0 16 16"
  fill="currentColor"
>
  <path fill="none" d="M0 0h16v16H0z"></path>
  <path d="M3 2h3v12H3zM10 2h3v12h-3z"></path>
</svg>`;

const playSvg = html`<svg
  height="16"
  width="16"
  viewBox="0 0 16 16"
  fill="currentColor"
>
  <path d="M4.018 14L14.41 8 4.018 2z"></path>
</svg>`;

export default class RoomPlayer extends HTMLElement {
  eventListener = null;

  constructor() {
    super();

    this.onRoomSync = this.onRoomSync.bind(this);
  }

  render() {
    const room = RoomService.instance.room;
    if (room == null) {
      return;
    }
    const isPlaying = room.playerState.isPlaying;

    const svg = isPlaying ? pauseSvg : playSvg;

    this.innerHTML = html`<div class="player-bar">
      <div class="player-track">
        <img
          class="player-track-image"
          src="https://i.scdn.co/image/ab67616d000048519bbd79106e510d13a9a5ec33"
        />
        <div class="player-track-info">
          <a class="player-track-title">Song-title</a>
          <a class="player-track-artist">Song-artist</a>
        </div>
      </div>

      <div class="player-controls">
        <button class="player-pause">${svg}</button>
      </div>

      <div class="player-settings">settings</div>
    </div>`;

    this.setEventListeners(isPlaying);
  }

  setEventListeners(isPlaying) {
    this.querySelector(".player-pause").addEventListener("click", (e) => {
      if (isPlaying) {
        RoomService.instance.pause();
      } else {
        RoomService.instance.play();
      }
    });
  }

  onRoomSync() {
    this.render();
  }

  connectedCallback() {
    this.render();

    this.eventListener = RoomService.instance.addEventListener(
      MessageType.SYNC_ROOM,
      this.onRoomSync
    );
  }

  disconnectedCallback() {
    RoomService.instance.removeEventListener(
      MessageType.ROOM_LIST_SYNC,
      this.onRoomSync
    );
  }
}

window.customElements.define("room-player", RoomPlayer);
