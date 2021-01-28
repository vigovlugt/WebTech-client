import AuthService from "../services/AuthService.js";
import { html } from "../utils/utils.js";

export default class IndexPage extends HTMLElement {
  static pageName = "index-page";

  static style = html`<style></style>`;

  users = [];

  render() {
    this.innerHTML = html`
      <div class="container">
        <room-overview style="margin-top:1rem;" />
      </div>
    `;
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define(IndexPage.pageName, IndexPage);
