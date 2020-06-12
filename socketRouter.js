function noop(ctx, data) {}
/**
 * 路由处理
 * @param {IO} io koa socket io实例
 * @param {Object} routes 路由
 */
module.exports = function (io, routes) {
  Object.keys(routes).forEach((route) => {
    io.on(route, routes[route]); // register event
  });
  return async (ctx, next) => {
    if (routes[ctx.event]) {

      // await routes[ctx.event](ctx); //call event funciton
    }
    await next();
  };
}