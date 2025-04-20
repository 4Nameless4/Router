export type RouteName = string | symbol;

export interface Route<T> {
  name?: RouteName;
  path: string;
  search?: Record<string, string | number | (string | number)[]>;
  hash?: string;
  children?: Route<T>[];
  data: T;
}

/**
 *
 * @param data
 * @param cb return false break
 */
function loop<T extends { children?: T[] }>(
  data: ArrayLike<T>,
  cb: (data: T) => void | Boolean | null | undefined
) {
  for (const k in data) {
    const d = data[k];
    const r = cb(d);
    if (r === false) break;
    const children = d.children;
    if (children) {
      loop(children, cb);
    }
  }
}

export class Router<T> {
  routes: Route<T>[] = [];
  routeNameMap: Map<RouteName, Route<T>> = new Map();
  routePathMap: Map<string, Route<T>> = new Map();

  constructor(routes: Route<T>[]) {}
  set(routes: Route<T>[]) {}
  add(route: Route<T>, parent?: Route<T> | RouteName) {}
  remove(route: Route<T>) {}
  change(route: Route<T>) {}

  matchRoute(route: Route<T> | RouteName) {}

  initRoutes(routes: Route<T>[] = this.routes) {
    const { routeNameMap, routePathMap } = this;
    loop(this.routes, (route) => {});
  }
}
