import { html } from "../utils/utils.js";

export default class ProfilePage extends HTMLElement {
  static pageName = "profile-page";

  static style = html`<style>
    .profile-avatar {
      border-radius: 50%;
      width: 128px;
      height: 128px;
      margin-right: 1rem;
    }

    .profile-header {
      display: flex;
      align-items: baseline;
    }

    .profile-name {
      font-size: 3rem;
    }
  </style>`;

  render() {
    this.innerHTML = html`
      <div class="container">
        <div class="profile-header">
          <img class="profile-avatar" src="https://via.placeholder.com/128" />
          <h1 class="profile-name">User</h1>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define(ProfilePage.pageName, ProfilePage);
