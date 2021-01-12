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
      margin:0 auto;
    }

    .profile-name {
      font-size: 3rem;
      text-align: center;
    }

    .sidebar-left {
      height: 100%;
      width: 17.5%;
      position: absolute;
      background-image: url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/387eb18b-ab74-4503-a97f-b5e6143eb21d/d2eybzq-986ca967-9887-4244-8deb-4f04d43f47bd.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvMzg3ZWIxOGItYWI3NC00NTAzLWE5N2YtYjVlNjE0M2ViMjFkXC9kMmV5YnpxLTk4NmNhOTY3LTk4ODctNDI0NC04ZGViLTRmMDRkNDNmNDdiZC5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.aLewA490CmwbPu8V6Gz9c3nVfwYQHZeKiVIMI7dzlBk");
      left: 0px;
    }

    .sidebar-right {
      height: 100%;
      width: 17.5%;
      position: absolute;
      background-image: url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/387eb18b-ab74-4503-a97f-b5e6143eb21d/d2eybzq-986ca967-9887-4244-8deb-4f04d43f47bd.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvMzg3ZWIxOGItYWI3NC00NTAzLWE5N2YtYjVlNjE0M2ViMjFkXC9kMmV5YnpxLTk4NmNhOTY3LTk4ODctNDI0NC04ZGViLTRmMDRkNDNmNDdiZC5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.aLewA490CmwbPu8V6Gz9c3nVfwYQHZeKiVIMI7dzlBk");
      right: 0px;
    }

    .profile-bar {
      height: 100%;
      width: 17.5%;
      position: relative;
      width: 20%;
      background-color: red;
      right: 0px;
    }
  </style>`;

  spotifyProfile = {
    images: [
      {
        url: "",
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
          <div class="profile-bar">hello</div>
          <img
            class="profile-avatar"
            src="${this.spotifyProfile.images[0].url}"
            height="128"
            width="128"
          />
          <h1 class="profile-name">${this.spotifyProfile.display_name}</h1>
        </div>
        <div class="profile-statistics">
        </div>
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
