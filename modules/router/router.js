export default class Router {
  routes = [];
  mode = null;

  constructor(routes, element, styleElement) {
    this.routes = routes;
    this.element = element;
    this.styleElement = styleElement;

    window.addEventListener("load", () => this.onRouteChange());
    window.addEventListener("popstate", () => this.onRouteChange());
    window.Router = this;
  }

  onRouteChange() {
    const currentPath = window.location.pathname;

    let route =
      this.routes.find((r) => r.path === currentPath) || this.routes[0];

    this.setPage(route.page);
  }

  setPage(page) {
    console.log("SETTING PAGE TO:", page.pageName);
    this.styleElement.innerHTML = page.style;
    this.element.innerHTML = "";
    this.element.appendChild(document.createElement(page.pageName));
  }

  goto(path) {
    history.pushState({}, null, path);
    this.onRouteChange();
  }
}
