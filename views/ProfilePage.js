import AuthService from "../services/AuthService.js";
import { html } from "../utils/utils.js";

export default class ProfilePage extends HTMLElement {
  static pageName = "profile-page";

  static style = html`<style>
    .app {
      background: linear-gradient(
        0deg,
        rgba(10, 43, 8, 1) 0%,
        rgba(22, 46, 27, 1) 17%,
        rgba(41, 83, 56, 1) 46%,
        rgba(29, 185, 84, 1) 100%
      );
    }

    .profile-avatar {
      border-radius: 50%;
      width: 100px;
      height: 100px;
      margin: 30px auto;
      display: block;
    }

    .profile-item {
      color: white;
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

    #stats tr td {
      padding: 8px;
      margin: 8px;
      border: 1px solid black;
    }

    #stats tr th {
      color: black;
      border: 1px solid black;
    }

    #profile-table tr td {
      padding: 1px 8px;
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
      total: 3829,
    },
    id: "",
    product: "",
    country: "",
  };

  artist = {
    external_urls: {
      spotify: "",
    },
    name: "",
    images: [
      {
        url: "/images/profile-placeholder.png",
      },
    ],
  };

  track = {
    name: "",
    artists: [this.artist],
    external_urls: {
      spotify: "",
    },
    album: {
      images: [
        {
          url: "",
        },
      ],
    },
  };

  stats = {
    medium_tracks: {
      items: [],
    },
    long_tracks: {
      items: [],
    },
    short_tracks: {
      items: [],
    },
    medium_artists: {
      items: [],
    },
    long_artists: {
      items: [],
    },
    short_artists: {
      items: [],
    },
    history: {
      items: [],
    },
  };

  render() {
    this.innerHTML = html` <div class="container">
      <div class="profile">
        <div class="profile-info">
          <img
            class="profile-avatar"
            src="${this.spotifyProfile.images[0].url}"
            height="128"
            width="128"
          />
          <h1 class="profile-name">${this.spotifyProfile.display_name}</h1>
          <table id="profile-table">
            <tr>
              <td>Gebruikersnaam</td>
              <td class="profile-item">${this.spotifyProfile.id}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td class="profile-item">${this.spotifyProfile.email}</td>
            </tr>
            <tr>
              <td>Volgers</td>
              <td class="profile-item">
                ${this.spotifyProfile.followers.total}
              </td>
            </tr>
            <tr>
              <td>Type account</td>
              <td class="profile-item">${this.spotifyProfile.product}</td>
            </tr>
            <tr>
              <td>Land</td>
              <td class="profile-item">${this.spotifyProfile.country}</td>
            </tr>
          </table>
        </div>
        <div class="profile-stats">
          <h6>Accountoverzicht</h6>

          <profile-track-section
            name="Favoriete nummers (Altijd)"
            tracks="long_tracks"
          ></profile-track-section>
          <profile-track-section
            name="Favoriete nummers (6 Maanden)"
            tracks="medium_tracks"
          ></profile-track-section>
          <profile-track-section
            name="Favoriete nummers (4 Weken)"
            tracks="short_tracks"
          ></profile-track-section>
          <profile-artist-section
            name="Favoriete artiesten (Altijd)"
            artists="long_artists"
          ></profile-artist-section>
          <profile-artist-section
            name="Favoriete artiesten (6 Maanden)"
            artists="medium_artists"
          ></profile-artist-section>
          <profile-artist-section
            name="Favoriete artiesten (4 Weken)"
            artists="short_artists"
          ></profile-artist-section>
          <profile-history-section
            name="Laaste afgespeelde nummers"
            tracks="history"
          ></profile-history-section>
        </div>
      </div>
    </div>`;
  }

  connectedCallback() {
    this.render();
    this.fetchProfile();
    this.fetchStats();
  }

  logProfileWatch(watcher, watched) {
    const http = new XMLHttpRequest();

    http.open(
      "GET",
      "https://agile114.science.uva.nl/api/logging/profile.php?watcher=" +
        watcher +
        "&watched=" +
        watched
    );
    http.send();

    http.onload = () => console.log(http.responseText);
  }

  async fetchProfile() {
    let userId = AuthService.instance.getUserId();
    if (window.Router.currentMatch[1]) {
      this.logProfileWatch(userId, window.Router.currentMatch[1]);
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
    this.render();
  }
}

customElements.define(ProfilePage.pageName, ProfilePage);
