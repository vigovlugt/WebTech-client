export default class IndexPage extends HTMLElement {
  static pageName = "index-page";

  static style = `
  `;

  render() {
    this.innerHTML = `
    <div class="container">
      <hello-message data-name="User"></hello-message>
      <custom-counter num="0"/>
    </div>
    `;
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define(IndexPage.pageName, IndexPage);
