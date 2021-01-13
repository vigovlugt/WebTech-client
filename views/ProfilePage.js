import AuthService from "../services/AuthService.js";
import { html } from "../utils/utils.js";

export default class ProfilePage extends HTMLElement {
  static pageName = "profile-page";

  static style = html`<style>
    .profile-avatar {
      border-radius: 50%;
      width: 200px;
      height: 200px;
      margin-left: auto;
      margin-right: auto;
      display: block;
    }

    .profile-name {
      font-size: 3rem;
      text-align: center;
    }

    .profile-info {
      position: relative;
      width: 30%;
      background-color: #c4c4c4;
      margin: 0 0;
      float: left;
    }
    .profile-stats {
      width: 70%;
      background-color: yellow; /* #110F0F;*/
      margin: 0 0;
      float: right;
    }

    body {
      margin: 0;
    }

    .profile {
      display: flex;
    }
  </style>`;

  spotifyProfile = {
    images: [
      {
        url: "/images/profile-placeholder.png",
      },
    ],
    display_name: "",
  };

  render() {
    this.innerHTML = html`
      <div class="container">
        <div class="profile">
          <div class="profile-info">
            <img
              class="profile-avatar"
              src="${this.spotifyProfile.images[0].url}"
              height="128"
              width="128"
            />
            <h1 class="profile-name">${this.spotifyProfile.display_name}</h1>
          </div>
          <div class="profile-stats">hello2</div>
        </div>
      </div>
      <div class="profile-statistics"></div>
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
