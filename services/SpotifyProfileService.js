import AuthService from "./AuthService.js";

export default class SpotifyProfileService {
  static instance;

  spotifyProfile = null;

  constructor() {
    SpotifyProfileService.instance = this;
  }

  async init() {
    await this.getSpotifyProfile();

    document
      .querySelector(".profile-image")
      .setAttribute("src", this.spotifyProfile.images[0].url);
  }

  async getSpotifyProfile() {
    const userId = AuthService.instance.getUserId();

    const res = await fetch(
      "https://agile114.science.uva.nl/api/spotify/profile.php?id=" + userId,
      {
        headers: AuthService.instance.getFetchHeaders(),
      }
    );
    const json = await res.json();

    this.spotifyProfile = json;
  }
}
