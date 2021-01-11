import AuthService from "../services/AuthService.js";
import { html } from "../utils/utils.js";

export default class IndexPage extends HTMLElement {
  static pageName = "index-page";

  static style = html`<style></style>`;

  users = [];

  render() {
    this.innerHTML = html`
      <div class="container">
        <h1>Users:</h1>
        ${this.users
          .map(
            (u) =>
              html`<user-badge
                name="${u.name}"
                id="${u.id}"
                online="${u.online}"
                class="mr-4"
              ></user-badge>`
          )
          .join("")}
      </div>
    `;
  }

  connectedCallback() {
    this.render();
    this.getUsers();
  }

  async getUsers() {
    const res = await fetch("https://agile114.science.uva.nl/api/users.php", {
      headers: AuthService.instance.getFetchHeaders(),
    });
    const json = await res.json();

    this.users = json;
    this.render();
  }
}

customElements.define(IndexPage.pageName, IndexPage);
