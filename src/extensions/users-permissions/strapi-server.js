const { sanitize } = require("@strapi/utils");

const sanitizeOutput = (user, ctx) => {
  const schema = strapi.getModel("plugin::users-permissions.user");
  const { auth } = ctx.state;
  return sanitize.contentAPI.output(user, schema, { auth });
};

module.exports = (plugin) => {
  plugin.controllers.user.findOne = (ctx) => {
    const { id: username } = ctx.params;

    const response = strapi.db
      .query("plugin::users-permissions.user")
      .findOne({
        where: { username: { $eq: username } },
        populate: [
          "comments.post.user",
          "followers.avatar",
          "following.avatar",
          "avatar",
        ],
      })
      .then((res) => {
        return sanitizeOutput(res, ctx);
      });

    return response;
  };

  return plugin;
};
