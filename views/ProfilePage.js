import AuthService from "../services/AuthService.js";
import { html } from "../utils/utils.js";

export default class ProfilePage extends HTMLElement {
  static pageName = "profile-page";

  static style = html`<style>
    .profile-avatar {
      border-radius: 50%;
      width: 128px;
      height: 128px;
      margin-right: 1rem;
      object-fit: cover;
    }

    .profile-header {
      display: flex;
      align-items: flex-end;
    }

    .profile-name {
      font-size: 3rem;
    }
  </style>`;

  spotifyProfile = {
    images: [
      {
        url: "/images/profile-placeholder.png",
      },
    ],
    display_name: "",
    external_urls: {
      spotify: "",
    },
  };

  render() {
    this.innerHTML = html`
      <div class="container">
        <div
          class="profile-header cursor-pointer"
          onclick="window.open('${this.spotifyProfile.external_urls.spotify}')"
        >
          <img
            class="profile-avatar"
            src="${this.spotifyProfile.images[0].url}"
            height="128"
            width="128"
          />
          <h1 class="profile-name">${this.spotifyProfile.display_name}</h1>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    this.render();
    this.fetchProfile();
  }

  async fetchProfile() {
    let userId = AuthService.instance.getUserId();
    if (window.Router.currentMatch[1]) {
      userId = window.Router.currentMatch[1];
    }

    const res = await fetch(
      "https://agile114.science.uva.nl/api/spotify/profile.php?id=" + userId,
      {
        headers: AuthService.instance.getFetchHeaders(),
      }
    );
    const json = await res.json();

    this.spotifyProfile = json;
    this.render();
  }
}

customElements.define(ProfilePage.pageName, ProfilePage);
