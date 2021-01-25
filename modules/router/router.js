const route404 = {
  page: null,
};

export default class Router {
  routes = [];

  currentRoute = null;
  currentMatch = null;
  currentPage = null;

  constructor(routes, element, styleElement) {
    this.routes = routes;
    this.element = element;
    this.styleElement = styleElement;

    this.onRouteChange();
    window.addEventListener("popstate", () => this.onRouteChange());

    window.Router = this;
  }

  onRouteChange() {
    const currentPath = window.location.hash;

    let routeMatch = null;
    let route =
      this.routes.find((r) => {
        const match = r.path.exec(currentPath);

        if (match) {
          routeMatch = match;
          return true;
        }
      }) || this.routes[0];

    this.currentRoute = route;
    this.currentMatch = routeMatch;

    this.setPage(route.page);
  }

  setPage(page) {
    if (page == null) {
      this.element.innerHTML = "<h1>Route not found</h1>";
      return;
    }

    this.setStyle(page.style);

    this.element.innerHTML = "";
    this.element.appendChild(document.createElement(page.pageName));
  }

  setStyle(styleString) {
    const div = document.createElement("div");
    div.innerHTML = styleString;
    this.styleElement.innerHTML = div.firstChild.innerHTML;
  }

  goto(path) {
    history.pushState({}, null, `#${path}`);
    this.onRouteChange();
  }
}
