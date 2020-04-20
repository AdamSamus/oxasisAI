// eslint-disable-next-line complexity
export function activeRouteKey(navigationState) {
  const {index, routeName, routes} = navigationState

  if (!routes || !routes[index]) {
    return routeName
  }

  return activeRouteKey(routes[index]);
}
