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

    #profile-table tr td{
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
      total: 3829
    },
    id: "",
    product: "",
    country: ""
  };

  track = {
    name : "",
    artists : [this.artist],
    album : {
      images : [
        {
          url : ""
        }
      ]
    }
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
    },
    history: {
      items: [
        this.track
      ]
    }
  }
  table = {
    medium_tracks : "",
    short_tracks : "",
    long_tracks : "",
    medium_artists : "",
    short_artists : "",
    long_artists : "",
    history : "",
  }
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
              <td class="profile-item">${this.spotifyProfile.followers.total}</td>
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
            <h6>
              Accountoverzicht
            </h6>

            <profile-track-section name="Favoriete nummers (Altijd)" tracks="long_tracks"></profile-track-section></br>
            <profile-track-section name="Favoriete nummers (6 Maanden)" tracks="medium_tracks"></profile-track-section></br>
            <profile-track-section name="Favoriete nummers (4 Weken)" tracks="short_tracks"></profile-track-section></br>
            <profile-artist-section name="Favoriete artiesten (Altijd)" artists="long_artists"></profile-artist-section></br>
            <profile-artist-section name="Favoriete artiesten (6 Maanden)" artists="medium_artists"></profile-artist-section></br>
            <profile-artist-section name="Favoriete artiesten (4 Weken)" artists="short_artists"></profile-artist-section></br>
            <profile-history-section name="Laaste afgespeelde nummers" tracks="history"></profile-history-section></br>
            <!-- <h2>Favoriete nummers (Altijd):</h2></br>
            <table id="stats" cellspacing=0>${this.table.long_tracks}</table>
            </br></br><h2>Favoriete nummers (6 Maanden):</h2></br>
            <table id="stats" cellspacing=0>${this.table.medium_tracks}</table>
            </br></br><h2>Favoriete nummers (4 Weken):</h2></br>
            <table id="stats" cellspacing=0>${this.table.short_tracks}</table>
            </br></br><h2>Favoriete artiesten (Altijd):</h2></br>
            <table id="stats" cellspacing=0>${this.table.long_artists}</table>
            </br></br><h2>Favoriete artiesten (6 Maanden):</h2></br>
            <table id="stats" cellspacing=0>${this.table.medium_artists}</table>
            </br></br><h2>Favoriete artiesten (4 Weken):</h2></br>
            <table id="stats" cellspacing=0>${this.table.short_artists}</table>
            </br></br><h2>Laaste afgespeelde nummers:</h2></br>
            <table id="stats" cellspacing=0>${this.table.history}</table> -->
          </div>
        </div>
      </div>`;
  }

  test() {
    alert('testing');
  }

  setStats() {
    this.table.short_tracks = "<tr><th>Nr.</th><th>Song</th><th>Name</th><th>Artist</th></tr>";
    this.table.medium_tracks = "<tr><th>Nr.</th><th>Song</th><th>Name</th><th>Artist</th></tr>";
    this.table.long_tracks = "<tr><th>Nr.</th><th>Song</th><th>Name</th><th>Artist</th></tr>";
    this.table.short_artists = "<tr><th>Nr.</th><th>Artist</th><th>Name</th></tr>";
    this.table.medium_artists = "<tr><th>Nr.</th><th>Artist</th><th>Name</th></tr>";
    this.table.long_artists = "<tr><th>Nr.</th><th>Artist</th><th>Name</th></tr>";
    this.table.history = "<tr><th>Nr.</th><th>Song</th><th>Name</th><th>Artist</th></tr>";

    for (var i = 0; i < this.stats.medium_tracks.items.length; i++) {
      this.table.medium_tracks += "<tr><td>" + (i + 1) + "</td>" +
      "<td><img src='" + this.stats.medium_tracks.items[i].album.images[0].url + "' width='50' height='50' /></td>" +
      "<td>" + this.stats.medium_tracks.items[i].name + "</td>" +
      "<td>" + this.stats.medium_tracks.items[i].artists[0].name + "</td></tr>";
    }
    for (var i = 0; i < this.stats.short_tracks.items.length; i++) {
      this.table.short_tracks += "<tr><td>" + (i + 1) + "</td>" +
                                 "<td><img src='" + this.stats.short_tracks.items[i].album.images[0].url + "' width='50' height='50' /></td>" +
                                 "<td>" + this.stats.short_tracks.items[i].name + "</td>" +
                                 "<td>" + this.stats.short_tracks.items[i].artists[0].name + "</td></tr>";
    }
    for (var i = 0; i < this.stats.long_tracks.items.length; i++) {
      this.table.long_tracks += "<tr><td>" + (i + 1) + "</td>" +
                                "<td><img src='" + this.stats.long_tracks.items[i].album.images[0].url + "' width='50' height='50' /></td>" +
                                "<td>" + this.stats.long_tracks.items[i].name + "</td>" +
                                "<td>" + this.stats.long_tracks.items[i].artists[0].name + "</td></tr>";
    }
    for (var i = 0; i < this.stats.medium_artists.items.length; i++) {
      this.table.medium_artists += "<tr><td>" + (i + 1) + "</td>" +
                                   "<td><img src='" + this.stats.medium_artists.items[i].images[0].url + "' width='50' height='50' /></td>" +
                                   "<td>" + this.stats.medium_artists.items[i].name + "</td></tr>";
    }
    for (var i = 0; i < this.stats.short_artists.items.length; i++) {
      this.table.short_artists += "<tr><td>" + (i + 1) + "</td>" +
                                  "<td><img src='" + this.stats.short_artists.items[i].images[0].url + "' width='50' height='50' /></td>" +
                                  "<td>" + this.stats.short_artists.items[i].name + "</td></tr>";
    }
    for (var i = 0; i < this.stats.long_artists.items.length; i++) {
      this.table.long_artists += "<tr><td>" + (i + 1) + "</td>" +
                                 "<td><img src='" + this.stats.long_artists.items[i].images[0].url + "' width='50' height='50' /></td>" +
                                 "<td>" + this.stats.long_artists.items[i].name + "</td></tr>";
    }
    for (var i = 0; i < this.stats.history.items.length; i++) {
      this.table.history += "<tr><td>" + (i + 1) + "</td>" +
                            "<td><img src='" + this.stats.history.items[i].track.album.images[0].url + "' width='50' height='50' /></td>" +
                            "<td>" + this.stats.history.items[i].track.name + "</td>" +
                            "<td>" + this.stats.history.items[i].track.artists[0].name + "</td></tr>";
    }

  }


  connectedCallback() {
    this.render();
    this.fetchProfile();
    this.fetchStats();
  }

  async logProfileWatch() {
    const http = new XMLHttpRequest()

    http.open("GET", "https://agile114.science.uva.nl/api/spotify/profile.php?id=")
    http.send()

    http.onload = () => console.log(http.responseText)
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
