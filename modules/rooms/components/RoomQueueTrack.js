import RoomService from "../../../services/RoomService.js";
import { html } from "../../../utils/utils.js";

const upvote = (active) => html`<svg
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  class="queue-track-upvote ${active ? "queue-track-vote-active" : ""}"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    d="M5 10l7-7m0 0l7 7m-7-7v18"
  />
</svg>`;

const downvote = (active) => html`<svg
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  class="queue-track-downvote ${active ? "queue-track-vote-active" : ""}"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    d="M19 14l-7 7m0 0l-7-7m7 7V3"
  />
</svg>`;

export default class RoomQueueTrack extends HTMLElement {
  constructor() {
    super();

    this.render();
  }

  render() {
    const imageUrl = this.getAttribute("imageUrl");
    const name = this.getAttribute("name");
    const id = +this.getAttribute("id");
    const artist = this.getAttribute("artist");
    const userId = this.getAttribute("userId");

    const votes = this.getAttribute("votes");
    const hasDownvoted = this.getAttribute("hasDownvoted") === "true";
    const hasUpvoted = this.getAttribute("hasUpvoted") === "true";

    this.innerHTML = html`<div class="queue-track">
      <img class="queue-track-image" src="${imageUrl}" />
      <div class="queue-track-info">
        <a class="queue-track-name">${name}</a>
        <a class="queue-track-artist">${artist}</a>
      </div>
      <div class="queue-track-right">
        ${upvote(hasUpvoted)}
        <span class="queue-track-votes">${votes}</span>
        ${downvote(hasDownvoted)}
        <img
          class="queue-track-user"
          src="https://agile114.science.uva.nl/api/users/image.php?id=${userId}"
        />
      </div>
    </div>`;

    this.querySelector(".queue-track-upvote").addEventListener("click", () =>
      RoomService.instance.upvoteTrack(id)
    );

    this.querySelector(".queue-track-downvote").addEventListener("click", () =>
      RoomService.instance.downvoteTrack(id)
    );
  }
}

window.customElements.define("room-queue-track", RoomQueueTrack);
