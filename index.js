// Services
import Router from "./modules/router/router.js";
import AuthService from "./services/AuthService.js";
import SyncService from "./services/SyncService.js";
import RoomService from "./services/RoomService.js";

// Pages
import ProfilePage from "./views/ProfilePage.js";
import IndexPage from "./views/IndexPage.js";
import RoomPage from "./views/RoomPage.js";

// Modules
import "./modules/rooms/index.js";
import "./modules/chat/index.js";
import "./modules/profile/index.js";
import "./modules/active-device/index.js";
import ActiveDeviceService from "./modules/active-device/services/ActiveDeviceService.js";

function init() {
  new AuthService().init();
  document
    .querySelector(".profile-image")
    .setAttribute(
      "src",
      "https://agile114.science.uva.nl/api/users/image.php?id=" +
        AuthService.instance.user.sub
    );

  new SyncService().init();
  new RoomService().init();
  new ActiveDeviceService().init();

  new Router(
    [
      {
        path: /\/$/i,
        page: IndexPage,
      },
      {
        path: /\/profile\/?(.*?)$/i,
        page: ProfilePage,
      },
      {
        path: /\/rooms\/?(.*?)$/i,
        page: RoomPage,
      },
    ],
    document.querySelector(".app"),
    document.querySelector(".app-style")
  );
}

init();
