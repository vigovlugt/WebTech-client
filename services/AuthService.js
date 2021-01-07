export default class AuthService {
  static instance;

  accessToken = null;
  user = null;

  constructor() {
    this.setAccessToken();

    this.setUser();

    AuthService.instance = this;
  }

  setUser() {
    const bs64payload = this.accessToken.split(".")[1];
    const json = atob(bs64payload);
    this.user = JSON.parse(json);
    console.log("LOGGED IN AS:", this.user.name);
  }

  getFetchHeaders() {
    return {
      Authorization: `Bearer ${this.accessToken}`,
    };
  }

  setAccessToken() {
    const queryString = new URLSearchParams(window.location.search);
    if (queryString.has("accessToken")) {
      this.accessToken = this.getAccessTokenFromQueryString(queryString);
    }

    this.accessToken = this.getAccessTokenFromLocalStorage();

    if (!this.accessToken) {
      // User is not authenticated.
      location.replace("/login.html");
      return;
    }
  }

  getAccessTokenFromLocalStorage() {
    return localStorage.getItem("accessToken");
  }

  getAccessTokenFromQueryString(queryString) {
    const accessToken = queryString.get("accessToken");

    localStorage.setItem("accessToken", accessToken);

    // Remove accessToken from parameters.
    const newUrl = location.href.replace(/(accessToken=).*?(&|$)/, "");
    history.pushState(null, null, newUrl);

    return accessToken;
  }
}
