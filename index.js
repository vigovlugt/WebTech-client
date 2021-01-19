import Router from "./modules/router/router.js";
import AuthService from "./services/AuthService.js";
import SyncService from "./services/SyncService.js";
import RoomService from "./services/RoomService.js";

// Import pages
import ProfilePage from "./views/ProfilePage.js";
import IndexPage from "./views/IndexPage.js";
import RoomPage from "./views/RoomPage.js";

// Import components
import "./components/HelloMessage.js";
import "./components/Counter.js";
import "./components/UserBadge.js";

import "./modules/rooms/index.js";
import "./modules/chat/index.js";

async function startServices() {
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

startServices();
