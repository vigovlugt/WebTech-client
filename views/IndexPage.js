import { html } from "../utils/utils.js";

export default class IndexPage extends HTMLElement {
  static pageName = "index-page";

  static style = html`<style></style>`;

  render() {
    this.innerHTML = html`
      <div class="container">
        <hello-message name="User"></hello-message>
        <custom-counter num="0" />
      </div>
    `;
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define(IndexPage.pageName, IndexPage);
