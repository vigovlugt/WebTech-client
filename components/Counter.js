import { html } from "../utils/utils.js";

export default class Counter extends HTMLElement {
  static get observedAttributes() {
    return ["num"];
  }

  connectedCallback() {
    this.onclick = () => {
      this.setAttribute("num", +this.getAttribute("num") + 1);
    };

    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const num = this.getAttribute("num");

    this.innerHTML = html`<button>Counter: ${num}</button>`;
  }
}

window.customElements.define("custom-counter", Counter);
