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

const nextSvg = html`<svg
  height="16"
  width="16"
  viewBox="0 0 16 16"
  fill="currentColor"
>
  <path d="M11 3v4.119L3 2.5v11l8-4.619V13h2V3z"></path>
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

    const playingSvg = isPlaying ? pauseSvg : playSvg;

    const currentTrack = room.playerState.currentTrack
      ? room.playerState.currentTrack.track
      : null;

    this.innerHTML = html`<div class="player-bar">
      <div class="player-track">
        <img
          class="player-track-image"
          src="${currentTrack ? currentTrack.album.imageUrl : ""}"
        />
        <div class="player-track-info">
          <a class="player-track-title"
            >${currentTrack ? currentTrack.name : "-"}</a
          >
          <a class="player-track-artist"
            >${currentTrack ? currentTrack.artist.name : "-"}</a
          >
        </div>
      </div>

      <div class="player-controls">
        <button class="player-pause">${playingSvg}</button>
        <button class="player-next">${nextSvg}</button>
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

    this.querySelector(".player-next").addEventListener("click", (e) => {
      RoomService.instance.playNext();
    });
  }

  onRoomSync() {
    this.render();
  }

  connectedCallback() {
    this.render();

    this.eventListener = RoomService.instance.addEventListener(
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

window.customElements.define("room-player", RoomPlayer);
