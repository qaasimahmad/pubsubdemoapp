const assert = require('assert');
const isArray = require('lodash/isArray');

function getRoute(urls){
  assert(isArray(urls), 'array of urls expected');
  if(urls.length === 1){
    const route = urls[0].split('/')[3];

    return route === 'alpha' ? 'alpha' : 'beta';
  } if(urls.length === 2){
    const route1 = urls[0].split('/')[3];
    const route2 = urls[1].split('/')[3];
    const routes = [route1, route2];

    return routes;
  }
}
module.exports = getRoute;
