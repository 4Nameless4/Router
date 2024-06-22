export type t_route = {
  name?: string;
  path: string;
  children?: t_route[];
};
export type t_format_route = t_route & {
  url: URL;
};

export function createRouter(routes: t_route[]) {
  const _routes: Map<string | t_route, t_format_route> = new Map();

  function addRoute(route: t_route) {
    const r = formatRoute(route);
    const name = route.name;
    if (name) {
      _routes.set(name, r);
    } else {
      _routes.set(r, r);
    }
  }
  function deleteRoute(route: string | t_route) {
    _routes.delete(route);
  }
  function find(route: string | t_route) {

  }

  routes.forEach(addRoute);

  // addEventListener("hashchange", (event) => {})
  // addEventListener("onpopstate", (event) => {})

  return {
    routes: {
      get() {
        return Array.from(_routes.values());
      },
    },
    addRoute,
    deleteRoute,
  };
}

export function formatRoute(routePath: string | t_route): t_format_route {
  const route: t_route = {
    path: "",
  };
  if (typeof routePath === "string") {
    route.path = routePath;
  } else {
    Object.assign(route, routePath);
  }
  const url = new URL(route.path);

  return {
    ...route,
    path: url.pathname,
    url,
  };
}

export function currentRoute() {
  return formatRoute(location.pathname);
}
