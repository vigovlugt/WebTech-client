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

    .profile-header {
      margin: 0 auto;
    }

    .profile-name {
      font-size: 3rem;
      text-align: center;
    }

    .sidebar-left {
      height: 100%;
      width: 17.5%;
      position: absolute;
      background: linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(29,185,84,1) 100%, rgba(0,212,255,1) 100%);
      left: 0px;
    }

    .sidebar-right {
      height: 100%;
      width: 17.5%;
      position: absolute;
      background: linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(29,185,84,1) 100%, rgba(0,212,255,1) 100%);
      right: 0px;
    }

    .profile-info {
      height: 100%;
      width: 20%;
      background: linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(29,185,84,1) 100%, rgba(0,212,255,1) 100%);
      margin-left: auto;
      margin-right: auto;
      display: block;
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
        <div class="profile-header">
          <div class="sidebar-left"></div>
          <div class="sidebar-right"></div>
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
          </div>
        </div>
        <div class="profile-statistics"></div>
        <pre style="margin-left:20%;width:1000px;overflow:hidden;">
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
