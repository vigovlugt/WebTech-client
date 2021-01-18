import AuthService from "../services/AuthService.js";
import { html } from "../utils/utils.js";

export default class ProfilePage extends HTMLElement {
  static pageName = "profile-page";

  static style = html`<style>
    .app {
      background: linear-gradient(0deg, rgba(10,43,8,1) 0%, rgba(22,46,27,1) 17%, rgba(41,83,56,1) 46%, rgba(29,185,84,1) 100%);
    }

    .profile-avatar {
      border-radius: 50%;
      width: 100px;
      height: 100px;
      margin: 30px auto;
      display: block;
    }

    .profile-name {
      font-size: 2rem;
      text-align: center;
    }

    .profile-info {
      position: relative;
      background-color: var(--bg);
      margin: 0 0;
      flex: 1;
      border: 1px var(--border-grey) solid;
    }
    .profile-stats {
      background-color: white;
      margin: 0 0;
      color: black;
      flex: 2.5;
      flex-direction: column;
      display: flex;
      padding: 2rem;
    }

    #stats tr:nth-child(even) {
      background-color: #f2f2f2;
    }

    #stats {
      border: 1px solid #ddd;
      padding: 18px;
      width: 100%;
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
    email: "",
    followers: {
      total: 3829
    },
    id: "",
    product: "",
    country: ""
  };

  track = {
    name : "",
    artists : [this.artist]
  }

  artist = {
    name : ""
  }

  stats = {
    medium_tracks: {
      items: [
        this.track
      ]
    },
    long_tracks: {
      items: [
        this.track
      ]
    },
    short_tracks: {
      items: [
        this.track
      ]
    },
    medium_artists: {
      items: [
        this.artist
      ]
    },
    long_artists: {
      items: [
        this.artist
      ]
    },
    short_artists: {
      items: [
        this.artist
      ]
    }
  }
  table = "test"
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
            <table>
            <tr>
              <td>Gebruikersnaam</td>
              <td class="Gebruikersnaam"><h7>${this.spotifyProfile.id}</h7></td>
            </tr>
            <tr>
              <td>Gebruikersnaam</td>
              <td class="Meer informatie" id="tmp"><h7>${this.spotifyProfile.email}</h7></td>
            </tr>
            <tr>
              <td>Gebruikersnaam</td>
              <td class="Meer informatie"><h7>${this.spotifyProfile.followers.total}</h7></td>
            </tr>
            <tr>
              <td>Gebruikersnaam</td>
              <td class="Meer informatie"><h7>${this.spotifyProfile.product}</h7></td>
            </tr>
            <tr>
              <td>Gebruikersnaam</td>
              <td class="Meer informatie"><h7>${this.spotifyProfile.country}</h7></td>
            </tr>
            </table>
          </div>
          <div class="profile-stats">
            <h6>
              Accountoverzicht
            </h6>
            <table id="stats">${this.table}</table>
          </div>
        </div>
      </div>`;
  }

  setStats() {
    this.table = "<tr><th>Nr.</th><th>Song Name</th><th>Artist</th></tr>"
    for (var i = 0; i < this.stats.medium_tracks.items.length; i++) {
      this.table += "<tr><td>" + i + "</td><td>" + this.stats.medium_tracks.items[i].name + "</td><td>" + this.stats.medium_tracks.items[i].artists[0].name + "</td></tr>";
    }
  }


  connectedCallback() {
    this.render();
    this.fetchProfile();
    this.fetchStats();
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

  async fetchStats() {
    let userId = AuthService.instance.getUserId();
    if (window.Router.currentMatch[1]) {
      userId = window.Router.currentMatch[1];
    }

    const res = await fetch(
      "https://agile114.science.uva.nl/api/spotify/stats.php?id=" + userId,
      {
        headers: AuthService.instance.getFetchHeaders(),
      }
    );
    const json = await res.json();

    this.stats = json;
    this.setStats();
    this.render();
  }
}



customElements.define(ProfilePage.pageName, ProfilePage);
