import { html } from "../utils/utils.js";

export default class UserBadge extends HTMLElement {
  constructor() {
    super();

    const name = this.getAttribute("name");

    this.innerHTML = html`<span class="badge cursor-pointer">${name}</span>`;
    this.onclick = () => {
      window.Router.goto("/profile/" + this.getAttribute("id"));
    };
  }
}

window.customElements.define("user-badge", UserBadge);
