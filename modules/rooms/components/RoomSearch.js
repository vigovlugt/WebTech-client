import { html } from "../../../utils/utils.js";
import AuthService from "../../../services/AuthService.js";

export default class RoomSearch extends HTMLElement {
  results = [];

  constructor() {
    super();

    this.render();
  }

  render() {
    this.innerHTML = html`<div class="room-search">
      <h2 class="room-section-header">Search</h2>
      <form class="room-search-form">
        <input class="room-search-input" placeholder="Search for tracks..." />
      </form>
      <div class="room-search-results">
        ${this.results
          .map(
            (r) =>
              html`<room-search-result
                id="${r.id}"
                name="${r.name}"
                imageUrl="${r.album.images[0].url}"
                artist="${r.artists[0].name}"
              ></room-search-result>`
          )
          .join("")}
      </div>
    </div>`;

    this.setEventListeners();
  }

  setEventListeners() {
    this.querySelector(".room-search-form").addEventListener("submit", (e) => {
      e.preventDefault();

      const query = this.querySelector(".room-search-input").value;
      this.getSpotifyTracks(query);
    });
  }

  connectedCallback() {}

  async getSpotifyTracks(query) {
    const res = await fetch(
      "https://agile114.science.uva.nl/api/spotify/search.php?q=" + query,
      {
        headers: AuthService.instance.getFetchHeaders(),
      }
    );
    const json = await res.json();

    this.results = json.tracks.items;
    this.render();
  }
}

window.customElements.define("room-search", RoomSearch);
