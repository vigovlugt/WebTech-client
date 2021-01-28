import AuthService from "../services/AuthService.js";
import { html } from "../utils/utils.js";

export default class ProfilePage extends HTMLElement {
  static pageName = "profile-page";

  static style = html`<style>
    .app {
      background-color: #262626;
    }

    .profile-avatar {
      border-radius: 50%;
      width: 100px;
      height: 100px;
      margin: 30px auto;
      display: block;
    }

    .profile-badges {
      padding: 1rem;
      text-align: center;
      line-height: 2rem;
    }

    .profile-badge {
      color: var(--bg);
      background-color: #eeeeee;
      margin-bottom: 0.5rem;
      white-space: nowrap;
    }

    .profile-name {
      font-size: 2rem;
      text-align: center;
    }

    .profile-info {
      background-color: var(--bg-light);
      margin: 0 0;
      flex: 1;
      /* border: 1px var(--border-grey) solid; */
      display: flex;
      flex-direction: column;
      align-items: center;
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

    #tracks {
      display: flex;
    }

    #artists {
      display: flex;
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
      min-height: calc(100vh - 84px);
    }

    .profile-section-row {
      display: flex;
    }

    profile-track-section {
      width: calc(50% - 1rem);
      margin-right: 1rem;
    }

    profile-artist-section {
      width: calc(50% - 1rem);
      margin-left: 1rem;
    }

    @media only screen and (max-width: 900px) {
      .profile {
        flex-direction: column;
      }

      .container {
        padding: 0;
      }
    }

    @media only screen and (max-width: 1200px) {
      .profile-section-row {
        flex-direction: column;
      }

      profile-track-section {
        width: 100%;
        margin-right: 0;
      }

      profile-artist-section {
        width: 100%;
        margin-left: 0;
      }
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
    this.innerHTML = html` <div class="container profile">
      <div class="profile-info">
        <img
          class="profile-avatar"
          src="${this.spotifyProfile.images[0].url}"
          alt="Profile Avatar"
          height="128"
          width="128"
        />
        <h1 class="profile-name">${this.spotifyProfile.display_name}</h1>
        <div class="profile-badges">
          <span class="badge profile-badge">${this.spotifyProfile.id}</span>
          <span class="badge profile-badge">${this.spotifyProfile.country}</span>
          <span class="badge profile-badge">${this.spotifyProfile.followers.total} followers</span>
          <span class="badge profile-badge">${this.spotifyProfile.email}</span>
        </div>
        

        </div>
        <div class="profile-stats">
          <h6>
            Accountoverzicht
          </h6>
          <div id="long" class="profile-section-row">
            <profile-track-section name="Favoriete nummers (Altijd)" tracks="long_tracks"></profile-track-section>
            <profile-artist-section name="Favoriete artiesten (Altijd)" artists="long_artists"></profile-artist-section>
          </div>
          <div id="medium" class="profile-section-row">
            <profile-track-section name="Favoriete nummers (6 Maanden)" tracks="medium_tracks"></profile-track-section>
            <profile-artist-section name="Favoriete artiesten (6 Maanden)" artists="medium_artists"></profile-artist-section>
          </div>
          <div id="short" class="profile-section-row">
            <profile-track-section name="Favoriete nummers (4 Weken)" tracks="short_tracks"></profile-track-section>
            <profile-artist-section name="Favoriete artiesten (4 Weken)" artists="short_artists"></profile-artist-section>
          </div>
          <profile-history-section name="Laaste afgespeelde nummers" tracks="history"></profile-history-section>
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
