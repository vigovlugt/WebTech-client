export default class HelloMessage extends HTMLElement {
  constructor() {
    super();

    const name = this.getAttribute("name");

    this.innerHTML = `<h1>Hello ${name}</h1>`;
  }
}

window.customElements.define("hello-message", HelloMessage);
