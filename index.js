import Router from "./modules/router/router.js";

// Import pages
import ProfilePage from "./views/ProfilePage.js";
import IndexPage from "./views/IndexPage.js";

// Import components
import "./components/HelloMessage.js";
import "./components/Counter.js";
import "./components/UserBadge.js";

new Router(
  [
    {
      path: "/",
      page: IndexPage,
    },
    {
      path: "/profile",
      page: ProfilePage,
    },
  ],
  document.querySelector(".app"),
  document.querySelector(".app-style")
);
