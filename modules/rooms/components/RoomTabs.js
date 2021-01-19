import { html } from "../../../utils/utils.js";

export default class RoomTabs extends HTMLElement {
  currentTab = 0;

  constructor() {
    super();

    this.render();
  }

  render() {
    const tabs = JSON.parse(this.getAttribute("tabs"));

    this.style.flex = this.getAttribute("flex");

    this.innerHTML = html`<div class="room-tabs">
      <div class="room-tabs-container">
        ${tabs
          .map(
            (t, i) =>
              html`<h2
                class="room-tab ${i === this.currentTab
                  ? "room-tab-active"
                  : ""}"
                data-tab-index="${i}"
              >
                ${t.name}
              </h2>`
          )
          .join("")}
      </div>
      <div class="room-tabs-component">
        <${tabs[this.currentTab].component} />
      </div>
    </div>`;

    [...this.querySelectorAll(".room-tab")].forEach((el) => {
      el.addEventListener("click", () => {
        const index = +el.dataset.tabIndex;
        this.currentTab = index;
        this.render();
      });
    });
  }
}

window.customElements.define("room-tabs", RoomTabs);
