export default class ProfilePage extends HTMLElement {
  static pageName = "profile-page";

  static style = `
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
      font-size:3rem;
  }
  `;

  render() {
    this.innerHTML = `
    <div class="container">
      <div class="profile-header">
        <img class="profile-avatar" src="https://via.placeholder.com/128"/>
        <h1 class="profile-name">Vigo Vlugt</h1>
      </div>
    </div>
    `;
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define(ProfilePage.pageName, ProfilePage);
