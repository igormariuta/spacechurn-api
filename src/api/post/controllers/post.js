"use strict";

/**
 *  post controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::post.post", ({ strapi }) => ({
  async findOne(ctx) {
    const { id } = ctx.params;

    // query
    ctx.query = {
      ...ctx.query,
      filters: { ...ctx.query.filters, slug: { $eq: id } },
    };

    // response
    const { data } = await super.find(ctx);

    // view counter
    if (data.length) {
      ctx.params = { id: data[0].id };
      ctx.request.body = {
        data: {
          viewCount: +data[0].attributes.viewCount + 1,
        },
      };
      await super.update(ctx);
    }

    return data[0];
  },
}));
