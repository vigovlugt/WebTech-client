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
    }

    .profile-header {
      display: flex;
      align-items: baseline;
    }

    .profile-name {
      font-size: 3rem;
    }
  </style>`;

  spotifyProfile = {
    images: [
      {
        url: "",
      },
    ],
  };

  render() {
    this.innerHTML = html`
      <div class="container">
        <div class="profile-header">
          <img
            class="profile-avatar"
            src="${this.spotifyProfile.images[0].url}"
            height="128"
            width="128"
          />
          <h1 class="profile-name">${AuthService.instance.user.name}</h1>
        </div>
        <pre style="width:1000px;overflow:hidden;">
${JSON.stringify(this.spotifyProfile, null, 2)}
        </pre
        >
      </div>
    `;
  }

  connectedCallback() {
    this.render();
    this.fetchProfile();
  }

  async fetchProfile() {
    const userId = AuthService.instance.getUserId();

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
