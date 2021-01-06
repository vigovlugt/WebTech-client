import { html } from "../utils/utils.js";

export default class UserBadge extends HTMLElement {
  constructor() {
    super();

    const name = this.getAttribute("name");

    this.innerHTML = html`<span class="badge">${name}</span>`;
  }
}

window.customElements.define("user-badge", UserBadge);
