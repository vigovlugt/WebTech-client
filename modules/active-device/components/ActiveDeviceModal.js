import { html, htmlEscape } from "../../../utils/utils.js";
import ActiveDeviceService from "../services/ActiveDeviceService.js";

const iconByType = {
  Computer: "computer",
  Smartphone: "mobile",
};

const deviceIcon = (type) => {
  let icon = iconByType[type] || "computer";

  return html`<span class="spoticon-device-${icon}-32"></span>`;
};

export default class ActiveDeviceModal extends HTMLElement {
  render() {
    const devices = JSON.parse(
      decodeURIComponent(this.getAttribute("devices"))
    );

    this.innerHTML = html` <div class="active-device-modal-container">
      <h1>Choose Playback Device</h1>
      <img
        class="active-device-image"
        src="https://open.scdn.co/cdn/images/connect_header@1x.ecc6912d.png"
        alt="Active Devices"
      />
      <div class="active-device-modal-devices">
        ${devices
          .map(
            (d) =>
              html`<span class="active-device-modal-device" data-id="${d.id}">
                ${deviceIcon(d.type)} ${htmlEscape(d.name)}</span
              >`
          )
          .join("")}
      </div>
    </div>`;

    [...this.querySelectorAll(".active-device-modal-device")].forEach((el) => {
      el.addEventListener("click", () => {
        const id = el.dataset.id;
        ActiveDeviceService.instance.setActiveDevice(id);
      });
    });
  }

  connectedCallback() {
    this.render();
  }
}

window.customElements.define("active-device-modal", ActiveDeviceModal);
