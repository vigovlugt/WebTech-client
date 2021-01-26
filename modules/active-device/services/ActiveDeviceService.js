import MessageType from "../../../constants/MessageType.js";
import SyncService from "../../../services/SyncService.js";

export default class ActiveDeviceService {
  static instance = null;

  constructor() {
    ActiveDeviceService.instance = this;
    window.ActiveDeviceService = ActiveDeviceService;
  }

  init() {}

  openActiveDeviceModal(devices) {
    if (document.body.querySelector("active-device-modal")) {
      return;
    }

    const modal = document.createElement("active-device-modal");
    modal.setAttribute("devices", encodeURIComponent(JSON.stringify(devices)));

    document.body.appendChild(modal);
  }

  closeActiveDeviceModal() {
    const modal = document.body.querySelector("active-device-modal");
    if (!modal) {
      return;
    }

    modal.remove();
  }

  setActiveDevice(id) {
    SyncService.instance.sendMessage(MessageType.SET_ACTIVE_DEVICE, { id });

    this.closeActiveDeviceModal();
  }
}
