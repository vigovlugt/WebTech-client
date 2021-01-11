import { html } from "../utils/utils.js";

export default class UserBadge extends HTMLElement {
  constructor() {
    super();

    const name = this.getAttribute("name");
    const online = this.getAttribute("online") === "true";

    this.innerHTML = html`<span
      class="badge cursor-pointer ${online ? "badge-primary" : "badge-dark"}"
      >${name}</span
    >`;
    this.onclick = () => {
      window.Router.goto("/profile/" + this.getAttribute("id"));
    };
  }
}

window.customElements.define("user-badge", UserBadge);
