import Router from "./modules/router/router.js";
import AuthService from "./services/AuthService.js";
import SpotifyProfileService from "./services/SpotifyProfileService.js";
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
import "./modules/rooms/components/RoomCard.js";
import "./modules/rooms/components/RoomOverview.js";

async function startServices() {
  new AuthService().init();
  await new SpotifyProfileService().init();
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
