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

    .sidebar-left {
      height: 100%;
      width: 17.5%;
      position: fixed;
      background-image: url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/387eb18b-ab74-4503-a97f-b5e6143eb21d/d2eybzq-986ca967-9887-4244-8deb-4f04d43f47bd.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvMzg3ZWIxOGItYWI3NC00NTAzLWE5N2YtYjVlNjE0M2ViMjFkXC9kMmV5YnpxLTk4NmNhOTY3LTk4ODctNDI0NC04ZGViLTRmMDRkNDNmNDdiZC5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.aLewA490CmwbPu8V6Gz9c3nVfwYQHZeKiVIMI7dzlBk");
      left: 0;
    }

    .sidebar-right {
      height: 100%;
      width: 17.5%;
      position: fixed;
      background-image: url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/387eb18b-ab74-4503-a97f-b5e6143eb21d/d2eybzq-986ca967-9887-4244-8deb-4f04d43f47bd.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvMzg3ZWIxOGItYWI3NC00NTAzLWE5N2YtYjVlNjE0M2ViMjFkXC9kMmV5YnpxLTk4NmNhOTY3LTk4ODctNDI0NC04ZGViLTRmMDRkNDNmNDdiZC5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.aLewA490CmwbPu8V6Gz9c3nVfwYQHZeKiVIMI7dzlBk");
      right: 0;
    }

    .profile-info {
      position:relative;
      width: 30%;
      background-color: #C4C4C4;
      margin:0 0;
      float: left;
    }
    .profile-stats {
      position:relative;
      width: 70%;
      background-color: yellow; /* #110F0F;*/
      margin:0 0;
      float: right;
    }

    body {
        margin: 0;
    }

    .profile {
      position:absolute;
      top:0px;
      width: 65%;
      right: 17.5%;
      background-color: blue; /* #110F0F;*/
      margin:0 0;
      display:flex
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
          <div class="profile-stats">
              hello2
          </div>
        </div>
      </div>
      <div class="profile-statistics">
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
